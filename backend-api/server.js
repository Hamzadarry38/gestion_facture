const express = require('express');
const { Pool, types } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Fix: Override pg DATE type parser to return raw strings instead of JS Date objects
// This prevents timezone-related off-by-one-day bugs (OID 1082 = DATE)
types.setTypeParser(1082, (val) => val);

const app = express();
const port = 8001;

let isModifiedColumnExists = null;
async function checkIsModifiedExists() {
  if (isModifiedColumnExists !== null) return isModifiedColumnExists;
  try {
    const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'invoices' AND column_name = 'is_modified'
    `);
    isModifiedColumnExists = res.rows.length > 0;
    return isModifiedColumnExists;
  } catch (err) {
    console.error('Error checking is_modified column:', err);
    return false;
  }
}

let isConvertedColumnExists = null;
async function checkIsConvertedExists() {
  if (isConvertedColumnExists !== null) return isConvertedColumnExists;
  try {
    const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'invoices' AND column_name = 'is_converted'
    `);
    isConvertedColumnExists = res.rows.length > 0;
    return isConvertedColumnExists;
  } catch (err) {
    console.error('Error checking is_converted column:', err);
    return false;
  }
}

// --- FILE UPLOAD CONFIGURATION (Multer) for PDFs ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { company } = req.params;
    const year = new Date().getFullYear().toString();
    const uploadPath = path.join(__dirname, '..', 'uploads', company, year);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({ storage: storage });

// --- ATTACHMENT FILE UPLOAD CONFIGURATION (Multer) ---
const attachmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { company } = req.params;
    const attachPath = path.join(__dirname, '..', 'attachments', company.toUpperCase());
    if (!fs.existsSync(attachPath)) {
      fs.mkdirSync(attachPath, { recursive: true });
    }
    cb(null, attachPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    cb(null, uniqueName);
  }
});

const uploadAttachment = multer({
  storage: attachmentStorage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max
});

// Serve static files from "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve static files from "attachments" directory (online access)
app.use('/attachments', express.static(path.join(__dirname, '..', 'attachments')));

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facture_db',
  password: '123456',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Auto-migrate: ensure file_url column exists in invoice_attachments
(async () => {
  try {
    await pool.query(`ALTER TABLE invoice_attachments ADD COLUMN IF NOT EXISTS file_url TEXT`);
    console.log('✅ [MIGRATION] file_url column ensured in invoice_attachments');
  } catch (e) {
    console.warn('⚠️ [MIGRATION] Could not add file_url column:', e.message);
  }
})();

// Auto-migrate: ensure position column exists in invoice_products
(async () => {
  try {
    await pool.query(`ALTER TABLE invoice_products ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0`);
    // Update existing products that have position=0 with correct order based on id
    await pool.query(`
      WITH ranked AS (
        SELECT id, invoice_id, ROW_NUMBER() OVER (PARTITION BY invoice_id ORDER BY id) - 1 as new_pos
        FROM invoice_products WHERE position = 0 OR position IS NULL
      )
      UPDATE invoice_products ip SET position = r.new_pos
      FROM ranked r WHERE ip.id = r.id AND (ip.position = 0 OR ip.position IS NULL)
    `);
    console.log('✅ [MIGRATION] position column ensured in invoice_products');
  } catch (e) {
    console.warn('⚠️ [MIGRATION] Could not add position column:', e.message);
  }
})();

// Auto-migrate: ensure is_featured and private_notes columns exist in invoices
(async () => {
  try {
    await pool.query(`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS is_featured INTEGER DEFAULT 0`);
    await pool.query(`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS private_notes TEXT`);
    console.log('✅ [MIGRATION] is_featured and private_notes columns ensured in invoices');
  } catch (e) {
    console.warn('⚠️ [MIGRATION] Could not add is_featured/private_notes columns:', e.message);
  }
})();

