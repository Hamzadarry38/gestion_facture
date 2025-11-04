const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

// Database instance for CHAIMAE
let db = null;
let SQL = null;

// Database file path for CHAIMAE - use userData directory for production
const dbDir = app ? app.getPath('userData') : path.join(__dirname);
const dbPath = path.join(dbDir, 'invoices_chaimae.db');

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize sql.js and database
async function initDatabase() {
    try {
        // Initialize SQL.js
        SQL = await initSqlJs();
        
        // Load existing database or create new one
        if (fs.existsSync(dbPath)) {
            const buffer = fs.readFileSync(dbPath);
            db = new SQL.Database(buffer);
            // console.log('✅ CHAIMAE SQLite Database loaded successfully');
        } else {
            db = new SQL.Database();
            // console.log('✅ CHAIMAE SQLite Database created successfully');
        }
        
        // Create tables
        db.run(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                ice TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Create index for faster searching
        db.run(`CREATE INDEX IF NOT EXISTS idx_clients_ice_nom ON clients(ice, nom)`);
        
        // Migration: Remove UNIQUE constraint from ICE if it exists
        try {
            const tableInfo = db.exec("PRAGMA table_info(clients)");
            if (tableInfo.length > 0) {
                // Check if we need to migrate (if table has UNIQUE constraint on ice)
                const checkUnique = db.exec("SELECT sql FROM sqlite_master WHERE type='table' AND name='clients'");
                if (checkUnique.length > 0 && checkUnique[0].values.length > 0) {
                    const tableSql = checkUnique[0].values[0][0];
                    if (tableSql && tableSql.includes('ice TEXT NOT NULL UNIQUE')) {
                        // console.log('🔄 [CHAIMAE] Migrating clients table to remove UNIQUE constraint from ICE...');
                        
                        // Rename old table
                        db.run(`ALTER TABLE clients RENAME TO clients_old`);
                        
                        // Create new table without UNIQUE constraint
                        db.run(`
                            CREATE TABLE clients (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                nom TEXT NOT NULL,
                                ice TEXT NOT NULL,
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                            )
                        `);
                        
                        // Copy data from old table
                        db.run(`INSERT INTO clients SELECT * FROM clients_old`);
                        
                        // Drop old table
                        db.run(`DROP TABLE clients_old`);
                        
                        // Create index
                        db.run(`CREATE INDEX IF NOT EXISTS idx_clients_ice_nom ON clients(ice, nom)`);
                        
                        // console.log('✅ [CHAIMAE] Migration completed - UNIQUE constraint removed from ICE');
                        saveDatabase();
                    }
                }
            }
        } catch (migrationError) {
            // console.log('ℹ️ [CHAIMAE] No migration needed or already migrated:', migrationError.message);
        }
        
        db.run(`
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_id INTEGER NOT NULL,
                document_type TEXT NOT NULL,
                document_date DATE NOT NULL,
                document_numero TEXT,
                document_numero_Order TEXT,
                document_numero_bl TEXT,
                document_numero_devis TEXT,
                document_order_devis TEXT,
                document_bon_de_livraison TEXT,
                document_numero_commande TEXT,
                year INTEGER,
                sequential_id INTEGER,
                total_ht REAL DEFAULT 0,
                tva_rate REAL DEFAULT 20,
                montant_tva REAL DEFAULT 0,
                total_ttc REAL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients(id)
            )
        `);
        
        // Add year and sequential_id columns if they don't exist (migration)
        try {
            db.run(`ALTER TABLE invoices ADD COLUMN year INTEGER`);
            db.run(`ALTER TABLE invoices ADD COLUMN sequential_id INTEGER`);
            console.log('✅ [CHAIMAE] Added year and sequential_id columns');
        } catch (e) {
            // Columns already exist
        }
        
        // Create index for faster year-based queries
        db.run(`CREATE INDEX IF NOT EXISTS idx_invoices_year ON invoices(year, sequential_id)`);
        
        db.run(`
            CREATE TABLE IF NOT EXISTS invoice_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id INTEGER NOT NULL,
                designation TEXT,
                quantite TEXT,
                prix_unitaire_ht REAL DEFAULT 0,
                total_ht REAL DEFAULT 0,
                FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
            )
        `);
        
        db.run(`
            CREATE TABLE IF NOT EXISTS attachments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id INTEGER NOT NULL,
                filename TEXT NOT NULL,
                file_type TEXT NOT NULL,
                file_size INTEGER NOT NULL,
                file_data BLOB NOT NULL,
                uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
            )
        `);
        
        // Create prefixes table for storing custom prefixes
        db.run(`
            CREATE TABLE IF NOT EXISTS prefixes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prefix TEXT NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insert default prefixes if table is empty
        const checkPrefixes = db.exec("SELECT COUNT(*) as count FROM prefixes");
        if (checkPrefixes.length === 0 || checkPrefixes[0].values[0][0] === 0) {
            db.run(`INSERT OR IGNORE INTO prefixes (prefix) VALUES ('MG'), ('TL'), ('BL')`);
            saveDatabase();
        }
        
        // Create global invoices table (Factures Globales)
        db.run(`
            CREATE TABLE IF NOT EXISTS global_invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_id INTEGER NOT NULL,
                document_numero TEXT NOT NULL,
                document_date DATE NOT NULL,
                total_ht REAL DEFAULT 0,
                tva_rate REAL DEFAULT 20,
                montant_tva REAL DEFAULT 0,
                total_ttc REAL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients(id)
            )
        `);
        
        // Create table to link global invoices with bon de livraison
        db.run(`
            CREATE TABLE IF NOT EXISTS global_invoice_bons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                global_invoice_id INTEGER NOT NULL,
                bon_livraison_id INTEGER NOT NULL,
                FOREIGN KEY (global_invoice_id) REFERENCES global_invoices(id) ON DELETE CASCADE,
                FOREIGN KEY (bon_livraison_id) REFERENCES invoices(id) ON DELETE CASCADE
            )
        `);
        
        // Save database to file
        saveDatabase();
        
    } catch (error) {
        console.error('❌ Error initializing CHAIMAE database:', error);
        throw error;
    }
}

// Save database to file
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Client operations
const clientOps = {
    create: (nom, ice) => {
        db.run('INSERT INTO clients (nom, ice) VALUES (?, ?)', [nom, ice]);
        
        const result = db.exec('SELECT last_insert_rowid()');
        const id = result[0].values[0][0];
        
        saveDatabase();
        return id;
    },
    
    getOrCreate: (nom, ice) => {
        // Search for client with same ICE AND same name
        const result = db.exec('SELECT * FROM clients WHERE ice = ? AND nom = ?', [ice, nom]);
        
        if (result.length > 0 && result[0].values.length > 0) {
            const row = result[0].values[0];
            return {
                id: row[0],
                nom: row[1],
                ice: row[2],
                created_at: row[3]
            };
        }
        
        // Client not found, create new one
        db.run('INSERT INTO clients (nom, ice) VALUES (?, ?)', [nom, ice]);
        saveDatabase();
        
        const newResult = db.exec('SELECT * FROM clients WHERE ice = ? AND nom = ?', [ice, nom]);
        const row = newResult[0].values[0];
        return {
            id: row[0],
            nom: row[1],
            ice: row[2],
            created_at: row[3]
        };
    },
    
    search: (query) => {
        const result = db.exec(
            'SELECT * FROM clients WHERE nom LIKE ? OR ice LIKE ? LIMIT 10',
            [`%${query}%`, `%${query}%`]
        );
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            nom: row[1],
            ice: row[2],
            created_at: row[3]
        }));
    },
    
    getAll: () => {
        const result = db.exec('SELECT * FROM clients ORDER BY nom');
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            nom: row[1],
            ice: row[2],
            created_at: row[3]
        }));
    }
};

// Invoice operations
const invoiceOps = {
    create: (invoiceData) => {
        // Get or create client
        const client = clientOps.getOrCreate(invoiceData.client.nom, invoiceData.client.ICE);
        
        // Extract year from document date
        const documentDate = new Date(invoiceData.document.date);
        const year = documentDate.getFullYear();
        
        // Get next sequential_id for this year
        const seqResult = db.exec(`
            SELECT MAX(sequential_id) as max_seq 
            FROM invoices 
            WHERE year = ?
        `, [year]);
        
        let nextSeqId = 1;
        if (seqResult.length > 0 && seqResult[0].values.length > 0 && seqResult[0].values[0][0] !== null) {
            nextSeqId = seqResult[0].values[0][0] + 1;
        }
        
        console.log(`📊 [CHAIMAE] Creating invoice for year ${year} with sequential_id: ${nextSeqId}`);
        
        // Insert invoice
        db.run(`
            INSERT INTO invoices (
                client_id, document_type, document_date,
                document_numero, document_numero_Order, document_numero_bl,
                document_numero_devis, document_order_devis, document_bon_de_livraison,
                document_numero_commande, year, sequential_id,
                total_ht, tva_rate, montant_tva, total_ttc
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            client.id,
            invoiceData.document.type,
            invoiceData.document.date,
            invoiceData.document.numero || null,
            invoiceData.document.numero_Order || null,
            invoiceData.document.numero_BL || null,
            invoiceData.document.numero_devis || null,
            invoiceData.document.order_devis || null,
            invoiceData.document.bon_de_livraison || null,
            invoiceData.document.numero_commande || null,
            year,
            nextSeqId,
            invoiceData.totals.total_ht,
            invoiceData.totals.tva_rate,
            invoiceData.totals.montant_tva,
            invoiceData.totals.total_ttc
        ]);
        
        // Get invoice ID
        const result = db.exec('SELECT last_insert_rowid()');
        const invoiceId = result[0].values[0][0];
        
        // Insert products
        if (invoiceData.products && invoiceData.products.length > 0) {
            for (const product of invoiceData.products) {
                db.run(`
                    INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht)
                    VALUES (?, ?, ?, ?, ?)
                `, [
                    invoiceId,
                    product.designation,
                    product.quantite,
                    product.prix_unitaire_ht,
                    product.total_ht
                ]);
            }
        }
        
        saveDatabase();
        return invoiceId;
    },
    
    getById: (id) => {
        const result = db.exec(`
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
            WHERE i.id = ?
        `, [id]);
        
        if (result.length === 0 || result[0].values.length === 0) return null;
        
        const row = result[0].values[0];
        const invoice = {
            id: row[0],
            client_id: row[1],
            document_type: row[2],
            document_date: row[3],
            document_numero: row[4],
            document_numero_Order: row[5],
            document_numero_bl: row[6],
            document_numero_devis: row[7],
            document_order_devis: row[8],
            document_bon_de_livraison: row[9],
            document_numero_commande: row[10],
            year: row[11],
            sequential_id: row[12],
            total_ht: row[13],
            tva_rate: row[14],
            montant_tva: row[15],
            total_ttc: row[16],
            created_at: row[17],
            updated_at: row[18],
            client_nom: row[19],
            client_ice: row[20]
        };
        
        // Get products
        const productsResult = db.exec('SELECT * FROM invoice_products WHERE invoice_id = ?', [id]);
        invoice.products = productsResult.length > 0 ? productsResult[0].values.map(row => ({
            id: row[0],
            invoice_id: row[1],
            designation: row[2],
            quantite: row[3],
            prix_unitaire_ht: row[4],
            total_ht: row[5]
        })) : [];
        
        // Get attachments
        const attachmentsResult = db.exec(
            'SELECT id, filename, file_type, file_size, uploaded_at FROM attachments WHERE invoice_id = ?',
            [id]
        );
        invoice.attachments = attachmentsResult.length > 0 ? attachmentsResult[0].values.map(row => ({
            id: row[0],
            filename: row[1],
            file_type: row[2],
            file_size: row[3],
            uploaded_at: row[4]
        })) : [];
        
        return invoice;
    },
    
    getAll: () => {
        const query = `
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
            ORDER BY i.created_at DESC
        `;
        
        const result = db.exec(query);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            client_id: row[1],
            document_type: row[2],
            document_date: row[3],
            document_numero: row[4],
            document_numero_Order: row[5],
            document_numero_bl: row[6],
            document_numero_devis: row[7],
            document_order_devis: row[8],
            document_bon_de_livraison: row[9],
            document_numero_commande: row[10],
            year: row[11],
            sequential_id: row[12],
            total_ht: row[13],
            tva_rate: row[14],
            montant_tva: row[15],
            total_ttc: row[16],
            created_at: row[17],
            updated_at: row[18],
            client_nom: row[19],
            client_ice: row[20]
        }));
    },
    
    update: (id, invoiceData) => {
        console.log('🔄 [DB UPDATE CHAIMAE] Updating invoice:', id);
        console.log('📦 [DB UPDATE CHAIMAE] Invoice data:', JSON.stringify(invoiceData, null, 2));
        
        // Get current invoice to check old client info
        const currentInvoiceResult = db.exec('SELECT client_id FROM invoices WHERE id = ?', [id]);
        if (currentInvoiceResult.length === 0 || currentInvoiceResult[0].values.length === 0) {
            throw new Error('Invoice not found');
        }
        const oldClientId = currentInvoiceResult[0].values[0][0];
        
        // Get old client info
        const oldClientResult = db.exec('SELECT nom, ice FROM clients WHERE id = ?', [oldClientId]);
        const oldClientNom = oldClientResult[0].values[0][0];
        const oldClientICE = oldClientResult[0].values[0][1];
        
        let newClientId = oldClientId;
        
        // Check if client info changed (ICE or Name)
        if (invoiceData.client.ICE !== oldClientICE || invoiceData.client.nom !== oldClientNom) {
            // Client info changed - search for client with new ICE AND new name
            const existingClient = db.exec('SELECT id FROM clients WHERE ice = ? AND nom = ?', 
                [invoiceData.client.ICE, invoiceData.client.nom]);
            
            if (existingClient.length > 0 && existingClient[0].values.length > 0) {
                // Client with same ICE and name exists, use it
                newClientId = existingClient[0].values[0][0];
                console.log('✅ [DB UPDATE CHAIMAE] Using existing client:', newClientId);
            } else {
                // Create new client with new ICE and name
                newClientId = clientOps.create(invoiceData.client.nom, invoiceData.client.ICE);
                console.log('✅ [DB UPDATE CHAIMAE] Created new client:', newClientId);
            }
        }
        
        // Update invoice with new client_id and other fields
        db.run(`
            UPDATE invoices SET
                client_id = ?,
                document_date = ?,
                document_numero = ?,
                document_numero_devis = ?,
                document_numero_bl = ?,
                document_numero_Order = ?,
                document_bon_de_livraison = ?,
                document_numero_commande = ?,
                total_ht = ?,
                tva_rate = ?,
                montant_tva = ?,
                total_ttc = ?,
                updated_at = datetime('now')
            WHERE id = ?
        `, [
            newClientId,
            invoiceData.document.date,
            invoiceData.document.numero,
            invoiceData.document.numero_devis || null,
            invoiceData.document.numero_BL || null,
            invoiceData.document.numero_Order || null,
            invoiceData.document.bon_de_livraison || null,
            invoiceData.document.numero_commande || null,
            invoiceData.totals.total_ht,
            invoiceData.totals.tva_rate,
            invoiceData.totals.montant_tva,
            invoiceData.totals.total_ttc,
            id
        ]);
        
        console.log('✅ [DB UPDATE CHAIMAE] Invoice updated successfully');
        
        // Delete old products
        db.run('DELETE FROM invoice_products WHERE invoice_id = ?', [id]);
        
        // Insert new products
        if (invoiceData.products && invoiceData.products.length > 0) {
            for (const product of invoiceData.products) {
                db.run(`
                    INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht)
                    VALUES (?, ?, ?, ?, ?)
                `, [
                    id,
                    product.designation,
                    product.quantite,
                    product.prix_unitaire_ht,
                    product.total_ht
                ]);
            }
        }
        
        saveDatabase();
        return { changes: 1 };
    },
    
    delete: (id) => {
        db.run('DELETE FROM invoices WHERE id = ?', [id]);
        saveDatabase();
        return { changes: 1 };
    },
    
    // Get next suggested invoice number for the current year
    getNextInvoiceNumber: (documentType, year = null) => {
        const currentYear = year || new Date().getFullYear();
        
        let query = '';
        let params = [];
        
        if (documentType === 'facture') {
            query = `
                SELECT document_numero 
                FROM invoices 
                WHERE document_type = 'facture' 
                AND document_numero LIKE ?
                ORDER BY id DESC 
                LIMIT 1
            `;
            params = [`%/${currentYear}`];
        } else if (documentType === 'devis') {
            query = `
                SELECT document_numero_devis 
                FROM invoices 
                WHERE document_type = 'devis' 
                AND document_numero_devis LIKE ?
                ORDER BY id DESC 
                LIMIT 1
            `;
            params = [`%/${currentYear}`];
        } else if (documentType === 'bon_livraison') {
            query = `
                SELECT document_numero 
                FROM invoices 
                WHERE document_type = 'bon_livraison' 
                AND document_numero LIKE ?
                ORDER BY id DESC 
                LIMIT 1
            `;
            params = [`%/${currentYear}`];
        }
        
        const result = db.exec(query, params);
        
        if (result.length === 0 || result[0].values.length === 0 || !result[0].values[0][0]) {
            // No invoice found for this year, start from 1
            return { number: 1, formatted: `1/${currentYear}` };
        }
        
        const lastNumber = result[0].values[0][0]; // e.g., "MG548/2025" or "548/2025"
        
        // Remove prefix if exists (for bon_livraison)
        let numberPart = lastNumber;
        if (lastNumber.match(/^[A-Z]+/)) {
            numberPart = lastNumber.replace(/^[A-Z]+/, ''); // Remove prefix letters
        }
        
        const parts = numberPart.split('/');
        
        if (parts.length === 2) {
            const num = parseInt(parts[0]) || 0;
            const nextNum = num + 1;
            return { number: nextNum, formatted: `${nextNum}/${currentYear}` };
        }
        
        // Fallback
        return { number: 1, formatted: `1/${currentYear}` };
    },
    
    // Get available years from invoices
    getAvailableYears: () => {
        const result = db.exec(`
            SELECT DISTINCT year 
            FROM invoices 
            WHERE year IS NOT NULL 
            ORDER BY year DESC
        `);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => row[0]);
    }
};

