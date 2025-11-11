const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

// Database instance
let db = null;
let SQL = null;

// Database file path - use userData directory for production
const dbDir = app ? app.getPath('userData') : path.join(__dirname);
const dbPath = path.join(dbDir, 'multi.db');

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
            console.log('✅ [MULTI] SQLite Database loaded successfully');
        } else {
            db = new SQL.Database();
            console.log('✅ [MULTI] SQLite Database created successfully');
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
        
        db.run(`
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company_code TEXT NOT NULL,
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
                FOREIGN KEY (client_id) REFERENCES clients(id),
                UNIQUE(document_numero, company_code)
            )
        `);
        
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
        
        // Create invoice_notes table for storing notes related to invoices
        db.run(`
            CREATE TABLE IF NOT EXISTS invoice_notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id INTEGER NOT NULL,
                note_text TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
            )
        `);
        
        // Check if note_text column exists, if not add it (for existing databases)
        try {
            const tableInfo = db.exec(`PRAGMA table_info(invoice_notes)`);
            if (tableInfo.length > 0) {
                const columns = tableInfo[0].values.map(row => row[1]); // column names are at index 1
                if (!columns.includes('note_text')) {
                    console.log('⚠️ [MULTI DB] Adding missing note_text column to invoice_notes table');
                    db.run(`ALTER TABLE invoice_notes ADD COLUMN note_text TEXT`);
                    saveDatabase();
                }
            }
        } catch (error) {
            console.log('ℹ️ [MULTI DB] Note: Could not check/add note_text column:', error.message);
        }
        
        // Create multi_order_prefixes table for storing MULTI N° Order prefixes
        db.run(`
            CREATE TABLE IF NOT EXISTS multi_order_prefixes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prefix TEXT NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insert default MULTI order prefixes if table is empty
        const checkMultiOrderPrefixes = db.exec("SELECT COUNT(*) as count FROM multi_order_prefixes");
        if (checkMultiOrderPrefixes.length === 0 || checkMultiOrderPrefixes[0].values[0][0] === 0) {
            db.run(`INSERT OR IGNORE INTO multi_order_prefixes (prefix) VALUES ('ORD'), ('CMD'), ('BC')`);
            saveDatabase();
        }
        
        // Save database to file
        saveDatabase();
        
    } catch (error) {
        console.error('❌ [MULTI] Error initializing database:', error);
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
    },
    
    delete: (clientId) => {
        // Check if client is used in any invoices
        const invoiceCheck = db.exec('SELECT COUNT(*) as count FROM invoices WHERE client_id = ?', [clientId]);
        const invoiceCount = invoiceCheck[0].values[0][0];
        
        if (invoiceCount > 0) {
            throw new Error('Cannot delete client: client is referenced in existing invoices');
        }
        
        // Delete the client
        db.run('DELETE FROM clients WHERE id = ?', [clientId]);
        saveDatabase();
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
        
        // Get next sequential_id for this year and company
        const seqResult = db.exec(`
            SELECT MAX(sequential_id) as max_seq 
            FROM invoices 
            WHERE year = ? AND company_code = ?
        `, [year, invoiceData.company_code]);
        
        let nextSeqId = 1;
        if (seqResult.length > 0 && seqResult[0].values.length > 0 && seqResult[0].values[0][0] !== null) {
            nextSeqId = seqResult[0].values[0][0] + 1;
        }
        
        console.log(`📊 [${invoiceData.company_code}] Creating invoice for year ${year} with sequential_id: ${nextSeqId}`);
        
        // Insert invoice
        db.run(`
            INSERT INTO invoices (
                company_code, client_id, document_type, document_date,
                document_numero, document_numero_Order, document_numero_bl,
                document_numero_devis, document_order_devis, document_bon_de_livraison,
                document_numero_commande, year, sequential_id,
                total_ht, tva_rate, montant_tva, total_ttc
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            invoiceData.company_code,
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
            company_code: row[1],
            client_id: row[2],
            document_type: row[3],
            document_date: row[4],
            document_numero: row[5],
            document_numero_Order: row[6],
            document_numero_bl: row[7],
            document_numero_devis: row[8],
            document_order_devis: row[9],
            document_bon_de_livraison: row[10],
            document_numero_commande: row[11],
            year: row[12],
            sequential_id: row[13],
            total_ht: row[14],
            tva_rate: row[15],
            montant_tva: row[16],
            total_ttc: row[17],
            created_at: row[18],
            updated_at: row[19],
            client_nom: row[20],
            client_ice: row[21]
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
    
    getAll: (companyCode = null) => {
        let query = `
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
        `;
        let params = [];
        
        if (companyCode) {
            query += ' WHERE i.company_code = ?';
            params.push(companyCode);
        }
        
        query += ' ORDER BY i.created_at DESC';
        
        const result = db.exec(query, params);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => {
            const invoiceId = row[0];
            
            // Get products for this invoice
            const productsResult = db.exec('SELECT * FROM invoice_products WHERE invoice_id = ?', [invoiceId]);
            const products = productsResult.length > 0 ? productsResult[0].values.map(pRow => ({
                id: pRow[0],
                invoice_id: pRow[1],
                designation: pRow[2],
                quantite: pRow[3],
                prix_unitaire_ht: pRow[4],
                total_ht: pRow[5]
            })) : [];
            
            return {
                id: invoiceId,
                company_code: row[1],
                client_id: row[2],
                document_type: row[3],
                document_date: row[4],
                document_numero: row[5],
                document_numero_Order: row[6],
                document_numero_bl: row[7],
                document_numero_devis: row[8],
                document_order_devis: row[9],
                document_bon_de_livraison: row[10],
                document_numero_commande: row[11],
                year: row[12],
                sequential_id: row[13],
                total_ht: row[14],
                tva_rate: row[15],
                montant_tva: row[16],
                total_ttc: row[17],
                created_at: row[18],
                updated_at: row[19],
                client_nom: row[20],
                client_ice: row[21],
                products: products
            };
        });
    },
    
    update: (id, invoiceData) => {
        console.log('🔄 [MULTI DB UPDATE] Updating invoice:', id);
        
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
        
        // Check if client info changed
        if (invoiceData.client.ICE !== oldClientICE || invoiceData.client.nom !== oldClientNom) {
            const existingClient = db.exec('SELECT id FROM clients WHERE ice = ? AND nom = ?', 
                [invoiceData.client.ICE, invoiceData.client.nom]);
            
            if (existingClient.length > 0 && existingClient[0].values.length > 0) {
                newClientId = existingClient[0].values[0][0];
            } else {
                newClientId = clientOps.create(invoiceData.client.nom, invoiceData.client.ICE);
            }
        }
        
        // Update invoice
        db.run(`
            UPDATE invoices SET
                client_id = ?,
                document_date = ?,
                document_numero = ?,
                document_numero_Order = ?,
                document_numero_devis = ?,
                total_ht = ?,
                tva_rate = ?,
                montant_tva = ?,
                total_ttc = ?,
                updated_at = datetime('now')
            WHERE id = ?
        `, [
            newClientId,
            invoiceData.document.date,
            invoiceData.document.numero || null,
            invoiceData.document.numero_Order || null,
            invoiceData.document.numero_devis || null,
            invoiceData.totals.total_ht,
            invoiceData.totals.tva_rate,
            invoiceData.totals.montant_tva,
            invoiceData.totals.total_ttc,
            id
        ]);
        
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
    getNextInvoiceNumber: (companyCode, documentType, year = null) => {
        const currentYear = year || new Date().getFullYear();
        
        console.log(`🔢 [DB] getNextInvoiceNumber called with:`, { companyCode, documentType, year: currentYear });
        
        // Get max sequential_id for this year and company
        const query = `
            SELECT MAX(sequential_id) as max_seq 
            FROM invoices 
            WHERE year = ? AND company_code = ?
        `;
        
        console.log(`🔢 [DB] Executing query:`, query);
        console.log(`🔢 [DB] Query params:`, [currentYear, companyCode]);
        
        const result = db.exec(query, [currentYear, companyCode]);
        console.log(`🔢 [DB] Query result:`, result);
        
        let nextNumber = 1;
        if (result.length > 0 && result[0].values.length > 0 && result[0].values[0][0] !== null) {
            nextNumber = result[0].values[0][0] + 1;
            console.log(`🔢 [DB] Found max sequential_id:`, result[0].values[0][0], '-> Next number:', nextNumber);
        } else {
            console.log(`🔢 [DB] No invoices found for this year, starting from 1`);
        }
        
        const returnValue = { 
            nextNumber: nextNumber,
            number: nextNumber, 
            formatted: `${nextNumber}/${currentYear}` 
        };
        
        console.log(`🔢 [DB] Returning:`, returnValue);
        return returnValue;
    },
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

// Function to delete all data
function deleteAllData() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    
    db.run('DELETE FROM attachments');
    db.run('DELETE FROM invoice_products');
    db.run('DELETE FROM invoices');
    db.run('DELETE FROM clients');
    db.run('DELETE FROM sqlite_sequence WHERE name IN ("clients", "invoices", "invoice_products", "attachments")');
    
    saveDatabase();
}

// Getter for database instance
function getDatabase() {
    return db;
}

// MULTI Order Prefix operations
const multiOrderPrefixOps = {
    // Get all MULTI order prefixes
    getAll: function() {
        if (!db) throw new Error('Database not initialized');
        
        const result = db.exec(`SELECT prefix FROM multi_order_prefixes ORDER BY prefix ASC`);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => row[0]);
    },
    
    // Add new MULTI order prefix
    add: function(prefix) {
        if (!db) throw new Error('Database not initialized');
        
        try {
            db.run(`INSERT INTO multi_order_prefixes (prefix) VALUES (?)`, [prefix.toUpperCase()]);
            saveDatabase();
            return { success: true };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return { success: false, error: 'Prefix already exists' };
            }
            throw error;
        }
    },
    
    // Delete MULTI order prefix
    delete: function(prefix) {
        if (!db) throw new Error('Database not initialized');
        
        // Check if it's the last prefix
        const count = db.exec(`SELECT COUNT(*) as count FROM multi_order_prefixes`);
        if (count[0].values[0][0] <= 1) {
            return { success: false, error: 'Cannot delete the last prefix' };
        }
        
        db.run(`DELETE FROM multi_order_prefixes WHERE prefix = ?`, [prefix]);
        saveDatabase();
        return { success: true };
    }
};