// Helper: Hash password (matching the original app's crypto logic)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// --- MANUAL MIGRATION: Add is_featured + private_notes columns ---
app.get('/migrate/featured', async (req, res) => {
  console.log('🔧 [MIGRATE] Running manual migration for is_featured + private_notes...');
  try {
    await pool.query(`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS is_featured INTEGER DEFAULT 0`);
    console.log('✅ [MIGRATE] is_featured column added/verified');
    await pool.query(`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS private_notes TEXT`);
    console.log('✅ [MIGRATE] private_notes column added/verified');

    // Verify columns exist
    const checkResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'invoices' 
      AND column_name IN ('is_featured', 'private_notes')
    `);
    console.log('📋 [MIGRATE] Columns found:', checkResult.rows);

    res.json({ 
      success: true, 
      message: 'Migration completed successfully',
      columns: checkResult.rows 
    });
  } catch (e) {
    console.error('❌ [MIGRATE] Error:', e.message);
    res.status(500).json({ success: false, error: e.message });
  }
});

// --- SCHEMA IMPORT ROUTE ---
app.post('/api/schema/import', upload.single('schema'), async (req, res) => {
  console.log('📥 [POST] /api/schema/import requested');
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log(`📂 Reading schema file: ${filePath}`);
    const sql = fs.readFileSync(filePath, 'utf8');

    // Basic validation to ensure it's a SQL file
    if (!sql.trim().startsWith('--') && !sql.trim().startsWith('BEGIN;') && !sql.trim().toUpperCase().startsWith('CREATE')) {
      // Cleanup
      fs.unlinkSync(filePath);
      return res.status(400).json({ success: false, error: 'Invalid SQL file format' });
    }

    const client = await pool.connect();
    try {
      console.log('⏳ Executing schema import...');
      await client.query(sql);
      console.log('✅ Schema import successful');
      res.json({ success: true, message: 'Schema imported successfully' });
    } catch (dbErr) {
      console.error('❌ Database error during import:', dbErr);
      res.status(500).json({ success: false, error: dbErr.message });
    } finally {
      client.release();
      // Cleanup uploaded file
      try {
        fs.unlinkSync(filePath);
      } catch (e) { console.error('Error deleting temp file:', e); }
    }
  } catch (err) {
    console.error('❌ Error in /api/schema/import:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- SYSTEM ROUTES ---
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now, message: 'Connected to Postgres (API 5)!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Temporary endpoint to add can_auto_validate column
app.get('/admin/migrate-users', async (req, res) => {
  try {
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS can_auto_validate BOOLEAN DEFAULT FALSE`);
    
    // Verify column was added
    const result = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'can_auto_validate'
    `);
    
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Column can_auto_validate added successfully!' });
    } else {
      res.json({ success: false, message: 'Column was not added' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- USER ROUTES ---
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const result = await pool.query('SELECT id, name, email, can_auto_validate FROM users WHERE email = $1 AND password = $2', [email, hashedPassword]);

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- HELPER DATA ROUTES ---
app.get('/invoices/next-number/:company/:year/:docType', async (req, res) => {
  try {
    const { company, year, docType } = req.params;
    // Logic depends on how you want to number. 
    // Assuming sequential_id is per year/company/docType or just year/company.
    // Legacy app seemed to use sequential_id.
    // Let's get max sequential_id for this year/company.
    const result = await pool.query(
      'SELECT MAX(sequential_id) as max_seq FROM invoices WHERE company_code = $1 AND year = $2 AND document_type = $3',
      [company.toUpperCase(), year, docType]
    );
    const nextSeq = (result.rows[0].max_seq || 0) + 1;

    // Format the number (e.g., 2024/001) - implementation detail depends on legacy format
    // For now, return the sequential id and let frontend format, or return formatted.
    // Legacy `invoiceOps.getNextInvoiceNumber` likely returned a formatted string.
    // We'll return just the integer for now or constructing a simple default.
    res.json({ success: true, data: nextSeq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/invoices/available-years/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const result = await pool.query(
      'SELECT DISTINCT year FROM invoices WHERE company_code = $1 ORDER BY year DESC',
      [company.toUpperCase()]
    );
    const years = result.rows.map(r => r.year);
    res.json({ success: true, data: years });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/invoices/missing-numbers/:company/:year/:docType', async (req, res) => {
  try {
    const { company, year, docType } = req.params;
    const companyCode = company.toUpperCase();
    const targetYear = parseInt(year);

    // Map docType to PostgreSQL column
    let targetColumn = 'document_numero';
    if (docType === 'bon_livraison') targetColumn = 'document_numero_bl';
    else if (docType === 'devis') targetColumn = 'document_numero_devis';
    else if (docType === 'order') targetColumn = 'document_numero_order';

    // Fetch all document numbers for the given company, year, and type
    const result = await pool.query(
      `SELECT ${targetColumn} as numero 
       FROM invoices 
       WHERE company_code = $1 
       AND year = $2 
       AND document_type = $3
       AND ${targetColumn} IS NOT NULL
       AND ${targetColumn} != ''`,
      [companyCode, targetYear, docType]
    );

    const allNumbers = result.rows.map(r => r.numero);

    if (allNumbers.length === 0) {
      return res.json({ success: true, data: [], stats: { min: 0, max: 0, used: 0, missing: 0 } });
    }

    const prefixGroups = {};

    allNumbers.forEach(numStr => {
      let match = null;
      let prefix = '';
      let number = null;

      if (companyCode === 'MULTI') {
        // Multi format: MTT0012025 or MTT 0012025
        match = numStr.match(/^MTT\s*(\d+)(\d{4})$/);
        if (match) {
          prefix = 'MTT';
          number = parseInt(match[1]);
        }
      } else {
        // General format: "123", "123/2025", "MG123", "MG123/2025", "MG 123/2025"
        // Also supports numbers without year suffix since SQL already filters by year
        match = numStr.match(/^([A-Z]*)\s*(\d+)(?:\/(\d{4}))?$/);
        if (match) {
          prefix = match[1] || '';
          number = parseInt(match[2]);
        }
      }

      if (number !== null) {
        if (!prefixGroups[prefix]) prefixGroups[prefix] = [];
        prefixGroups[prefix].push(number);
      }
    });

    const missingByPrefix = {};
    let totalMissing = 0;

    Object.keys(prefixGroups).forEach(prefix => {
      const numbers = [...new Set(prefixGroups[prefix])].sort((a, b) => a - b);
      if (numbers.length === 0) return;

      const minNumber = Math.min(...numbers);
      const maxNumber = Math.max(...numbers);
      const missing = [];

      for (let i = minNumber + 1; i < maxNumber; i++) {
        if (!numbers.includes(i)) {
          missing.push(i);
        }
      }

      if (missing.length > 0) {
        missingByPrefix[prefix] = missing;
        totalMissing += missing.length;
      }
    });

    // For backward compatibility with simpler frontend, flatten if only one prefix or empty
    const flattenedMissing = [].concat(...Object.values(missingByPrefix));

    // Calculate overall min and max from all existing numbers
    const allNumericValues = [].concat(...Object.values(prefixGroups));
    const overallMin = allNumericValues.length > 0 ? Math.min(...allNumericValues) : 0;
    const overallMax = allNumericValues.length > 0 ? Math.max(...allNumericValues) : 0;

    res.json({
      success: true,
      data: flattenedMissing,
      byPrefix: missingByPrefix,
      stats: {
        min: overallMin,
        max: overallMax,
        totalMissing: totalMissing,
        missing: totalMissing,
        prefixCount: Object.keys(missingByPrefix).length,
        used: allNumbers.length
      }
    });
  } catch (err) {
    console.error('❌ Error in /invoices/missing-numbers:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get users count
app.get('/users/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM users');
    res.json({ success: true, count: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/auth/password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Verify old password
    const oldHashed = hashPassword(oldPassword);
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, oldHashed]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Ancien mot de passe incorrect' });
    }

    // Update to new password
    const newHashed = hashPassword(newPassword);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [newHashed, email]);

    res.json({ success: true, message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- DATA ROUTES ---
// --- CLIENT ROUTES ---
app.get('/clients/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const result = await pool.query('SELECT * FROM clients WHERE company_code = $1 ORDER BY nom', [company.toUpperCase()]);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/clients', async (req, res) => {
  try {
    const { nom, ice, company_code } = req.body;
    const result = await pool.query(
      'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nom, ice, company_code]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- INVOICE ROUTES ---

// Get all pending invoices (MUST be before /invoices/:company)
app.get('/invoices/pending', async (req, res) => {
  try {
    const { company_code, user_id } = req.query;
    console.log(`🔍 [API DEBUG] GET /invoices/pending called for company: ${company_code || 'ALL'}, user_id: ${user_id || 'NONE'}`);

    let query = `
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      LEFT JOIN clients c ON i.client_id = c.id 
      WHERE i.validation_status = 'pending'
    `;
    const params = [];
    let paramIndex = 1;

    if (company_code) {
      query += ` AND i.company_code = $${paramIndex}`;
      params.push(company_code.toUpperCase());
      paramIndex++;
    }

    // Exclude invoices created by the current user
    if (user_id) {
      query += ` AND (i.created_by_user_id IS NULL OR i.created_by_user_id != $${paramIndex})`;
      params.push(parseInt(user_id));
      paramIndex++;
    }

    query += ` ORDER BY i.id DESC`;

    const result = await pool.query(query, params);

    // Fetch attachment counts for these invoices
    if (result.rows.length > 0) {
      const invoiceIds = result.rows.map(inv => inv.id);
      const countsRes = await pool.query(`
        SELECT invoice_id, COUNT(*) as count 
        FROM invoice_attachments 
        WHERE invoice_id = ANY($1::int[]) 
        GROUP BY invoice_id
      `, [invoiceIds]);

      const countsMap = {};
      countsRes.rows.forEach(r => countsMap[r.invoice_id] = parseInt(r.count));

      result.rows.forEach(inv => {
        inv.attachment_count = countsMap[inv.id] || 0;
      });
    }

    console.log(`🔍 [API DEBUG] Found ${result.rows.length} pending invoices in DB`);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('❌ [API ERROR] /invoices/pending:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/invoices/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const columnExists = await checkIsModifiedExists();
    const convertedColumnExists = await checkIsConvertedExists();

    // Fetch invoices with client info
    const invoicesRes = await pool.query(`
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      ${columnExists ? ', i.is_modified' : ''}
      ${convertedColumnExists ? ', i.is_converted' : ''}
      FROM invoices i 
      JOIN clients c ON i.client_id = c.id 
      WHERE i.company_code = $1
      ORDER BY i.id DESC
    `, [company.toUpperCase()]);

    const invoices = invoicesRes.rows;

    // Fetch products for these invoices
    // Optimization: In a real app we might join or batch fetch. For now, let's keep it simple or do a loop.
    // To match legacy structure, we usually embed products.
    // Let's do a second query for products.
    if (invoices.length > 0) {
      const invoiceIds = invoices.map(inv => inv.id);
      const productsRes = await pool.query(`SELECT * FROM invoice_products WHERE invoice_id = ANY($1::int[]) ORDER BY position, id`, [invoiceIds]);

      // Map products to invoices
      const productsMap = {};
      productsRes.rows.forEach(p => {
        if (!productsMap[p.invoice_id]) productsMap[p.invoice_id] = [];
        productsMap[p.invoice_id].push(p);
      });

      invoices.forEach(inv => {
        inv.products = productsMap[inv.id] || [];
      });

      // Fetch attachment counts
      const countsRes = await pool.query(`
        SELECT invoice_id, COUNT(*) as count 
        FROM invoice_attachments 
        WHERE invoice_id = ANY($1::int[]) 
        GROUP BY invoice_id
      `, [invoiceIds]);

      const countsMap = {};
      countsRes.rows.forEach(r => countsMap[r.invoice_id] = parseInt(r.count));

      invoices.forEach(inv => {
        inv.attachment_count = countsMap[inv.id] || 0;
      });
    }

    // 🔍 DATE DIAGNOSTIC: Log first 3 invoice dates as they come from PostgreSQL
    if (invoices.length > 0) {
      const sample = invoices.slice(0, 3).map(inv => ({
        id: inv.id,
        document_date: inv.document_date,
        document_date_type: typeof inv.document_date,
        created_at: inv.created_at,
        created_at_type: typeof inv.created_at
      }));
      console.log('📅 [DATE DIAGNOSTIC] Raw dates from PostgreSQL:', JSON.stringify(sample, null, 2));
    }

    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/invoices/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceRes = await pool.query(`
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      JOIN clients c ON i.client_id = c.id 
      WHERE i.id = $1
    `, [id]);

    if (invoiceRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const invoice = invoiceRes.rows[0];
    console.log(`📅 [DATE DIAGNOSTIC] GET /invoices/id/${id} - document_date from DB: "${invoice.document_date}" (type: ${typeof invoice.document_date}), created_at: "${invoice.created_at}"`);
    const productsRes = await pool.query('SELECT * FROM invoice_products WHERE invoice_id = $1 ORDER BY position, id', [id]);
    invoice.products = productsRes.rows;

    // Fetch attachments
    // Fetch attachments (Safe fallback: Order by ID if created_at is missing)
    const attachmentsRes = await pool.query('SELECT * FROM invoice_attachments WHERE invoice_id = $1 ORDER BY id DESC', [id]);
    invoice.attachments = attachmentsRes.rows;
    invoice.attachment_count = attachmentsRes.rows.length;

    // ✅ Reset is_modified flag ONLY when viewed by a user WITHOUT auto-validate
    // (i.e. Admin or users with can_auto_validate should NOT reset - they see the colors)
    // Actually: the reset should happen when Admin views, so the color disappears after Admin sees it
    const viewerEmail = req.query.user_email || '';
    
    // Check if viewer is Admin (the one who reviews invoices)
    // Admin = redouanerrebbahi99@gmail.com - the person who needs to see and clear the flags
    const isAdminViewer = viewerEmail === 'redouanerrebbahi99@gmail.com';
    
    console.log(`🔍 [IS_MODIFIED DEBUG] Invoice ${id}: viewer=${viewerEmail}, isAdmin=${isAdminViewer}`);
    
    // Handle both boolean true and string 'true' or numeric 1
    const isModified = invoice.is_modified === true || invoice.is_modified === 'true' || invoice.is_modified === 1;
    
    // Only reset if Admin is viewing (Admin clears the flags by viewing)
    if (isModified && isAdminViewer) {
      console.log(`🔄 [IS_MODIFIED] Admin viewing - resetting is_modified for invoice ${id}`);
      try {
        await pool.query('UPDATE invoices SET is_modified = false WHERE id = $1', [id]);
        invoice.is_modified = false;
      } catch (e) {
        console.error('❌ [IS_MODIFIED] Error resetting:', e.message);
      }
    }

    res.json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/invoices', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let {
      company_code, client_id, document_type, document_date,
      document_numero, document_numero_order, document_numero_bl,
      document_numero_devis, document_order_devis, document_bon_de_livraison,
      document_numero_commande, year, sequential_id,
      total_ht, tva_rate, montant_tva, total_ttc,
      creation_method, created_by, delivered_by, ar_status,
      created_by_user_id, created_by_user_name, created_by_user_email,
      products
    } = req.body;

    // Handle nested format from frontend (document, client, totals)
    if (req.body.document) {
      const doc = req.body.document;
      company_code = req.body.company_code || company_code;
      document_type = doc.type || document_type;
      document_date = doc.date || document_date;
      document_numero = doc.numero || document_numero;
      document_numero_order = doc.numero_order || doc.numero_Order || document_numero_order;
      document_numero_bl = doc.numero_bl || doc.numero_BL || document_numero_bl;
      document_numero_devis = doc.numero_devis || document_numero_devis;
      document_order_devis = doc.order_devis || document_order_devis;
      document_bon_de_livraison = doc.bon_de_livraison || document_bon_de_livraison;
      document_numero_commande = doc.numero_commande || document_numero_commande;
      year = req.body.year || year;
      creation_method = doc.creation_method || creation_method;
      created_by = doc.created_by || created_by;
      delivered_by = doc.delivered_by || delivered_by;

      // User identification
      req.body.created_by_user_id = doc.created_by_user_id || req.body.created_by_user_id;
      req.body.created_by_user_name = doc.created_by_user_name || req.body.created_by_user_name;
      req.body.created_by_user_email = doc.created_by_user_email || req.body.created_by_user_email;

      const ar_status_val = doc.ar_status || req.body.ar_status || '';
      req.body.ar_status_resolved = ar_status_val;
    }

    if (req.body.totals) {
      const t = req.body.totals;
      total_ht = t.total_ht !== undefined ? t.total_ht : total_ht;
      tva_rate = t.tva_rate !== undefined ? t.tva_rate : tva_rate;
      montant_tva = t.montant_tva !== undefined ? t.montant_tva : montant_tva;
      total_ttc = t.total_ttc !== undefined ? t.total_ttc : total_ttc;
    }

    // Resolve client_id if missing but client details provided
    if (!client_id && req.body.client) {
      const c = req.body.client;
      const clientNom = c.nom;
      // 🔧 تحويل ICE إلى empty string ('') بدلاً من null إذا كان فارغاً
      const clientICE = c.ICE || c.ice || '';
      
      // 🔍 البحث عن العميل بالاسم + ICE + company_code معاً
      // هذا يضمن أن زبون بدون ICE وزبون مع ICE = سجلين منفصلين
      const clientRes = await client.query(
        'SELECT id FROM clients WHERE nom = $1 AND ice = $2 AND company_code = $3 LIMIT 1',
        [clientNom, clientICE, company_code]
      );

      if (clientRes.rows.length > 0) {
        // ✅ العميل موجود بنفس الاسم ونفس ICE
        client_id = clientRes.rows[0].id;
        console.log(`✅ [API] Found existing client ${clientNom} (ID: ${client_id}) with ICE: ${clientICE || '(empty)'}`);
      } else {
        // ➕ إنشاء عميل جديد (سواء كان بدون ICE أو مع ICE مختلف)
        const insertClientRes = await client.query(
          'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
          [clientNom, clientICE, company_code]
        );
        client_id = insertClientRes.rows[0].id;
        console.log(`✅ [API] Created new client ${clientNom} (ID: ${client_id}) with ICE: ${clientICE || '(empty)'}`);
      }
    }

    // Fallback for year if not provided
    if (!year && document_date) {
      year = parseInt(String(document_date).substring(0, 4)) || new Date().getFullYear();
    }

    // Check for auto-validation permission AND resolve user name
    let validation_status = 'pending';
    let resolvedUserId = req.body.created_by_user_id || null;
    let resolvedUserName = req.body.created_by_user_name || null;
    let resolvedUserEmail = req.body.created_by_user_email || null;

    // Use email/id to resolve user and check permissions
    const checkEmail = resolvedUserEmail || (created_by && created_by.includes('@') ? created_by : null);

    if (checkEmail) {
      try {
        const userRes = await client.query('SELECT id, name, email, can_auto_validate FROM users WHERE email = $1', [checkEmail]);
        if (userRes.rows.length > 0) {
          const u = userRes.rows[0];
          resolvedUserId = resolvedUserId || u.id;
          resolvedUserName = resolvedUserName || u.name;
          resolvedUserEmail = resolvedUserEmail || u.email;

          if (u.can_auto_validate === true) {
            validation_status = 'validated';
            console.log(`✅ [API DEBUG] User ${checkEmail} has auto-validation permission.`);
          } else {
            console.log(`ℹ️ [API DEBUG] User ${checkEmail} does NOT have auto-validation. Status set to pending.`);
          }
        }
      } catch (e) {
        console.error('❌ [API ERROR] Failed to check user permissions:', e);
      }
    } else if (resolvedUserId) {
      try {
        // Fallback: lookup by ID
        const userRes = await client.query('SELECT id, name, email, can_auto_validate FROM users WHERE id = $1', [resolvedUserId]);
        if (userRes.rows.length > 0) {
          const u = userRes.rows[0];
          resolvedUserId = u.id;
          resolvedUserName = resolvedUserName || u.name;
          resolvedUserEmail = resolvedUserEmail || u.email;

          if (u.can_auto_validate === true) {
            validation_status = 'validated';
            console.log(`✅ [API DEBUG] User ID ${resolvedUserId} has auto-validation permission.`);
          } else {
            console.log(`ℹ️ [API DEBUG] User ID ${resolvedUserId} does NOT have auto-validation. Status set to pending.`);
          }
        }
      } catch (e) {
        console.error('❌ [API ERROR] Failed to check user permissions by ID:', e);
      }
    }

    const columnExists = await checkIsModifiedExists();
    const convertedColumnExists = await checkIsConvertedExists();

    // 🚀 Handle Devis Conversion Logic
    // If this is a Facture or BL created from a Devis (has document_numero_devis)
    if (document_numero_devis && (document_type === 'facture' || document_type === 'bon_livraison')) {
      try {
        if (convertedColumnExists) {
          console.log(`🔄 [API] Marking Devis ${document_numero_devis} as converted...`);
          // Find the devis by numero and update is_converted
          const updateDevisRes = await client.query(
            `UPDATE invoices 
             SET is_converted = TRUE 
             WHERE (document_numero = $1 OR document_numero_devis = $1)
             AND document_type = 'devis' 
             AND company_code = $2`,
            [document_numero_devis, company_code]
          );
          console.log(`✅ [API] Updated ${updateDevisRes.rowCount} Devis to converted status.`);
        }
      } catch (err) {
        console.error('⚠️ [API WARNING] Failed to update Devis conversion status:', err);
      }
    }

    const insertInvoiceText = `
      INSERT INTO invoices (
        company_code, client_id, document_type, document_date, 
        document_numero, document_numero_order, document_numero_bl,
        document_numero_devis, document_order_devis, document_bon_de_livraison,
        document_numero_commande, year, sequential_id,
        total_ht, tva_rate, montant_tva, total_ttc,
        creation_method, created_by, delivered_by, ar_status, 
        validation_status, 
        created_by_user_id, created_by_user_name, created_by_user_email
        ${columnExists ? ', is_modified' : ''}
        ${convertedColumnExists ? ', is_converted' : ''},
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25 ${columnExists ? ', $26' : ''} ${convertedColumnExists ? (columnExists ? ', $27' : ', $26') : ''}, NOW(), NOW())
      RETURNING id
    `;

    // is_modified should always be FALSE on CREATE (new invoices are not "modified")
    // is_modified will be set to TRUE only on UPDATE by regular users
    // This way:
    // - New invoices (validation_status=pending, is_modified=false) appear as "Nouveau"
    // - Edited invoices (validation_status=pending, is_modified=true) appear as "Modifié"
    const initialIsModified = false;

    console.log(`📝 [CREATE] Invoice creator: ${resolvedUserEmail}, is_modified: ${initialIsModified}`);
    
    // 🔍 DEBUG LOGS FOR TVA
    console.log('🔍 [BACKEND CREATE] TVA DEBUG:');
    console.log('  - Raw tva_rate from request:', req.body.totals?.tva_rate);
    console.log('  - Type of tva_rate:', typeof req.body.totals?.tva_rate);
    console.log('  - tva_rate value:', tva_rate);
    console.log('  - Is undefined?:', tva_rate === undefined);
    console.log('  - Is null?:', tva_rate === null);
    console.log('  - Is empty string?:', tva_rate === '');
    const finalTvaRate = (tva_rate !== undefined && tva_rate !== null && tva_rate !== '') ? tva_rate : 20;
    console.log('  - Final TVA to save:', finalTvaRate);

    const invoiceValues = [
      company_code, client_id, document_type, document_date,
      document_numero, document_numero_order, document_numero_bl,
      document_numero_devis, document_order_devis, document_bon_de_livraison,
      document_numero_commande, year, sequential_id || 0,
      total_ht || 0, finalTvaRate, montant_tva || 0, total_ttc || 0,
      creation_method || 'normal', created_by || null, delivered_by || null,
      req.body.ar_status_resolved || '',
      validation_status,
      resolvedUserId,
      resolvedUserName,
      resolvedUserEmail
    ];
    if (columnExists) invoiceValues.push(initialIsModified); // is_modified based on creator
    if (convertedColumnExists) invoiceValues.push(false); // is_converted default

    console.log(`📝 [API DEBUG] Creating invoice for ${company_code}:`, {
      numero: document_numero,
      type: document_type,
      status: validation_status,
      creator: resolvedUserName
    });

    const resInvoice = await client.query(insertInvoiceText, invoiceValues);
    const invoiceId = resInvoice.rows[0].id;

    if (products && products.length > 0) {
      const insertProductText = `
        INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht, position)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        await client.query(insertProductText, [invoiceId, p.designation, p.quantite, p.prix_unitaire_ht, p.total_ht, i]);
      }
    }

    await client.query('COMMIT');
    res.json({ success: true, data: { id: invoiceId } });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error in POST /invoices:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