// Attachment operations
const attachmentOps = {
    add: (invoiceId, filename, fileType, fileData) => {
        db.run(`
            INSERT INTO attachments (invoice_id, filename, file_type, file_size, file_data)
            VALUES (?, ?, ?, ?, ?)
        `, [invoiceId, filename, fileType, fileData.length, fileData]);
        
        const result = db.exec('SELECT last_insert_rowid()');
        const id = result[0].values[0][0];
        
        saveDatabase();
        return id;
    },
    
    get: (id) => {
        const result = db.exec('SELECT * FROM attachments WHERE id = ?', [id]);
        
        if (result.length === 0 || result[0].values.length === 0) return null;
        
        const row = result[0].values[0];
        return {
            id: row[0],
            invoice_id: row[1],
            filename: row[2],
            file_type: row[3],
            file_size: row[4],
            file_data: row[5],
            uploaded_at: row[6]
        };
    },
    
    delete: (id) => {
        db.run('DELETE FROM attachments WHERE id = ?', [id]);
        saveDatabase();
        return { changes: 1 };
    },
    
    getByInvoice: (invoiceId) => {
        const result = db.exec(
            'SELECT id, filename, file_type, file_size, uploaded_at FROM attachments WHERE invoice_id = ?',
            [invoiceId]
        );
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            filename: row[1],
            file_type: row[2],
            file_size: row[3],
            uploaded_at: row[4]
        }));
    }
};