// Get missing invoice numbers for MULTI company (format: MTTXXX/2025)
function getMissingMultiInvoiceNumbers(year) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database not initialized'));
        }

        try {
            // Get all invoice numbers for MULTI company (format: MTT0012025 without /)
            let query;
            if (year) {
                query = `
                    SELECT document_numero 
                    FROM invoices 
                    WHERE document_type = 'facture' 
                    AND document_numero LIKE 'MTT%${year}'
                `;
            } else {
                // Get all invoices regardless of year
                query = `
                    SELECT document_numero 
                    FROM invoices 
                    WHERE document_type = 'facture' 
                    AND document_numero LIKE 'MTT%'
                `;
            }
            
            const invoices = db.exec(query);
            
            console.log(`🔍 [MULTI FACTURE] Searching for year: ${year || 'ALL'}`);
            console.log(`🔍 [MULTI FACTURE] Found ${invoices.length > 0 && invoices[0].values.length > 0 ? invoices[0].values.length : 0} invoices`);
            
            if (invoices.length === 0 || invoices[0].values.length === 0) {
                console.log(`❌ [MULTI FACTURE] No invoices found for year ${year || 'ALL'}`);
                return resolve({ success: true, data: [] });
            }

            // Extract numbers from document_numero (format: "MTT0012025")
            const usedNumbers = invoices[0].values
                .map(row => {
                    const match = row[0].match(/^MTT(\d+)(\d{4})$/);
                    if (!match) return null;
                    const num = parseInt(match[1]);
                    const docYear = parseInt(match[2]);
                    // If year is specified, only include numbers from that year
                    if (year && docYear !== parseInt(year)) return null;
                    return num;
                })
                .filter(num => num !== null)
                .sort((a, b) => a - b);

            if (usedNumbers.length === 0) {
                return resolve({ success: true, data: [] });
            }

            // Find missing numbers between min and max number
            const minNumber = Math.min(...usedNumbers);
            const maxNumber = Math.max(...usedNumbers);
            const missingNumbers = [];

            for (let i = minNumber + 1; i < maxNumber; i++) {
                if (!usedNumbers.includes(i)) {
                    missingNumbers.push(i);
                }
            }

            resolve({ 
                success: true, 
                data: missingNumbers,
                stats: {
                    min: minNumber,
                    max: maxNumber,
                    used: usedNumbers.length,
                    missing: missingNumbers.length
                }
            });
        } catch (error) {
            console.error('Error getting missing MULTI invoice numbers:', error);
            reject(error);
        }
    });
}