// Update invoice metadata (featured status & private notes)
app.patch('/invoices/:id/metadata', async (req, res) => {
  console.log(`🔧 [PATCH /invoices/${req.params.id}/metadata] Body:`, JSON.stringify(req.body));
  try {
    const { id } = req.params;
    const { is_featured, private_notes } = req.body;

    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (is_featured !== undefined) {
      updates.push(`is_featured = $${paramIndex++}`);
      params.push(is_featured || 0);
    }
    if (private_notes !== undefined && private_notes !== null) {
      updates.push(`private_notes = $${paramIndex++}`);
      params.push(private_notes);
    }

    if (updates.length === 0) {
      return res.json({ success: true, changes: 0 });
    }

    updates.push(`updated_at = NOW()`);
    params.push(id);

    const result = await pool.query(
      `UPDATE invoices SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    res.json({ success: true, changes: 1 });
  } catch (err) {
    console.error('Error updating invoice metadata:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/invoices/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id } = req.params;

    // Initialize with undefined but we will carefully assign
    let {
      company_code, client_id, document_date,
      document_numero, document_numero_order, document_numero_bl,
      document_numero_devis, document_order_devis, document_bon_de_livraison,
      document_numero_commande,
      total_ht, tva_rate, montant_tva, total_ttc,
      created_by, delivered_by, ar_status, validation_status,
      created_by_user_id, created_by_user_name, created_by_user_email,
      updated_by_user_id, updated_by_user_name, updated_by_user_email,
      products, private_notes
    } = req.body;

    // Fallback: If these are at top-level but NOT in doc, we use them.
    // However, if doc exists, inner doc takes precedence below.

    // Handle nested format from frontend (document, totals)
    if (req.body.document) {
      const doc = req.body.document;
      // Use undefined check to allow empty strings or 0 (though unlikely for date)
      if (doc.type !== undefined) document_type = doc.type; // Usually not changed but for reference
      if (doc.date !== undefined) document_date = doc.date;
      if (doc.numero !== undefined) document_numero = doc.numero;
      if (doc.numero_Order !== undefined) document_numero_order = doc.numero_Order; // Note casing from frontend often numero_Order
      if (doc.numero_bl !== undefined) document_numero_bl = doc.numero_bl;
      if (doc.numero_devis !== undefined) document_numero_devis = doc.numero_devis;
      if (doc.order_devis !== undefined) document_order_devis = doc.order_devis; // If used
      if (doc.bon_de_livraison !== undefined) document_bon_de_livraison = doc.bon_de_livraison;
      if (doc.numero_commande !== undefined) document_numero_commande = doc.numero_commande;

      if (doc.created_by !== undefined) created_by = doc.created_by;
      if (doc.delivered_by !== undefined) delivered_by = doc.delivered_by;
      if (doc.ar_status !== undefined) ar_status = doc.ar_status;

      // LOGIC CHANGE: If an invoice is updated, default it back to 'pending' so Admin sees it.
      // Unless the user has can_auto_validate permission in User Management.
      if (doc.validation_status !== undefined) {
        validation_status = doc.validation_status;
      } else {
        // Check if this is a content edit (including ar_status change)
        const isContentEdit = doc.date !== undefined || doc.numero !== undefined || 
          doc.numero_Order !== undefined || doc.numero_bl !== undefined || 
          doc.numero_devis !== undefined || doc.order_devis !== undefined ||
          doc.bon_de_livraison !== undefined || doc.numero_commande !== undefined ||
          doc.type !== undefined || doc.ar_status !== undefined || products !== undefined || 
          req.body.totals !== undefined || req.body.client !== undefined;
        
        // Check if editor has auto-validation permission from User Management
        let hasAutoValidate = false;
        const editorEmail = doc.updated_by_user_email;
        if (editorEmail) {
          try {
            const userCheck = await pool.query('SELECT can_auto_validate FROM users WHERE email = $1', [editorEmail]);
            if (userCheck.rows.length > 0 && userCheck.rows[0].can_auto_validate === true) {
              hasAutoValidate = true;
            }
          } catch (e) {
            console.error('❌ [UPDATE] Error checking user auto-validate permission:', e.message);
          }
        }
        
        console.log(`📝 [VALIDATION_STATUS LOGIC] isContentEdit=${isContentEdit}, editorEmail=${editorEmail}, hasAutoValidate=${hasAutoValidate}`);
        
        if (isContentEdit) {
          if (!hasAutoValidate) {
            validation_status = 'pending';
            console.log(`📝 [VALIDATION_STATUS] User without auto-validate editing - setting to 'pending'`);
          } else {
            console.log(`📝 [VALIDATION_STATUS] User with auto-validate editing - keeping current status`);
          }
        } else {
          console.log(`📝 [VALIDATION_STATUS] Not a content edit - keeping current status`);
        }
      }

      // User identification
      if (doc.created_by_user_id !== undefined) created_by_user_id = doc.created_by_user_id;
      if (doc.created_by_user_name !== undefined) created_by_user_name = doc.created_by_user_name;
      if (doc.created_by_user_email !== undefined) created_by_user_email = doc.created_by_user_email;
      if (doc.updated_by_user_id !== undefined) updated_by_user_id = doc.updated_by_user_id;
      if (doc.updated_by_user_name !== undefined) updated_by_user_name = doc.updated_by_user_name;
      if (doc.updated_by_user_email !== undefined) updated_by_user_email = doc.updated_by_user_email;
    } else {
      // Default to pending if invoice content is being edited (including ar_status)
      const isContentEdit = products !== undefined || req.body.totals !== undefined || req.body.client !== undefined || ar_status !== undefined;
      if (validation_status === undefined && isContentEdit) validation_status = 'pending';
    }

    if (req.body.totals) {
      const t = req.body.totals;
      // Vital: check undefined because 0 is falsy
      if (t.total_ht !== undefined) total_ht = t.total_ht;
      if (t.tva_rate !== undefined) tva_rate = t.tva_rate;
      if (t.montant_tva !== undefined) montant_tva = t.montant_tva;
      if (t.total_ttc !== undefined) total_ttc = t.total_ttc;
    }

    // Resolve client_id if client info provided
    if (req.body.client) {
      const c = req.body.client;
      if (!company_code) {
        const invRes = await client.query('SELECT company_code FROM invoices WHERE id = $1', [id]);
        if (invRes.rows.length > 0) company_code = invRes.rows[0].company_code;
      }

      const clientRes = await client.query(
        'SELECT id FROM clients WHERE nom = $1 AND (ice = $2 OR ice IS NULL) AND company_code = $3 LIMIT 1',
        [c.nom, c.ICE || c.ice || null, company_code]
      );

      if (clientRes.rows.length > 0) {
        client_id = clientRes.rows[0].id;
      } else {
        const insertClientRes = await client.query(
          'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
          [c.nom, c.ICE || c.ice || null, company_code]
        );
        client_id = insertClientRes.rows[0].id;
      }
    }

    let year = null;
    if (document_date) {
      year = parseInt(String(document_date).substring(0, 4)) || new Date().getFullYear();
    }

    // Prepare values for update - using NULL for undefined to avoid pg error if we want to nullify?
    // Actually COALESCE logic in SQL: COALESCE($1, column) means "if $1 is NULL, keep column".
    // So if we want to UPDATE to NULL, we can't use COALESCE($1, col).
    // But usually undefined means "no change".
    // If value is explicitly NULL, we might want to set to NULL.
    // However, for simplicity and to match previous pattern:
    // We pass undefined as null, so COALESCE keeps existing.
    // EXCEPT if we want to support clearing a field (sending null).
    // Our frontend sends null for cleared fields.
    // So if frontend sends null, we behave like "keep existing"?
    // No, if frontend sends null, meaningful "clear".
    // But COALESCE($1, col) prevents setting to NULL.
    // We should fix the query to allow setting NULL if explicitly requested?
    // For "created_by", if I send null, do I want to clear it?
    // Probably not for created_by.
    // For totals, definitely not.
    // So COALESCE pattern is safer for "undefined means no change".
    // But we must ensure 0 is passed as 0, not undefined.

    // Helper: convert undefined to null (for COALESCE to skip)
    // But if we have 0, it stays 0.
    const val = (v) => v === undefined ? null : v;

    const columnExists = await checkIsModifiedExists();

    // Determine if this is a real content edit (not just ar_status/delivered_by)
    const doc = req.body.document || {};
    const hasContentChange = doc.date !== undefined || doc.numero !== undefined || 
      doc.numero_Order !== undefined || doc.numero_bl !== undefined || 
      doc.numero_devis !== undefined || doc.order_devis !== undefined ||
      doc.bon_de_livraison !== undefined || doc.numero_commande !== undefined ||
      doc.type !== undefined || doc.ar_status !== undefined || products !== undefined || 
      req.body.totals !== undefined || req.body.client !== undefined ||
      ar_status !== undefined;

    // Check if the user editing has auto-validate permission - if so, don't set is_modified
    let editorHasAutoValidate = false;
    if (updated_by_user_email) {
      try {
        const userAutoCheck = await pool.query('SELECT can_auto_validate FROM users WHERE email = $1', [updated_by_user_email]);
        if (userAutoCheck.rows.length > 0 && userAutoCheck.rows[0].can_auto_validate === true) {
          editorHasAutoValidate = true;
        }
      } catch (e) {
        console.error('❌ [UPDATE] Error checking user auto-validate for is_modified:', e.message);
      }
    }
    const shouldSetModified = columnExists && hasContentChange && !editorHasAutoValidate;

    console.log(`📝 [UPDATE] Invoice ${id}: hasContentChange=${hasContentChange}, editorEmail=${updated_by_user_email}, hasAutoValidate=${editorHasAutoValidate}, shouldSetModified=${shouldSetModified}`);
    console.log(`📝 [VALIDATION_STATUS] Invoice ${id}: validation_status=${validation_status}, type=${typeof validation_status}`);
    console.log(`📝 [FINAL VALUES] Invoice ${id}: is_modified will be ${shouldSetModified ? 'TRUE' : 'UNCHANGED'}, validation_status=${validation_status || 'UNCHANGED'}`);

    await client.query(`
            UPDATE invoices SET 
                client_id = COALESCE($1, client_id),
                document_date = COALESCE($2, document_date), 
                year = COALESCE($3, year),
                total_ht = COALESCE($4, total_ht), 
                tva_rate = COALESCE($5, tva_rate), 
                montant_tva = COALESCE($6, montant_tva), 
                total_ttc = COALESCE($7, total_ttc), 
                created_by = COALESCE($8, created_by), 
                delivered_by = COALESCE($9, delivered_by),
                document_numero = COALESCE($10, document_numero),
                document_numero_order = CASE WHEN $11::text = 'UNDEFINED_SKIP' THEN document_numero_order ELSE $11 END,
                document_numero_bl = COALESCE($12, document_numero_bl),
                document_numero_devis = COALESCE($13, document_numero_devis),
                document_bon_de_livraison = CASE WHEN $14::text = 'UNDEFINED_SKIP' THEN document_bon_de_livraison ELSE $14 END,
                document_numero_commande = CASE WHEN $15::text = 'UNDEFINED_SKIP' THEN document_numero_commande ELSE $15 END,
                ar_status = COALESCE($16, ar_status),
                validation_status = COALESCE($17, validation_status),
                updated_by_user_id = COALESCE($18, updated_by_user_id),
                updated_by_user_name = COALESCE($19, updated_by_user_name),
                updated_by_user_email = COALESCE($20, updated_by_user_email),
                private_notes = COALESCE($21, private_notes),
                ${shouldSetModified ? 'is_modified = true,' : ''}
                updated_at = NOW()
            WHERE id = $22
        `, [
      val(client_id),
      val(document_date),
      val(year),
      val(total_ht),
      val(tva_rate),
      val(montant_tva),
      val(total_ttc),
      val(created_by),
      val(delivered_by),
      val(document_numero),
      document_numero_order === undefined ? 'UNDEFINED_SKIP' : document_numero_order,
      val(document_numero_bl),
      val(document_numero_devis),
      document_bon_de_livraison === undefined ? 'UNDEFINED_SKIP' : document_bon_de_livraison,
      document_numero_commande === undefined ? 'UNDEFINED_SKIP' : document_numero_commande,
      val(ar_status),
      val(validation_status),
      val(updated_by_user_id),
      val(updated_by_user_name),
      val(updated_by_user_email),
      val(private_notes),
      id
    ]);

    // Replace products ONLY if products array is explicitly provided
    if (products !== undefined) {
      await client.query('DELETE FROM invoice_products WHERE invoice_id = $1', [id]);

      if (products && products.length > 0) {
        const insertProductText = `
                  INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht, position)
                  VALUES ($1, $2, $3, $4, $5, $6)
              `;
        for (let i = 0; i < products.length; i++) {
          const p = products[i];
          await client.query(insertProductText, [id, p.designation, p.quantite, p.prix_unitaire_ht, p.total_ht, i]);
        }
      }
    }

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error in PUT /invoices/:id:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

app.delete('/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Cascade delete should handle products/attachments if configured, but let's be safe
    await pool.query('DELETE FROM invoice_products WHERE invoice_id = $1', [id]);
    await pool.query('DELETE FROM invoice_attachments WHERE invoice_id = $1', [id]);
    await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Ensure file_url column exists in invoice_attachments ---
(async () => {
  try {
    await pool.query(`ALTER TABLE invoice_attachments ADD COLUMN IF NOT EXISTS file_url TEXT`);
    console.log('✅ [ATTACHMENTS] file_url column ensured in invoice_attachments');
  } catch (e) {
    console.error('⚠️ [ATTACHMENTS] Could not add file_url column:', e.message);
  }
})();

// --- UPLOAD ATTACHMENT FILE to server ---
// POST /attachments/upload/:company  (multipart/form-data, field: "file")
// Returns: { success, file_url, filename }
app.post('/attachments/upload/:company', uploadAttachment.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const { company } = req.params;
    const filename = req.file.filename;
    // Build public URL (include /facture prefix for reverse proxy)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const file_url = `${baseUrl}/facture/attachments/${company.toUpperCase()}/${filename}`;
    console.log(`✅ [ATTACHMENT UPLOAD] ${filename} → ${file_url}`);

    // If attachment_id provided (migration case), update file_url in DB
    const attachment_id = req.body && req.body.attachment_id;
    if (attachment_id) {
      await pool.query(
        'UPDATE invoice_attachments SET file_url = $1, file_path = NULL, file_data = NULL WHERE id = $2',
        [file_url, attachment_id]
      );
      console.log(`✅ [ATTACHMENT UPLOAD] Updated DB for attachment id=${attachment_id}`);
    }

    res.json({ success: true, file_url, filename });
  } catch (err) {
    console.error('❌ [ATTACHMENT UPLOAD] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- MIGRATE LOCAL ATTACHMENTS TO SERVER ---
// POST /attachments/migrate-to-server
// Body: { attachments: [{ id, file_data (base64), filename, company }] }
// Saves files on server, updates file_url in DB
app.post('/attachments/migrate-to-server', async (req, res) => {
  try {
    const { attachments } = req.body;
    if (!attachments || !Array.isArray(attachments)) {
      return res.status(400).json({ success: false, error: 'attachments array required' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    let migrated = 0;
    const errors = [];

    for (const att of attachments) {
      try {
        const { id, file_data, filename, company } = att;
        if (!file_data || !filename || !id) continue;

        const companyUpper = (company || 'GENERAL').toUpperCase();
        const attachDir = path.join(__dirname, '..', 'attachments', companyUpper);
        if (!fs.existsSync(attachDir)) fs.mkdirSync(attachDir, { recursive: true });

        const uniqueName = `${Date.now()}_${id}_${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
        const filePath = path.join(attachDir, uniqueName);

        // Write file from base64
        const buffer = Buffer.from(file_data, 'base64');
        fs.writeFileSync(filePath, buffer);

        const file_url = `${baseUrl}/attachments/${companyUpper}/${uniqueName}`;

        // Update DB
        await pool.query(
          'UPDATE invoice_attachments SET file_url = $1, file_path = NULL, file_data = NULL WHERE id = $2',
          [file_url, id]
        );

        migrated++;
      } catch (attErr) {
        errors.push({ id: att.id, error: attErr.message });
      }
    }

    res.json({ success: true, migrated, errors });
  } catch (err) {
    console.error('❌ [MIGRATE ATTACHMENTS] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get attachments needing migration (have file_path or file_data but no file_url)
app.get('/attachments/needs-migration/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const result = await pool.query(`
      SELECT ia.id, ia.filename, ia.file_type, ia.file_path, ia.file_data,
             i.company_code
      FROM invoice_attachments ia
      JOIN invoices i ON ia.invoice_id = i.id
      WHERE (ia.file_url IS NULL OR ia.file_url = '')
        AND (ia.file_path IS NOT NULL OR ia.file_data IS NOT NULL)
        AND ($1 = 'ALL' OR UPPER(i.company_code) = UPPER($1))
    `, [company]);

    const rows = result.rows.map(r => {
      if (r.file_data) r.file_data = Buffer.from(r.file_data).toString('base64');
      return r;
    });
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- ATTACHMENT ROUTES ---
app.get('/attachments/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, invoice_id, filename, file_type, file_size, file_path, file_url, file_data FROM invoice_attachments WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Attachment not found' });
    }
    const file = result.rows[0];
    if (file.file_data) {
      file.file_data = Buffer.from(file.file_data).toString('base64');
    }
    res.json({ success: true, data: file });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/attachments/invoice/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const result = await pool.query('SELECT id, filename, file_type, file_size, file_data FROM invoice_attachments WHERE invoice_id = $1 ORDER BY id DESC', [invoiceId]);
    const attachments = result.rows.map(att => {
      if (att.file_data) {
        att.file_data = Buffer.from(att.file_data).toString('base64');
      }
      return att;
    });
    res.json({ success: true, data: attachments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/attachments', async (req, res) => {
  console.log('🔵 [API] POST /attachments called');
  const client = await pool.connect();
  try {
    const { invoice_id, filename, file_type, file_size, file_data, file_path } = req.body;

    console.log(`📝 [API] Attempting to add attachment: ${filename} for invoice: ${invoice_id}`);
    console.log(`📊 [API] File details - Type: ${file_type}, Size: ${file_size}, Has file_data: ${!!file_data}, Has file_path: ${!!file_path}`);

    // Validate required fields
    if (!invoice_id) {
      throw new Error('invoice_id is required');
    }
    if (!filename) {
      throw new Error('filename is required');
    }

    await client.query('BEGIN');

    // Convert base64 to buffer if provided
    let dataBuffer = null;
    if (file_data) {
      try {
        dataBuffer = Buffer.from(file_data, 'base64');
        console.log(`📊 [API] Converted file_data to buffer (${dataBuffer.length} bytes)`);
      } catch (bufferErr) {
        console.error('❌ [API] Buffer conversion error:', bufferErr);
        throw new Error('Failed to convert file data: ' + bufferErr.message);
      }
    }

    // If file_path is an online URL, store it in file_url column instead
    const isOnlineUrl = file_path && (file_path.startsWith('http://') || file_path.startsWith('https://'));
    const localFilePath = isOnlineUrl ? null : (file_path || null);
    const fileUrl = isOnlineUrl ? file_path : null;

    const result = await client.query(
      `INSERT INTO invoice_attachments (invoice_id, filename, file_type, file_size, file_path, file_url, file_data)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [invoice_id, filename, file_type || 'application/octet-stream', file_size || 0, localFilePath, fileUrl, dataBuffer]
    );

    const attachmentId = result.rows[0].id;
    console.log(`✅ [API] Inserted attachment record ID: ${attachmentId}`);

    // Update attachment_count in invoices for performance (if column exists)
    await client.query(
      'UPDATE invoices SET attachment_count = (SELECT COUNT(*) FROM invoice_attachments WHERE invoice_id = $1) WHERE id = $1',
      [invoice_id]
    );

    await client.query('COMMIT');
    console.log(`✨ [API] Transaction committed successfully for invoice ${invoice_id}`);
    res.json({ success: true, data: { id: attachmentId } });
  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ [API] Attachment upload ERROR:', err);
    console.error('❌ [API] Error stack:', err.stack);
    res.status(500).json({ success: false, error: err.message || 'Failed to upload attachment' });
  } finally {
    client.release();
  }
});