// Global Invoice operations
const globalInvoiceOps = {
    create: (globalInvoiceData) => {
        // Get or create client
        const client = clientOps.getOrCreate(globalInvoiceData.client.nom, globalInvoiceData.client.ICE);
        
        // Insert global invoice
        db.run(`
            INSERT INTO global_invoices (
                client_id, document_numero, document_date,
                total_ht, tva_rate, montant_tva, total_ttc
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            client.id,
            globalInvoiceData.document_numero,
            globalInvoiceData.document_date,
            globalInvoiceData.total_ht,
            globalInvoiceData.tva_rate,
            globalInvoiceData.montant_tva,
            globalInvoiceData.total_ttc
        ]);
        
        // Get global invoice ID
        const result = db.exec('SELECT last_insert_rowid()');
        const globalInvoiceId = result[0].values[0][0];
        
        // Link bon de livraison to global invoice
        if (globalInvoiceData.bon_livraison_ids && globalInvoiceData.bon_livraison_ids.length > 0) {
            for (const bonId of globalInvoiceData.bon_livraison_ids) {
                db.run(`
                    INSERT INTO global_invoice_bons (global_invoice_id, bon_livraison_id)
                    VALUES (?, ?)
                `, [globalInvoiceId, bonId]);
            }
        }
        
        saveDatabase();
        return globalInvoiceId;
    },
    
    getById: (id) => {
        const result = db.exec(`
            SELECT gi.*, c.nom as client_nom, c.ice as client_ice
            FROM global_invoices gi
            JOIN clients c ON gi.client_id = c.id
            WHERE gi.id = ?
        `, [id]);
        
        if (result.length === 0 || result[0].values.length === 0) return null;
        
        const row = result[0].values[0];
        const globalInvoice = {
            id: row[0],
            client_id: row[1],
            document_numero: row[2],
            document_date: row[3],
            total_ht: row[4],
            tva_rate: row[5],
            montant_tva: row[6],
            total_ttc: row[7],
            created_at: row[8],
            updated_at: row[9],
            client_nom: row[10],
            client_ice: row[11]
        };
        
        // Get linked bon de livraison
        const bonsResult = db.exec(`
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM global_invoice_bons gib
            JOIN invoices i ON gib.bon_livraison_id = i.id
            JOIN clients c ON i.client_id = c.id
            WHERE gib.global_invoice_id = ?
        `, [id]);
        
        globalInvoice.bons = bonsResult.length > 0 ? bonsResult[0].values.map(row => ({
            id: row[0],
            client_id: row[1],
            document_type: row[2],
            document_date: row[3],
            document_numero: row[4],
            document_numero_Order: row[5],
            document_numero_bl: row[6],
            document_numero_devis: row[7],
            document_order_devis: row[8],
            document_bon_de_livraison: row[9],
            document_numero_commande: row[10],
            total_ht: row[11],
            tva_rate: row[12],
            montant_tva: row[13],
            total_ttc: row[14],
            created_at: row[15],
            updated_at: row[16],
            client_nom: row[17],
            client_ice: row[18]
        })) : [];
        
        globalInvoice.bon_count = globalInvoice.bons.length;
        
        return globalInvoice;
    },
    
    getAll: () => {
        const query = `
            SELECT gi.*, c.nom as client_nom, c.ice as client_ice,
                   (SELECT COUNT(*) FROM global_invoice_bons WHERE global_invoice_id = gi.id) as bon_count
            FROM global_invoices gi
            JOIN clients c ON gi.client_id = c.id
            ORDER BY gi.created_at DESC
        `;
        
        const result = db.exec(query);
        
        if (result.length === 0) return [];
        
        const globalInvoices = result[0].values.map(row => ({
            id: row[0],
            client_id: row[1],
            document_numero: row[2],
            document_date: row[3],
            total_ht: row[4],
            tva_rate: row[5],
            montant_tva: row[6],
            total_ttc: row[7],
            created_at: row[8],
            updated_at: row[9],
            client_nom: row[10],
            client_ice: row[11],
            bon_count: row[12]
        }));
        
        // Get bons for each global invoice
        globalInvoices.forEach(gi => {
            const bonsQuery = `
                SELECT i.id, i.document_numero, i.document_numero_bl, i.document_numero_commande,
                       i.document_date, i.total_ht, i.total_ttc
                FROM invoices i
                JOIN global_invoice_bons gib ON i.id = gib.bon_livraison_id
                WHERE gib.global_invoice_id = ?
            `;
            const bonsResult = db.exec(bonsQuery, [gi.id]);
            
            if (bonsResult.length > 0) {
                gi.bons = bonsResult[0].values.map(bonRow => ({
                    id: bonRow[0],
                    document_numero: bonRow[1],
                    document_numero_bl: bonRow[2],
                    document_numero_commande: bonRow[3],
                    document_date: bonRow[4],
                    total_ht: bonRow[5],
                    total_ttc: bonRow[6]
                }));
            } else {
                gi.bons = [];
            }
        });
        
        return globalInvoices;
    },
    
    update: (id, globalInvoiceData) => {
        // Update global invoice
        db.run(`
            UPDATE global_invoices SET
                document_numero = ?,
                document_date = ?,
                total_ht = ?,
                tva_rate = ?,
                montant_tva = ?,
                total_ttc = ?,
                updated_at = datetime('now')
            WHERE id = ?
        `, [
            globalInvoiceData.document_numero,
            globalInvoiceData.document_date,
            globalInvoiceData.total_ht,
            globalInvoiceData.tva_rate,
            globalInvoiceData.montant_tva,
            globalInvoiceData.total_ttc,
            id
        ]);
        
        // Delete old links
        db.run('DELETE FROM global_invoice_bons WHERE global_invoice_id = ?', [id]);
        
        // Insert new links
        if (globalInvoiceData.bon_livraison_ids && globalInvoiceData.bon_livraison_ids.length > 0) {
            for (const bonId of globalInvoiceData.bon_livraison_ids) {
                db.run(`
                    INSERT INTO global_invoice_bons (global_invoice_id, bon_livraison_id)
                    VALUES (?, ?)
                `, [id, bonId]);
            }
        }
        
        saveDatabase();
        return { changes: 1 };
    },
    
    delete: (id) => {
        db.run('DELETE FROM global_invoices WHERE id = ?', [id]);
        saveDatabase();
        return { changes: 1 };
    },
    
    checkBonNumeroExists: (numero) => {
        // Check if a bon numero already exists in the database
        const result = db.exec(`
            SELECT COUNT(*) as count
            FROM invoices
            WHERE (document_numero_bl = ? OR document_numero = ?)
            AND document_type = 'bon_livraison'
        `, [numero, numero]);
        
        if (result.length === 0) return { exists: false };
        
        const count = result[0].values[0][0];
        return { exists: count > 0 };
    },
    
    getBonsByClient: (clientId) => {
        // Get all bon de livraison for a specific client
        const result = db.exec(`
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
            WHERE i.client_id = ? AND i.document_type = 'bon_livraison'
            ORDER BY i.document_date DESC
        `, [clientId]);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            client_id: row[1],
            document_type: row[2],
            document_date: row[3],
            document_numero: row[4],
            document_numero_Order: row[5],
            document_numero_bl: row[6],
            document_numero_devis: row[7],
            document_order_devis: row[8],
            document_bon_de_livraison: row[9],
            document_numero_commande: row[10],
            total_ht: row[11],
            tva_rate: row[12],
            montant_tva: row[13],
            total_ttc: row[14],
            created_at: row[15],
            updated_at: row[16],
            client_nom: row[17],
            client_ice: row[18]
        }));
    }
};

// Prefix operations
const prefixOps = {
    // Get all prefixes
    getAll: function() {
        if (!db) throw new Error('Database not initialized');
        
        const result = db.exec(`SELECT prefix FROM prefixes ORDER BY prefix ASC`);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => row[0]);
    },
    
    // Add new prefix
    add: function(prefix) {
        if (!db) throw new Error('Database not initialized');
        
        try {
            db.run(`INSERT INTO prefixes (prefix) VALUES (?)`, [prefix.toUpperCase()]);
            saveDatabase();
            return { success: true };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return { success: false, error: 'Prefix already exists' };
            }
            throw error;
        }
    },
    
    // Delete prefix
    delete: function(prefix) {
        if (!db) throw new Error('Database not initialized');
        
        // Check if it's the last prefix
        const count = db.exec(`SELECT COUNT(*) as count FROM prefixes`);
        if (count[0].values[0][0] <= 1) {
            return { success: false, error: 'Cannot delete the last prefix' };
        }
        
        db.run(`DELETE FROM prefixes WHERE prefix = ?`, [prefix]);
        saveDatabase();
        return { success: true };
    }
};

// Function to delete all data
function deleteAllData() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    
    // Delete all data from tables
    db.run('DELETE FROM global_invoice_bons');
    db.run('DELETE FROM global_invoices');
    db.run('DELETE FROM attachments');
    db.run('DELETE FROM invoice_products');
    db.run('DELETE FROM invoices');
    db.run('DELETE FROM clients');
    
    // Reset auto-increment counters
    db.run('DELETE FROM sqlite_sequence WHERE name IN ("clients", "invoices", "invoice_products", "attachments", "global_invoices", "global_invoice_bons")');
    
    // Save database
    saveDatabase();
}

// Getter for database instance
function getDatabase() {
    return db;
}

module.exports = {
    initDatabase,
    getDatabase,
    saveDatabase,
    clientOps,
    invoiceOps,
    attachmentOps,
    globalInvoiceOps,
    prefixOps,
    deleteAllData
};