// Get missing devis numbers for MULTI company (format: MTTXXX2025)
function getMissingMultiDevisNumbers(year) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database not initialized'));
        }

        try {
            // Get all devis numbers for MULTI company (stored in document_numero_devis)
            let query;
            if (year) {
                query = `
                    SELECT document_numero_devis 
                    FROM invoices 
                    WHERE document_type = 'devis' 
                    AND document_numero_devis IS NOT NULL
                    AND document_numero_devis != ''
                    AND document_numero_devis LIKE 'MTT%${year}'
                `;
            } else {
                // Get all devis regardless of year
                query = `
                    SELECT document_numero_devis 
                    FROM invoices 
                    WHERE document_type = 'devis' 
                    AND document_numero_devis IS NOT NULL
                    AND document_numero_devis != ''
                    AND document_numero_devis LIKE 'MTT%'
                `;
            }
            
            const devisNumbers = db.exec(query);
            
            console.log(`🔍 [MULTI DEVIS] Searching for year: ${year || 'ALL'}`);
            console.log(`🔍 [MULTI DEVIS] Found ${devisNumbers.length > 0 && devisNumbers[0].values.length > 0 ? devisNumbers[0].values.length : 0} devis`);
            
            if (devisNumbers.length === 0 || devisNumbers[0].values.length === 0) {
                console.log(`❌ [MULTI DEVIS] No devis found for year ${year || 'ALL'}`);
                return resolve({ success: true, data: [] });
            }

            // Extract numbers from document_numero_devis (format: "MTT0012025")
            const usedNumbers = devisNumbers[0].values
                .map(row => {
                    const match = row[0].match(/^MTT(\d+)(\d{4})$/);
                    if (!match) return null;
                    const num = parseInt(match[1]);
                    const docYear = parseInt(match[2]);
                    // If year is specified, only include numbers from that year
                    if (year && docYear !== parseInt(year)) return null;
                    return num;
                })
                .filter(num => num !== null)
                .sort((a, b) => a - b);

            if (usedNumbers.length === 0) {
                return resolve({ success: true, data: [] });
            }

            // Find missing numbers between min and max number
            const minNumber = Math.min(...usedNumbers);
            const maxNumber = Math.max(...usedNumbers);
            const missingNumbers = [];

            for (let i = minNumber + 1; i < maxNumber; i++) {
                if (!usedNumbers.includes(i)) {
                    missingNumbers.push(i);
                }
            }

            resolve({ 
                success: true, 
                data: missingNumbers,
                stats: {
                    min: minNumber,
                    max: maxNumber,
                    used: usedNumbers.length,
                    missing: missingNumbers.length
                }
            });
        } catch (error) {
            console.error('Error getting missing MULTI devis numbers:', error);
            reject(error);
        }
    });
}

