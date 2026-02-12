const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

// Database instance
let db = null;
let SQL = null;

// Database file path - use userData directory for production
const dbDir = app ? app.getPath('userData') : path.join(__dirname);
const dbPath = path.join(dbDir, 'skm.db');

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
            console.log('✅ [SKM] Database loaded successfully');
        } else {
            db = new SQL.Database();
            console.log('✅ [SKM] Database created successfully');
        }
        
        // Create SKM devis numbers table
        db.run(`
            CREATE TABLE IF NOT EXISTS skm_devis_numbers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                devis_number TEXT NOT NULL UNIQUE,
                year INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                used_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Create index for faster searching
        db.run(`CREATE INDEX IF NOT EXISTS idx_skm_devis_year ON skm_devis_numbers(year, devis_number)`);
        
        // Create SKM PDF files table
        db.run(`
            CREATE TABLE IF NOT EXISTS skm_pdf_files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                devis_number TEXT NOT NULL,
                year INTEGER NOT NULL,
                file_path TEXT NOT NULL,
                created_by TEXT DEFAULT 'Unknown',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(devis_number, year)
            )
        `);
        
        // Create index for PDF files
        db.run(`CREATE INDEX IF NOT EXISTS idx_skm_pdf_year ON skm_pdf_files(year, devis_number)`);
        
        console.log('✅ [SKM] Database tables created successfully');
        
        // Save database
        saveDatabase();
        
        return true;
    } catch (error) {
        console.error('❌ [SKM] Database initialization failed:', error);
        throw error;
    }
}

// Save database to file
function saveDatabase() {
    if (db) {
        const data = db.export();
        fs.writeFileSync(dbPath, data);
    }
}

// SKM Devis Numbers Operations
const skmDevisOps = {
    // Check if devis number exists
    exists: (devisNumber, year = null) => {
        let query = 'SELECT COUNT(*) as count FROM skm_devis_numbers WHERE devis_number = ?';
        let params = [devisNumber];
        
        if (year) {
            query += ' AND year = ?';
            params.push(year);
        }
        
        const result = db.exec(query, params);
        return result.length > 0 && result[0].values[0][0] > 0;
    },
    
    // Add new devis number
    add: (devisNumber, year = new Date().getFullYear()) => {
        // Check if already exists
        if (skmDevisOps.exists(devisNumber, year)) {
            throw new Error(`رقم الـ Devis "${devisNumber}" موجود مسبقاً في سنة ${year}`);
        }
        
        db.run(`
            INSERT INTO skm_devis_numbers (devis_number, year, created_at, used_at)
            VALUES (?, ?, datetime('now'), datetime('now'))
        `, [devisNumber, year]);
        
        saveDatabase();
        return true;
    },
    
    // Get all devis numbers for a year
    getByYear: (year) => {
        const result = db.exec(`
            SELECT devis_number, created_at, used_at
            FROM skm_devis_numbers 
            WHERE year = ?
            ORDER BY created_at DESC
        `, [year]);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            devis_number: row[0],
            created_at: row[1],
            used_at: row[2]
        }));
    },
    
    // Get all devis numbers
    getAll: () => {
        const result = db.exec(`
            SELECT devis_number, year, created_at, used_at
            FROM skm_devis_numbers 
            ORDER BY year DESC, created_at DESC
        `);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            devis_number: row[0],
            year: row[1],
            created_at: row[2],
            used_at: row[3]
        }));
    },
    
    // Delete devis number
    delete: (devisNumber, year = null) => {
        let query = 'DELETE FROM skm_devis_numbers WHERE devis_number = ?';
        let params = [devisNumber];
        
        if (year) {
            query += ' AND year = ?';
            params.push(year);
        }
        
        db.run(query, params);
        saveDatabase();
        return true;
    },
    
        // Get last devis number for a year
    getLast: (year = new Date().getFullYear()) => {
        const result = db.exec(`
            SELECT devis_number, created_at, used_at
            FROM skm_devis_numbers 
            WHERE year = ?
            ORDER BY used_at DESC, created_at DESC
            LIMIT 1
        `, [year]);
        
        if (result.length === 0 || result[0].values.length === 0) {
            return null;
        }
        
        return {
            devis_number: result[0].values[0][0],
            created_at: result[0].values[0][1],
            used_at: result[0].values[0][2]
        };
    },
    
    // Get maximum devis number for a year (largest number)
    getMax: (year = new Date().getFullYear()) => {
        const allDevis = skmDevisOps.getByYear(year);
        
        if (allDevis.length === 0) {
            return null;
        }
        
        let maxDevis = null;
        let maxNumber = 0;
        
        allDevis.forEach(item => {
            const match = item.devis_number.match(/^(\d+)\/\d+$/);
            if (match) {
                const number = parseInt(match[1]);
                if (number > maxNumber) {
                    maxNumber = number;
                    maxDevis = item;
                }
            }
        });
        
        return maxDevis;
    },
    
    // Clear all data
    clearAll: () => {
        db.run('DELETE FROM skm_devis_numbers');
        db.run('DELETE FROM sqlite_sequence WHERE name = "skm_devis_numbers"');
        saveDatabase();
        return true;
    }
};

// SKM PDF Files Operations
const skmPdfOps = {
    // Save PDF file path
    savePdfPath: (devisNumber, year, filePath, createdBy = 'Unknown') => {
        try {
            db.run(`
                INSERT OR REPLACE INTO skm_pdf_files (devis_number, year, file_path, created_by, created_at)
                VALUES (?, ?, ?, ?, datetime('now'))
            `, [devisNumber, year, filePath, createdBy]);
            
            saveDatabase();
            return true;
        } catch (error) {
            console.error('❌ [SKM] Error saving PDF path:', error);
            throw error;
        }
    },
    
    // Get PDF file path
    getPdfPath: (devisNumber, year) => {
        const result = db.exec(`
            SELECT file_path, created_by, created_at
            FROM skm_pdf_files
            WHERE devis_number = ? AND year = ?
        `, [devisNumber, year]);
        
        if (result.length === 0 || result[0].values.length === 0) {
            return null;
        }
        
        return {
            file_path: result[0].values[0][0],
            created_by: result[0].values[0][1],
            created_at: result[0].values[0][2]
        };
    },
    
    // Delete PDF path
    deletePdfPath: (devisNumber, year) => {
        db.run(`
            DELETE FROM skm_pdf_files
            WHERE devis_number = ? AND year = ?
        `, [devisNumber, year]);
        
        saveDatabase();
        return true;
    }
};

module.exports = {
    initDatabase,
    skmDevisOps,
    skmPdfOps,
    saveDatabase
};