app.delete('/attachments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM invoice_attachments WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- SECONDARY COMPANY ROUTES (Devis/PDF Tracking) ---

// (Redundant devis and pdf routes removed)


// --- DELIVERY PERSONS ROUTES ---
app.get('/delivery-persons/:company', async (req, res) => {
  try {
    const { company } = req.params;
    // Get unique delivery persons from invoices AND from a dedicated delivery_persons table if we want it truly persistent
    // For now, let's use the invoices as the source of truth, but we could add a table later.
    const result = await pool.query(
      'SELECT DISTINCT delivered_by FROM invoices WHERE company_code = $1 AND delivered_by IS NOT NULL AND delivered_by != \'\' ORDER BY delivered_by',
      [company.toUpperCase()]
    );
    const persons = result.rows.map(r => r.delivered_by);
    res.json({ success: true, data: persons });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/delivery-persons', async (req, res) => {
  try {
    const { name, company_code } = req.body;
    // This could just be a dummy endpoint if we rely on invoices, 
    // or we could actually insert into a dedicated table.
    // Let's implement a dedicated table for better persistence.
    await pool.query(
      'INSERT INTO delivery_persons (name, company_code) VALUES ($1, $2) ON CONFLICT (name, company_code) DO NOTHING',
      [name, company_code.toUpperCase()]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- VALIDATION & PERMISSIONS ROUTES ---

// Get all pending invoices
// Route moved up to avoid conflict with /invoices/:company

// Validate or Reject an invoice - ADMIN ONLY
app.put('/invoices/:id/validation', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, user_email } = req.body; // 'validated' or 'rejected'

    // Safety net: Only Admin can validate/reject invoices
    const isAdmin = user_email === 'redouanerrebbahi99@gmail.com';
    console.log(`🔐 [VALIDATION] Invoice ${id}: status=${status}, user_email=${user_email}, isAdmin=${isAdmin}`);
    
    if (!isAdmin) {
      console.log(`❌ [VALIDATION] Rejected - non-Admin user tried to validate invoice ${id}`);
      return res.status(403).json({ success: false, message: 'Action réservée à l\'admin' });
    }

    if (!['validated', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (status === 'rejected') {
      // User request: Rejecting a pending invoice should delete it
      await pool.query('DELETE FROM invoice_products WHERE invoice_id = $1', [id]);
      await pool.query('DELETE FROM invoice_attachments WHERE invoice_id = $1', [id]);
      const deleteResult = await pool.query('DELETE FROM invoices WHERE id = $1 RETURNING id', [id]);

      if (deleteResult.rows.length > 0) {
        res.json({ success: true, message: 'Invoice rejected and deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Invoice not found' });
      }
      return;
    }

    const columnExists = await checkIsModifiedExists();
    const result = await pool.query(
      `UPDATE invoices SET validation_status = $1${columnExists ? ', is_modified = false' : ''}, updated_at = NOW() WHERE id = $2 RETURNING id`,
      [status, id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: `Invoice ${status} successfully` });
    } else {
      res.status(404).json({ success: false, message: 'Invoice not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all users for permissions management
app.get('/users', async (req, res) => {
  try {
    // Ensure can_auto_validate column exists
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS can_auto_validate BOOLEAN DEFAULT FALSE`);
    } catch (e) { /* column already exists */ }

    const result = await pool.query('SELECT id, name, email, created_at, can_auto_validate FROM users ORDER BY name ASC');
    console.log(`📋 [USERS] Loaded ${result.rows.length} users:`, result.rows.map(u => `${u.name}(${u.email}): auto_validate=${u.can_auto_validate}`));
    res.json({ success: true, users: result.rows, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update user permissions
app.put('/users/:id/permissions', async (req, res) => {
  try {
    const { id } = req.params;
    const { can_auto_validate } = req.body;

    console.log(`🔄 [PERMISSIONS] Updating user ${id}: can_auto_validate = ${can_auto_validate} (type: ${typeof can_auto_validate})`);
    console.log(`🔄 [PERMISSIONS] Full request body:`, JSON.stringify(req.body));

    // Ensure the column exists (auto-migration)
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS can_auto_validate BOOLEAN DEFAULT FALSE`);
    } catch (alterErr) {
      console.log('ℹ️ [PERMISSIONS] Column already exists or alter failed:', alterErr.message);
    }

    const result = await pool.query(
      'UPDATE users SET can_auto_validate = $1 WHERE id = $2 RETURNING id, can_auto_validate',
      [can_auto_validate === true || can_auto_validate === 'true', id]
    );

    console.log(`🔄 [PERMISSIONS] UPDATE result:`, result.rows);

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Permissions updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('❌ [PERMISSIONS] Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete user - protect Admin from deletion
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is Admin - prevent deletion
    const userCheck = await pool.query('SELECT email FROM users WHERE id = $1', [id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    }
    if (userCheck.rows[0].email === 'redouanerrebbahi99@gmail.com') {
      return res.status(403).json({ success: false, message: 'Impossible de supprimer le compte Admin' });
    }

    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(`🗑️ [USERS] Deleted user ID ${id} (${userCheck.rows[0].email})`);
    res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error('❌ [USERS] Delete error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- AUDIT LOG ROUTES ---
app.get('/audit-log/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const result = await pool.query(
      'SELECT * FROM audit_log WHERE invoice_id = $1 ORDER BY id DESC',
      [invoiceId]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/audit-log', async (req, res) => {
  try {
    const { invoice_id, action, user_id, user_name, user_email, changes } = req.body;
    await pool.query(
      'INSERT INTO audit_log (invoice_id, action, user_id, user_name, user_email, changes, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [invoice_id, action, user_id, user_name, user_email, JSON.stringify(changes)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Duplicate attachment endpoints removed - using the first set above

// --- GLOBAL INVOICE ROUTES ---

app.get('/global-invoices/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const result = await pool.query(`
      SELECT gi.*, c.nom as client_nom, c.ice as client_ice 
      FROM global_invoices gi 
      JOIN clients c ON gi.client_id = c.id 
      WHERE gi.company_code = $1
      ORDER BY gi.id DESC
    `, [company.toUpperCase()]);

    const globalInvoices = result.rows;

    // Fetch linked bon IDs for each global invoice
    if (globalInvoices.length > 0) {
      const giIds = globalInvoices.map(gi => gi.id);
      const bonsRes = await pool.query(`
        SELECT global_invoice_id, bon_livraison_id 
        FROM global_invoice_bons 
        WHERE global_invoice_id = ANY($1::int[])
      `, [giIds]);

      const bonsMap = {};
      bonsRes.rows.forEach(b => {
        if (!bonsMap[b.global_invoice_id]) bonsMap[b.global_invoice_id] = [];
        bonsMap[b.global_invoice_id].push(b.bon_livraison_id);
      });

      globalInvoices.forEach(gi => {
        gi.bon_livraison_ids = bonsMap[gi.id] || [];
        gi.bon_count = gi.bon_livraison_ids.length;
      });
    }

    res.json({ success: true, data: globalInvoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/global-invoices/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT gi.*, c.nom as client_nom, c.ice as client_ice 
      FROM global_invoices gi 
      JOIN clients c ON gi.client_id = c.id 
      WHERE gi.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Global invoice not found' });
    }

    const gi = result.rows[0];

    // Fetch linked bon IDs
    const bonsIdsRes = await pool.query(`
      SELECT bon_livraison_id 
      FROM global_invoice_bons 
      WHERE global_invoice_id = $1
    `, [id]);
    gi.bon_livraison_ids = bonsIdsRes.rows.map(b => b.bon_livraison_id);
    gi.bon_count = gi.bon_livraison_ids.length;

    // Fetch full details of linked bons
    if (gi.bon_livraison_ids.length > 0) {
      const bonsRes = await pool.query(`
        SELECT i.*, c.nom as client_nom 
        FROM invoices i 
        JOIN clients c ON i.client_id = c.id 
        WHERE i.id = ANY($1::int[])
      `, [gi.bon_livraison_ids]);

      gi.bons = bonsRes.rows.map(pgInv => ({
        id: pgInv.id,
        document_numero: pgInv.document_numero || pgInv.document_numero_bl,
        document_numero_bl: pgInv.document_numero_bl,
        document_numero_commande: pgInv.document_numero_commande,
        document_date: pgInv.document_date,
        total_ht: pgInv.total_ht,
        total_ttc: pgInv.total_ttc,
        client_nom: pgInv.client_nom
      }));
    } else {
      gi.bons = [];
    }

    res.json({ success: true, data: gi });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/global-invoices', async (req, res) => {
  console.log('📥 [API] POST /global-invoices called');
  console.log('📦 Request Body:', JSON.stringify(req.body, null, 2));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const {
      company_code, client_id, document_numero, document_date,
      total_ht, tva_rate, montant_tva, total_ttc,
      bon_livraison_ids
    } = req.body;

    console.log('📝 Inserting global invoice...');
    const giRes = await client.query(`
      INSERT INTO global_invoices (
        company_code, client_id, document_numero, document_date, 
        total_ht, tva_rate, montant_tva, total_ttc, 
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id
    `, [
      company_code ? company_code.toUpperCase() : null, client_id, document_numero, document_date,
      total_ht, tva_rate, montant_tva, total_ttc
    ]);

    const giId = giRes.rows[0].id;
    console.log('✅ Global invoice created with ID:', giId);

    if (bon_livraison_ids && bon_livraison_ids.length > 0) {
      console.log(`🔗 Linking ${bon_livraison_ids.length} delivery notes...`);
      for (const bonId of bon_livraison_ids) {
        await client.query(`
          INSERT INTO global_invoice_bons (global_invoice_id, bon_livraison_id)
          VALUES ($1, $2)
        `, [giId, bonId]);
      }
    }

    await client.query('COMMIT');
    console.log('🎉 Transaction committed successfully');
    res.json({ success: true, data: { id: giId } });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [API ERROR] POST /global-invoices:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

app.put('/global-invoices/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id } = req.params;
    const {
      document_numero, document_date,
      total_ht, tva_rate, montant_tva, total_ttc,
      bon_livraison_ids
    } = req.body;

    await client.query(`
      UPDATE global_invoices SET 
        document_numero = COALESCE($1, document_numero),
        document_date = COALESCE($2, document_date),
        total_ht = COALESCE($3, total_ht),
        tva_rate = COALESCE($4, tva_rate),
        montant_tva = COALESCE($5, montant_tva),
        total_ttc = COALESCE($6, total_ttc),
        updated_at = NOW()
      WHERE id = $7
    `, [document_numero, document_date, total_ht, tva_rate, montant_tva, total_ttc, id]);

    if (bon_livraison_ids !== undefined) {
      await client.query('DELETE FROM global_invoice_bons WHERE global_invoice_id = $1', [id]);
      if (bon_livraison_ids && bon_livraison_ids.length > 0) {
        for (const bonId of bon_livraison_ids) {
          await client.query(`
            INSERT INTO global_invoice_bons (global_invoice_id, bon_livraison_id)
            VALUES ($1, $2)
          `, [id, bonId]);
        }
      }
    }

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

app.delete('/global-invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM global_invoice_bons WHERE global_invoice_id = $1', [id]);
    await pool.query('DELETE FROM global_invoices WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Duplicate DELETE /attachments removed - using the first one above

// --- SECONDARY COMPANIES (SKM, MSH3, BENALI, SAAISS) ROUTES ---

// Dynamic list - loaded from pdf_companies table + hardcoded defaults
let ALLOWED_SECONDARY_COMPANIES = ['skm', 'smarts', 'saaiss', 'benali', 'msh3'];

// Load all company codes from pdf_companies into ALLOWED_SECONDARY_COMPANIES
async function refreshAllowedCompanies() {
  try {
    const result = await pool.query('SELECT company_code FROM pdf_companies');
    const dbCodes = result.rows.map(r => r.company_code.toLowerCase());
    // Merge with hardcoded defaults (no duplicates)
    const merged = new Set([...ALLOWED_SECONDARY_COMPANIES, ...dbCodes]);
    ALLOWED_SECONDARY_COMPANIES = [...merged];
    console.log('✅ Allowed secondary companies refreshed:', ALLOWED_SECONDARY_COMPANIES);
  } catch (err) {
    console.error('⚠️ Could not refresh allowed companies:', err.message);
  }
}

// Create per-company tables (devis_numbers, pdf_paths, devis_data)
async function createCompanyTables(companyCode) {
  const prefix = companyCode.toLowerCase().replace(/[^a-z0-9_]/g, '');
  
  // 1. Devis Numbers Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${prefix}_devis_numbers (
      id SERIAL PRIMARY KEY,
      devis_number VARCHAR(50) NOT NULL,
      year INTEGER NOT NULL,
      used_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(devis_number, year)
    )
  `);

  // 2. PDF Paths Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${prefix}_pdf_paths (
      id SERIAL PRIMARY KEY,
      devis_number VARCHAR(50) NOT NULL,
      year INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      created_by VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(devis_number, year)
    )
  `);

  // 3. Devis Data Table (stores full devis/facture data with products)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${prefix}_devis_data (
      id SERIAL PRIMARY KEY,
      devis_number VARCHAR(50) NOT NULL,
      year INTEGER NOT NULL,
      source_invoice_id INTEGER,
      source_company VARCHAR(50),
      document_type VARCHAR(50) DEFAULT 'devis',
      client_nom VARCHAR(255),
      client_ice VARCHAR(100),
      document_date DATE,
      pourcentage_ajustement DECIMAL(10,2) DEFAULT 0,
      tva_rate DECIMAL(5,2) DEFAULT 20,
      total_ht DECIMAL(15,2) DEFAULT 0,
      montant_tva DECIMAL(15,2) DEFAULT 0,
      total_ttc DECIMAL(15,2) DEFAULT 0,
      notes TEXT,
      table_style VARCHAR(20) DEFAULT 'style1',
      created_by VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(devis_number, year)
    )
  `);

  // 4. Devis Products Table (stores products for each devis)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${prefix}_devis_products (
      id SERIAL PRIMARY KEY,
      devis_data_id INTEGER REFERENCES ${prefix}_devis_data(id) ON DELETE CASCADE,
      designation TEXT NOT NULL,
      quantite DECIMAL(10,2) DEFAULT 1,
      prix_unitaire_ht DECIMAL(15,2) DEFAULT 0,
      total_ht DECIMAL(15,2) DEFAULT 0,
      original_designation TEXT,
      original_prix_unitaire_ht DECIMAL(15,2) DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Create indexes
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_${prefix}_devis_data_year ON ${prefix}_devis_data(year, devis_number)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_${prefix}_devis_products_parent ON ${prefix}_devis_products(devis_data_id)`);

  console.log(`✅ All tables created for company: ${companyCode} (prefix: ${prefix})`);
}

function validateCompany(company) {
  const c = company.toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (ALLOWED_SECONDARY_COMPANIES.includes(c)) return c;
  throw new Error('Code société invalide: ' + company);
}

// --- DEVIS NUMBER TRACKING ---

// Get all devis numbers
app.get('/devis/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_devis_numbers`;

    // Check if table exists (basic SQL injection prevention is done via validateCompany)
    const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY year DESC, id DESC`);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get last devis number for a year
app.get('/devis/:company/last/:year', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const { year } = req.params;
    const tableName = `${companyPrefix}_devis_numbers`;

    const result = await pool.query(
      `SELECT devis_number FROM ${tableName} WHERE year = $1 ORDER BY id DESC LIMIT 1`,
      [year]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add new devis number
app.post('/devis/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_devis_numbers`;
    const { devis_number, year } = req.body;

    const result = await pool.query(
      `INSERT INTO ${tableName} (devis_number, year, used_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (devis_number, year) DO UPDATE SET used_at = NOW()
       RETURNING *`,
      [devis_number, year]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete devis number
app.delete('/devis/:company/:number/:year', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_devis_numbers`;
    const { number, year } = req.params;

    await pool.query(
      `DELETE FROM ${tableName} WHERE devis_number = $1 AND year = $2`,
      [number, year]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// --- PDF PATH MANAGEMENT ---

// Get all PDF paths
app.get('/pdf/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_pdf_paths`;

    const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get specific PDF path
app.get('/pdf/:company/:number/:year', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_pdf_paths`;
    const { number, year } = req.params;

    const result = await pool.query(
      `SELECT * FROM ${tableName} WHERE devis_number = $1 AND year = $2`,
      [number, year]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save PDF path
app.post('/pdf/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const tableName = `${companyPrefix}_pdf_paths`;
    const { devis_number, year, file_path, created_by } = req.body;

    const result = await pool.query(
      `INSERT INTO ${tableName} (devis_number, year, file_path, created_by)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (devis_number, year) 
       DO UPDATE SET file_path = EXCLUDED.file_path, created_by = EXCLUDED.created_by
       RETURNING *`,
      [devis_number, year, file_path, created_by]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/upload/:company', upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {

      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const { company } = req.params;
    const year = new Date().getFullYear().toString();

    // Construct the relative path to store in database
    // Use forward slashes for database consistency (URL style)
    // IMPORTANT: Storing relative path from server root (e.g. /uploads/skm/2025/file.pdf)
    const relativePath = `/uploads/${company}/${year}/${req.file.filename}`;

    console.log(`✅ File uploaded: ${relativePath}`);

    res.json({
      success: true,
      filePath: relativePath,
      fullPath: req.file.path
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- DEVIS DATA TRACKING (Full devis/facture data with products) ---

// GET all devis data for a company (with products)
app.get('/devis-data/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const { year } = req.query;
    
    let query = `SELECT * FROM ${companyPrefix}_devis_data`;
    const params = [];
    if (year) {
      query += ' WHERE year = $1';
      params.push(year);
    }
    query += ' ORDER BY id DESC';
    
    const result = await pool.query(query, params);
    
    // For each devis, fetch its products
    const devisWithProducts = [];
    for (const devis of result.rows) {
      const productsResult = await pool.query(
        `SELECT * FROM ${companyPrefix}_devis_products WHERE devis_data_id = $1 ORDER BY sort_order ASC`,
        [devis.id]
      );
      devisWithProducts.push({
        ...devis,
        products: productsResult.rows
      });
    }
    
    res.json({ success: true, data: devisWithProducts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single devis data by devis_number and year
app.get('/devis-data/:company/:number/:year', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const { number, year } = req.params;
    
    const result = await pool.query(
      `SELECT * FROM ${companyPrefix}_devis_data WHERE devis_number = $1 AND year = $2`,
      [number, year]
    );
    
    if (result.rows.length === 0) {
      return res.json({ success: true, data: null });
    }
    
    const devis = result.rows[0];
    const productsResult = await pool.query(
      `SELECT * FROM ${companyPrefix}_devis_products WHERE devis_data_id = $1 ORDER BY sort_order ASC`,
      [devis.id]
    );
    
    res.json({ success: true, data: { ...devis, products: productsResult.rows } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save full devis data with products
app.post('/devis-data/:company', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const {
      devis_number, year, source_invoice_id, source_company,
      document_type, client_nom, client_ice, document_date,
      pourcentage_ajustement, tva_rate, total_ht, montant_tva, total_ttc,
      notes, table_style, created_by, products
    } = req.body;
    
    // Insert devis data
    const devisResult = await pool.query(`
      INSERT INTO ${companyPrefix}_devis_data 
        (devis_number, year, source_invoice_id, source_company, document_type,
         client_nom, client_ice, document_date, pourcentage_ajustement, tva_rate,
         total_ht, montant_tva, total_ttc, notes, table_style, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (devis_number, year) DO UPDATE SET
        source_invoice_id = EXCLUDED.source_invoice_id,
        source_company = EXCLUDED.source_company,
        document_type = EXCLUDED.document_type,
        client_nom = EXCLUDED.client_nom,
        client_ice = EXCLUDED.client_ice,
        document_date = EXCLUDED.document_date,
        pourcentage_ajustement = EXCLUDED.pourcentage_ajustement,
        tva_rate = EXCLUDED.tva_rate,
        total_ht = EXCLUDED.total_ht,
        montant_tva = EXCLUDED.montant_tva,
        total_ttc = EXCLUDED.total_ttc,
        notes = EXCLUDED.notes,
        table_style = EXCLUDED.table_style,
        created_by = EXCLUDED.created_by
      RETURNING *
    `, [devis_number, year, source_invoice_id || null, source_company || null,
        document_type || 'devis', client_nom || '', client_ice || '',
        document_date || null, pourcentage_ajustement || 0, (tva_rate !== undefined && tva_rate !== null && tva_rate !== '') ? tva_rate : 20,
        total_ht || 0, montant_tva || 0, total_ttc || 0,
        notes || null, table_style || 'style1', created_by || null]);
    
    const devisId = devisResult.rows[0].id;
    
    // Delete old products and insert new ones
    await pool.query(`DELETE FROM ${companyPrefix}_devis_products WHERE devis_data_id = $1`, [devisId]);
    
    if (products && Array.isArray(products)) {
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        await pool.query(`
          INSERT INTO ${companyPrefix}_devis_products 
            (devis_data_id, designation, quantite, prix_unitaire_ht, total_ht, original_designation, original_prix_unitaire_ht, sort_order)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [devisId, p.designation || '', p.quantite || 1, p.prix_unitaire_ht || 0,
            p.total_ht || 0, p.original_designation || p.designation || '',
            p.original_prix_unitaire_ht || p.prix_unitaire_ht || 0, i]);
      }
    }
    
    res.json({ success: true, data: devisResult.rows[0] });
  } catch (err) {
    console.error('❌ Error saving devis data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE devis data
app.delete('/devis-data/:company/:id', async (req, res) => {
  try {
    const companyPrefix = validateCompany(req.params.company);
    const { id } = req.params;
    
    const result = await pool.query(
      `DELETE FROM ${companyPrefix}_devis_data WHERE id = $1 RETURNING *`,
      [id]
    );
    
    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Devis not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- COMPANY PDF SETTINGS TABLE ---
// Auto-create the company_pdf_settings table if it doesn't exist
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS company_pdf_settings (
        id SERIAL PRIMARY KEY,
        company_code VARCHAR(50) NOT NULL UNIQUE,
        percentage NUMERIC(10, 2) DEFAULT 0,
        product_names JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ company_pdf_settings table ready');
  } catch (err) {
    console.error('❌ Error creating company_pdf_settings table:', err.message);
  }
})();

// GET PDF settings for a company
app.get('/pdf-settings/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const companyCode = company.toUpperCase();
    const result = await pool.query(
      'SELECT * FROM company_pdf_settings WHERE company_code = $1',
      [companyCode]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (err) {
    console.error('❌ Error getting PDF settings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT (upsert) PDF settings for a company
app.put('/pdf-settings/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const companyCode = company.toUpperCase();
    const { percentage, product_names } = req.body;

    await pool.query(`
      INSERT INTO company_pdf_settings (company_code, percentage, product_names, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (company_code)
      DO UPDATE SET percentage = $2, product_names = $3, updated_at = NOW()
    `, [companyCode, percentage || 0, JSON.stringify(product_names || {})]);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error saving PDF settings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// --- PDF COMPANIES TABLE (Online company management) ---
// Auto-create the pdf_companies table if it doesn't exist
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pdf_companies (
        id SERIAL PRIMARY KEY,
        company_code VARCHAR(50) NOT NULL UNIQUE,
        company_name VARCHAR(255) NOT NULL,
        color VARCHAR(20) DEFAULT '#2196F3',
        enabled BOOLEAN DEFAULT true,
        header_image TEXT,
        footer_image TEXT,
        signature_image TEXT,
        header_path VARCHAR(255) DEFAULT '',
        footer_path VARCHAR(255) DEFAULT '',
        signature_path VARCHAR(255) DEFAULT '',
        db_name VARCHAR(100) DEFAULT '',
        is_builtin BOOLEAN DEFAULT false,
        table_style VARCHAR(20) DEFAULT 'style1',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Add table_style column if it doesn't exist (for existing databases)
    try {
      await pool.query(`ALTER TABLE pdf_companies ADD COLUMN IF NOT EXISTS table_style VARCHAR(20) DEFAULT 'style1'`);
    } catch (e) { /* column already exists */ }
    console.log('✅ pdf_companies table ready');

    // Refresh allowed companies from DB at startup
    await refreshAllowedCompanies();

    // Auto-create tables for all existing companies
    const allCompanies = await pool.query('SELECT company_code FROM pdf_companies');
    for (const row of allCompanies.rows) {
      try {
        await createCompanyTables(row.company_code);
      } catch (e) {
        console.warn(`⚠️ Could not ensure tables for ${row.company_code}:`, e.message);
      }
    }
  } catch (err) {
    console.error('❌ Error creating pdf_companies table:', err.message);
  }
})();

// GET all companies
app.get('/pdf-companies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pdf_companies ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('❌ Error getting PDF companies:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single company by code
app.get('/pdf-companies/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const result = await pool.query('SELECT * FROM pdf_companies WHERE company_code = $1', [code]);
    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (err) {
    console.error('❌ Error getting PDF company:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new company
app.post('/pdf-companies', async (req, res) => {
  try {
    const { company_code, company_name, color, enabled, header_image, footer_image, signature_image, header_path, footer_path, signature_path, db_name, is_builtin, table_style } = req.body;
    const code = (company_code || '').toUpperCase().replace(/[^A-Z0-9_]/g, '');
    if (!code || !company_name) {
      return res.status(400).json({ success: false, error: 'company_code and company_name are required' });
    }
    const result = await pool.query(`
      INSERT INTO pdf_companies (company_code, company_name, color, enabled, header_image, footer_image, signature_image, header_path, footer_path, signature_path, db_name, is_builtin, table_style, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *
    `, [code, company_name, color || '#2196F3', enabled !== false, header_image || null, footer_image || null, signature_image || null, header_path || '', footer_path || '', signature_path || '', db_name || '', is_builtin || false, table_style || 'style1']);

    // Auto-create per-company database tables (devis_numbers, pdf_paths, devis_data, devis_products)
    try {
      await createCompanyTables(code);
      console.log(`✅ Database tables auto-created for new company: ${code}`);
    } catch (tableErr) {
      console.error(`⚠️ Warning: Could not create tables for ${code}:`, tableErr.message);
    }

    // Refresh allowed companies list so new company is immediately usable
    await refreshAllowedCompanies();

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, error: `Le code "${req.body.company_code}" existe déjà.` });
    }
    console.error('❌ Error creating PDF company:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update company by code
app.put('/pdf-companies/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const { company_name, color, enabled, header_image, footer_image, signature_image, header_path, footer_path, signature_path, db_name, table_style } = req.body;

    // Build dynamic SET clause - only update fields that are provided
    const updates = [];
    const values = [];
    let idx = 1;

    if (company_name !== undefined) { updates.push(`company_name = $${idx++}`); values.push(company_name); }
    if (color !== undefined) { updates.push(`color = $${idx++}`); values.push(color); }
    if (enabled !== undefined) { updates.push(`enabled = $${idx++}`); values.push(enabled); }
    if (header_image !== undefined) { updates.push(`header_image = $${idx++}`); values.push(header_image); }
    if (footer_image !== undefined) { updates.push(`footer_image = $${idx++}`); values.push(footer_image); }
    if (signature_image !== undefined) { updates.push(`signature_image = $${idx++}`); values.push(signature_image); }
    if (header_path !== undefined) { updates.push(`header_path = $${idx++}`); values.push(header_path); }
    if (footer_path !== undefined) { updates.push(`footer_path = $${idx++}`); values.push(footer_path); }
    if (signature_path !== undefined) { updates.push(`signature_path = $${idx++}`); values.push(signature_path); }
    if (table_style !== undefined) { updates.push(`table_style = $${idx++}`); values.push(table_style); }
    if (db_name !== undefined) { updates.push(`db_name = $${idx++}`); values.push(db_name); }

    updates.push(`updated_at = NOW()`);
    values.push(code);

    const result = await pool.query(
      `UPDATE pdf_companies SET ${updates.join(', ')} WHERE company_code = $${idx} RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Company not found' });
    }
  } catch (err) {
    console.error('❌ Error updating PDF company:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE company by code
app.delete('/pdf-companies/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const result = await pool.query('DELETE FROM pdf_companies WHERE company_code = $1 AND is_builtin = false RETURNING *', [code]);
    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Company not found or is a built-in company' });
    }
  } catch (err) {
    console.error('❌ Error deleting PDF company:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- SECONDARY COMPANIES DEVIS & PATHS TABLES (Auto-create) ---
(async () => {
  const companies = ['benali', 'smarts', 'msh3']; // Matches IPC codes

  for (const company of companies) {
    try {
      // Devis Numbers Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${company}_devis_numbers (
          id SERIAL PRIMARY KEY,
          devis_number VARCHAR(50) NOT NULL,
          year INTEGER NOT NULL,
          used_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(devis_number, year)
        )
      `);

      // PDF Paths Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${company}_pdf_paths (
          id SERIAL PRIMARY KEY,
          devis_number VARCHAR(50) NOT NULL,
          year INTEGER NOT NULL,
          file_path TEXT NOT NULL,
          created_by VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(devis_number, year)
        )
      `);
      console.log(`✅ ${company} tables ready (devis_numbers & pdf_paths)`);
    } catch (err) {
      console.error(`❌ Error creating tables for ${company}:`, err.message);
    }
  }
})();

// DEBUG: Check pending invoices with user info
app.get('/debug/pending-invoices', async (req, res) => {
  try {
    const { company_code, user_id } = req.query;
    
    // Query 1: All pending invoices
    const allPending = await pool.query(`
      SELECT id, document_numero, document_type, validation_status, 
             created_by_user_id, created_by_user_name, created_by_user_email,
             company_code, created_at
      FROM invoices 
      WHERE validation_status = 'pending'
      ${company_code ? `AND company_code = '${company_code.toUpperCase()}'` : ''}
      ORDER BY id DESC 
      LIMIT 50
    `);

    // Query 2: Pending invoices excluding user_id
    let excludedPending = { rows: [] };
    if (user_id) {
      excludedPending = await pool.query(`
        SELECT id, document_numero, document_type, validation_status, 
               created_by_user_id, created_by_user_name, created_by_user_email,
               company_code, created_at
        FROM invoices 
        WHERE validation_status = 'pending'
        AND (created_by_user_id IS NULL OR created_by_user_id != $1)
        ${company_code ? `AND company_code = '${company_code.toUpperCase()}'` : ''}
        ORDER BY id DESC 
        LIMIT 50
      `, [parseInt(user_id)]);
    }

    // Query 3: Statistics
    const stats = await pool.query(`
      SELECT 
        created_by_user_id,
        created_by_user_name,
        company_code,
        COUNT(*) as count
      FROM invoices 
      WHERE validation_status = 'pending'
      ${company_code ? `AND company_code = '${company_code.toUpperCase()}'` : ''}
      GROUP BY created_by_user_id, created_by_user_name, company_code
      ORDER BY count DESC
    `);

    res.json({
      success: true,
      filters: { company_code, user_id },
      all_pending: {
        count: allPending.rows.length,
        invoices: allPending.rows
      },
      excluded_pending: {
        count: excludedPending.rows.length,
        invoices: excludedPending.rows
      },
      statistics: stats.rows
    });
  } catch (err) {
    console.error('❌ [DEBUG] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API Backend (API 5) running on http://localhost:${port}`);
  console.log(`🔍 Debug endpoint: http://localhost:${port}/debug/pending-invoices`);
});