// Notes operations
const noteOps = {
    // Save or update note for an invoice
    saveNote: (invoiceId, noteText) => {
        return new Promise((resolve, reject) => {
            try {
                // Check if note already exists
                const existing = db.exec(
                    `SELECT id FROM invoice_notes WHERE invoice_id = ?`,
                    [invoiceId]
                );

                if (existing.length > 0 && existing[0].values.length > 0) {
                    // Update existing note
                    db.run(
                        `UPDATE invoice_notes SET note_text = ?, updated_at = CURRENT_TIMESTAMP WHERE invoice_id = ?`,
                        [noteText, invoiceId]
                    );
                } else {
                    // Insert new note
                    db.run(
                        `INSERT INTO invoice_notes (invoice_id, note_text) VALUES (?, ?)`,
                        [invoiceId, noteText]
                    );
                }

                saveDatabase();
                resolve({ success: true });
            } catch (error) {
                console.error('Error saving note:', error);
                reject(error);
            }
        });
    },

    // Get note for an invoice
    getNote: (invoiceId) => {
        return new Promise((resolve, reject) => {
            try {
                const result = db.exec(
                    `SELECT note_text FROM invoice_notes WHERE invoice_id = ?`,
                    [invoiceId]
                );

                if (result.length > 0 && result[0].values.length > 0) {
                    resolve({ success: true, data: result[0].values[0][0] });
                } else {
                    resolve({ success: true, data: null });
                }
            } catch (error) {
                console.error('Error getting note:', error);
                reject(error);
            }
        });
    },

    // Delete note for an invoice
    deleteNote: (invoiceId) => {
        return new Promise((resolve, reject) => {
            try {
                db.run(`DELETE FROM invoice_notes WHERE invoice_id = ?`, [invoiceId]);
                saveDatabase();
                resolve({ success: true });
            } catch (error) {
                console.error('Error deleting note:', error);
                reject(error);
            }
        });
    }
};

module.exports = {
    initDatabase,
    getDatabase,
    saveDatabase,
    clientOps,
    invoiceOps,
    attachmentOps,
    multiOrderPrefixOps,
    noteOps,
    getMissingMultiInvoiceNumbers,
    getMissingMultiDevisNumbers,
    deleteAllData
};
