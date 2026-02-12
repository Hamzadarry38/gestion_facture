const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

const OUTPUT_FILE = path.join(__dirname, 'exported_schema.sql');

async function exportSchema() {
    console.log('🚀 استخراج هيكل قاعدة البيانات (Schema Export)...');
    const client = await pool.connect();

    try {
        let sql = '';
        sql += `-- Schema exported at ${new Date().toISOString()}\n`;
        sql += `-- Database: facture_db\n`;
        sql += `-- This file contains ONLY table structures (no data)\n\n`;
        sql += `BEGIN;\n\n`;

        // 1. Get all tables in public schema
        const tablesRes = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
        const tableNames = tablesRes.rows.map(r => r.table_name);
        console.log(`📋 Found ${tableNames.length} tables`);

        // 2. Drop tables (reverse dependency order)
        sql += `-- Drop all existing tables\n`;
        for (const t of tableNames) {
            sql += `DROP TABLE IF EXISTS ${t} CASCADE;\n`;
        }
        sql += `\n`;

        // 3. For each table, build CREATE TABLE
        for (const tableName of tableNames) {
            console.log(`📦 Exporting: ${tableName}`);

            // Get columns
            const colsRes = await client.query(`
        SELECT 
          column_name, data_type, character_maximum_length,
          numeric_precision, numeric_scale,
          column_default, is_nullable, udt_name
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);

            // Get primary key
            const pkRes = await client.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = $1 AND tc.constraint_type = 'PRIMARY KEY'
        ORDER BY kcu.ordinal_position
      `, [tableName]);
            const pkColumns = pkRes.rows.map(r => r.column_name);

            // Get unique constraints
            const uniqRes = await client.query(`
        SELECT tc.constraint_name, kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = $1 AND tc.constraint_type = 'UNIQUE'
        ORDER BY tc.constraint_name, kcu.ordinal_position
      `, [tableName]);
            const uniqueGroups = {};
            uniqRes.rows.forEach(r => {
                if (!uniqueGroups[r.constraint_name]) uniqueGroups[r.constraint_name] = [];
                uniqueGroups[r.constraint_name].push(r.column_name);
            });

            // Get foreign keys
            const fkRes = await client.query(`
        SELECT 
          kcu.column_name,
          ccu.table_name AS foreign_table,
          ccu.column_name AS foreign_column,
          rc.delete_rule
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage ccu 
          ON tc.constraint_name = ccu.constraint_name
        JOIN information_schema.referential_constraints rc
          ON tc.constraint_name = rc.constraint_name
        WHERE tc.table_name = $1 AND tc.constraint_type = 'FOREIGN KEY'
      `, [tableName]);

            // Build CREATE TABLE
            sql += `-- Table: ${tableName}\n`;
            sql += `CREATE TABLE ${tableName} (\n`;

            const columnDefs = [];
            for (const col of colsRes.rows) {
                let colDef = `    ${col.column_name} `;

                // Check if it's a SERIAL column (auto-increment)
                const isSerial = col.column_default && col.column_default.startsWith("nextval(");

                if (isSerial && pkColumns.includes(col.column_name)) {
                    colDef += 'SERIAL';
                } else {
                    // Map data types
                    switch (col.udt_name) {
                        case 'int4': colDef += 'INTEGER'; break;
                        case 'int8': colDef += 'BIGINT'; break;
                        case 'varchar':
                            colDef += col.character_maximum_length
                                ? `VARCHAR(${col.character_maximum_length})`
                                : 'VARCHAR';
                            break;
                        case 'text': colDef += 'TEXT'; break;
                        case 'bool': colDef += 'BOOLEAN'; break;
                        case 'numeric':
                            colDef += col.numeric_precision && col.numeric_scale
                                ? `DECIMAL(${col.numeric_precision}, ${col.numeric_scale})`
                                : 'NUMERIC';
                            break;
                        case 'timestamp': colDef += 'TIMESTAMP'; break;
                        case 'timestamptz': colDef += 'TIMESTAMPTZ'; break;
                        case 'date': colDef += 'DATE'; break;
                        case 'bytea': colDef += 'BYTEA'; break;
                        case 'jsonb': colDef += 'JSONB'; break;
                        case 'json': colDef += 'JSON'; break;
                        default: colDef += col.data_type.toUpperCase(); break;
                    }
                }

                // NOT NULL
                if (col.is_nullable === 'NO' && !isSerial) {
                    colDef += ' NOT NULL';
                }

                // DEFAULT (skip serial defaults)
                if (col.column_default && !isSerial) {
                    colDef += ` DEFAULT ${col.column_default}`;
                }

                columnDefs.push(colDef);
            }

            // PRIMARY KEY
            if (pkColumns.length > 0) {
                const isSerialPK = pkColumns.length === 1 &&
                    colsRes.rows.find(c => c.column_name === pkColumns[0] && c.column_default && c.column_default.startsWith("nextval("));

                if (isSerialPK) {
                    columnDefs.push(`    PRIMARY KEY (${pkColumns.join(', ')})`);
                } else {
                    columnDefs.push(`    PRIMARY KEY (${pkColumns.join(', ')})`);
                }
            }

            // FOREIGN KEYS
            for (const fk of fkRes.rows) {
                let fkDef = `    FOREIGN KEY (${fk.column_name}) REFERENCES ${fk.foreign_table}(${fk.foreign_column})`;
                if (fk.delete_rule === 'CASCADE') fkDef += ' ON DELETE CASCADE';
                columnDefs.push(fkDef);
            }

            // UNIQUE constraints
            for (const [, cols] of Object.entries(uniqueGroups)) {
                columnDefs.push(`    UNIQUE(${cols.join(', ')})`);
            }

            sql += columnDefs.join(',\n');
            sql += `\n);\n\n`;
        }

        // 4. Get indexes
        const idxRes = await client.query(`
      SELECT indexdef FROM pg_indexes 
      WHERE schemaname = 'public' 
      AND indexname NOT LIKE '%_pkey'
      AND indexname NOT LIKE '%_key'
    `);
        if (idxRes.rows.length > 0) {
            sql += `-- Indexes\n`;
            for (const idx of idxRes.rows) {
                sql += `${idx.indexdef};\n`;
            }
        }

        sql += `\nCOMMIT;\n`;

        // Write to file
        fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');

        console.log(`\n✅✅✅ تم استخراج السكيما بنجاح!`);
        console.log(`📂 الملف: ${OUTPUT_FILE}`);
        console.log(`📋 عدد الجداول: ${tableNames.length}`);
        console.log(`\n👉 انسخ هذا الملف إلى الحاسوب الجديد وشغل: node import_schema.js`);

    } catch (err) {
        console.error('❌ خطأ:', err.message);
    } finally {
        client.release();
        await pool.end();
        process.exit(0);
    }
}

exportSchema();
