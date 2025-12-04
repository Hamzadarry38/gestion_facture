const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { app } = require('electron');

// Database instance
let db = null;
let SQL = null;

// Database file path - use userData directory for production
const dbDir = app ? app.getPath('userData') : path.join(__dirname);
const dbPath = path.join(dbDir, 'users.db');

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
async function initializeDatabase() {
    try {
        SQL = await initSqlJs();
        
        // Check if database file exists
        if (fs.existsSync(dbPath)) {
            const buffer = fs.readFileSync(dbPath);
            db = new SQL.Database(buffer);
            // console.log('✅ Users Database loaded successfully');
        } else {
            db = new SQL.Database();
            // console.log('✅ Users Database created');
        }
        
        // Create users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Save to file
        saveDatabase();
        // console.log('✅ Users table ready');
    } catch (error) {
        console.error('❌ Error initializing users database:', error);
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

// Hash password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Create new user
function createUser(name, email, password) {
    return new Promise((resolve, reject) => {
        try {
            const hashedPassword = hashPassword(password);
            
            // Check if email already exists
            const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
            checkStmt.bind([email]);
            if (checkStmt.step()) {
                checkStmt.free();
                reject(new Error('Email already exists'));
                return;
            }
            checkStmt.free();
            
            // Insert new user
            db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
            
            // Get the inserted user
            const stmt = db.prepare('SELECT id, name, email FROM users WHERE email = ?');
            stmt.bind([email]);
            if (stmt.step()) {
                const user = {
                    id: stmt.getAsObject().id,
                    name: stmt.getAsObject().name,
                    email: stmt.getAsObject().email
                };
                stmt.free();
                saveDatabase();
                resolve(user);
            } else {
                stmt.free();
                reject(new Error('Failed to create user'));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Verify user credentials
function verifyUser(email, password) {
    return new Promise((resolve, reject) => {
        try {
            const hashedPassword = hashPassword(password);
            
            const stmt = db.prepare('SELECT id, name, email FROM users WHERE email = ? AND password = ?');
            stmt.bind([email, hashedPassword]);
            
            if (stmt.step()) {
                const user = stmt.getAsObject();
                stmt.free();
                resolve(user);
            } else {
                stmt.free();
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Check if any users exist
function hasUsers() {
    return new Promise((resolve, reject) => {
        try {
            const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
            if (stmt.step()) {
                const result = stmt.getAsObject();
                stmt.free();
                resolve(result.count > 0);
            } else {
                stmt.free();
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Get all users (for admin purposes)
function getAllUsers() {
    return new Promise((resolve, reject) => {
        try {
            const users = [];
            const stmt = db.prepare('SELECT id, name, email, created_at FROM users');
            
            while (stmt.step()) {
                users.push(stmt.getAsObject());
            }
            stmt.free();
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

// Update user password
function updatePassword(email, oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
        try {
            console.log('🔐 [DB] Attempting to update password for:', email);
            
            // First verify the old password
            const oldHashedPassword = hashPassword(oldPassword);
            console.log('🔐 [DB] Old password hash:', oldHashedPassword.substring(0, 10) + '...');
            
            const verifyStmt = db.prepare('SELECT id FROM users WHERE email = ? AND password = ?');
            verifyStmt.bind([email, oldHashedPassword]);
            
            if (!verifyStmt.step()) {
                verifyStmt.free();
                console.log('❌ [DB] Old password verification failed for:', email);
                reject(new Error('Old password is incorrect'));
                return;
            }
            verifyStmt.free();
            
            console.log('✅ [DB] Old password verified successfully');
            
            // Update with new password
            const newHashedPassword = hashPassword(newPassword);
            console.log('🔐 [DB] New password hash:', newHashedPassword.substring(0, 10) + '...');
            
            db.run('UPDATE users SET password = ? WHERE email = ?', [newHashedPassword, email]);
            
            saveDatabase();
            console.log('✅ [DB] Password updated and saved to database');
            resolve({ success: true, message: 'Password updated successfully' });
        } catch (error) {
            console.error('❌ [DB] Error updating password:', error);
            reject(error);
        }
    });
}

module.exports = {
    initializeDatabase,
    createUser,
    verifyUser,
    hasUsers,
    getAllUsers,
    updatePassword
};
