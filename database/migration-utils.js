const { Pool } = require('pg');
// const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function all(db, sql, params = []) {
    throw new Error("SQLite support has been removed. Migration is no longer possible.");
    /*
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    */
}

async function migrateAllToPostgres(pgConfig, appDataPath) {
    const pool = new Pool(pgConfig);
    const results = [];

    // 0. Migrate Users first
    const usersDbPath = path.join(appDataPath, 'users.db');
    if (fs.existsSync(usersDbPath)) {
        console.warn("Skipping USERS migration as SQLite support is removed.");
        /*
        const udb = new sqlite3.Database(usersDbPath);
        try {
            const users = await all(udb, 'SELECT * FROM users');
            for (const user of users) {
                // ...
            }
            results.push({ name: 'USERS', status: 'success', count: users.length });
        } catch (err) {
            results.push({ name: 'USERS', status: 'error', message: err.message });
        } finally {
            udb.close();
        }
        */
    }

    const SQLITE_DBs = [
        { name: 'MRY', path: path.join(appDataPath, 'invoices.db') },
        { name: 'CHAIMAE', path: path.join(appDataPath, 'invoices_chaimae.db') },
        { name: 'MULTI', path: path.join(appDataPath, 'multi.db') },
    ];

    try {
        // --- Fetch or Create Admin User for Attribution ---
        const adminEmail = 'redouanerrebbahi99@gmail.com';
        let adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);

        if (adminRes.rows.length === 0) {
            console.log(`⚠️ Admin user (${adminEmail}) not found in PG. Creating...`);
            await pool.query(
                "INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
                ['Admin', adminEmail, 'admin123', true]
            );
            adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);
        } else {
            // Ensure permissions are enabled
            await pool.query("UPDATE users SET can_auto_validate = TRUE WHERE id = $1", [adminRes.rows[0].id]);
        }

        const adminUser = adminRes.rows.length > 0 ? adminRes.rows[0] : null;


        for (const sqlite of SQLITE_DBs) {
            console.warn(`Skipping migration for ${sqlite.name} as SQLite support is removed.`);
            /*
            if (!fs.existsSync(sqlite.path)) {
                results.push({ name: sqlite.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sqlite.path);
            try {
                // ... migration logic ...
            } finally {
                db.close();
            }
            */
        }

        // --- SECONDARY COMPANIES MIGRATION (Devis & PDF Tracks) ---
        const SECONDARY_DBs = [
            { name: 'SAAISS', path: path.join(appDataPath, 'saaiss.db') },
            { name: 'SMARTS', path: path.join(appDataPath, 'smarts.db') },
            { name: 'MSH3', path: path.join(appDataPath, 'msh3.db') },
            { name: 'BENALI', path: path.join(appDataPath, 'benali.db') },
            { name: 'SKM', path: path.join(appDataPath, 'skm.db') },
        ];


        for (const sec of SECONDARY_DBs) {
            console.warn(`Skipping migration for ${sec.name} as SQLite support is removed.`);
            /*
            if (!fs.existsSync(sec.path)) {
                results.push({ name: sec.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sec.path);
            try {
                // ... logic ...
            } finally {
                db.close();
            }
            */
        }
    } catch (globalErr) {
        throw globalErr;
    } finally {
        await pool.end();
    }

    return results;
}

module.exports = { migrateAllToPostgres };
