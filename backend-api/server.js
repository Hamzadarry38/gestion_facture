const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 8001;

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

// Helper: Hash password (matching the original app's crypto logic)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// --- SYSTEM ROUTES ---
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now, message: 'Connected to Postgres (API 5)!' });
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

    res.json({
      success: true,
      data: flattenedMissing,
      byPrefix: missingByPrefix,
      stats: {
        totalMissing: totalMissing,
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

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

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
    const { company_code } = req.query;
    console.log(`🔍 [API DEBUG] GET /invoices/pending called for company: ${company_code || 'ALL'}`);

    let query = `
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      LEFT JOIN clients c ON i.client_id = c.id 
      WHERE i.validation_status = 'pending'
    `;
    const params = [];

    if (company_code) {
      query += ` AND i.company_code = $1`;
      params.push(company_code.toUpperCase());
    }

    query += ` ORDER BY i.created_at DESC`;

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
    // Fetch invoices with client info
    const invoicesRes = await pool.query(`
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      LEFT JOIN clients c ON i.client_id = c.id 
      WHERE i.company_code = $1
      ORDER BY i.created_at DESC
    `, [company.toUpperCase()]);

    const invoices = invoicesRes.rows;

    // Fetch products for these invoices
    // Optimization: In a real app we might join or batch fetch. For now, let's keep it simple or do a loop.
    // To match legacy structure, we usually embed products.
    // Let's do a second query for products.
    if (invoices.length > 0) {
      const invoiceIds = invoices.map(inv => inv.id);
      const productsRes = await pool.query(`SELECT * FROM invoice_products WHERE invoice_id = ANY($1::int[])`, [invoiceIds]);

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

    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/invoices/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[SERVER] GET /invoices/id/${id} - Searching for invoice...`);

    const invoiceRes = await pool.query(`
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      LEFT JOIN clients c ON i.client_id = c.id 
      WHERE i.id = $1
    `, [id]);

    if (invoiceRes.rows.length === 0) {
      console.warn(`[SERVER] GET /invoices/id/${id} - NOT FOUND in database`);
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const invoice = invoiceRes.rows[0];
    console.log(`[SERVER] GET /invoices/id/${id} - Found: ${invoice.document_type} ${invoice.document_numero || invoice.document_numero_devis}`);

    const productsRes = await pool.query('SELECT * FROM invoice_products WHERE invoice_id = $1', [id]);
    invoice.products = productsRes.rows;

    // Fetch attachments
    const attachmentsRes = await pool.query('SELECT *, created_at as uploaded_at FROM invoice_attachments WHERE invoice_id = $1 ORDER BY created_at DESC', [id]);
    invoice.attachments = attachmentsRes.rows;
    invoice.attachment_count = attachmentsRes.rows.length;

    res.json({ success: true, data: invoice });
  } catch (err) {
    console.error(`[SERVER] GET /invoices/id/${req.params.id} - ERROR:`, err.message);
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

      const ar_status_val = doc.ar_status || req.body.ar_status || 'sans_accuse';
      req.body.ar_status_resolved = ar_status_val;
    }

    if (req.body.totals) {
      const t = req.body.totals;
      total_ht = t.total_ht || total_ht;
      tva_rate = t.tva_rate || tva_rate;
      montant_tva = t.montant_tva || montant_tva;
      total_ttc = t.total_ttc || total_ttc;
    }

    // Resolve client_id if missing but client details provided
    if (!client_id && req.body.client) {
      const c = req.body.client;
      // Use company_code to find/create client in correct context
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

    // Fallback for year if not provided
    if (!year && document_date) {
      year = new Date(document_date).getFullYear();
    }

    // Check for auto-validation permission AND resolve user name
    let validation_status = 'pending';
    let resolvedUserId = req.body.created_by_user_id || null;
    let resolvedUserName = req.body.created_by_user_name || null;
    let resolvedUserEmail = req.body.created_by_user_email || null;

    // Use email/id to resolve user and check permissions
    const checkEmail = resolvedUserEmail || (created_by && created_by.includes('@') ? created_by : null);

    if (checkEmail) {
      const userRes = await client.query('SELECT id, name, email, can_auto_validate FROM users WHERE email = $1', [checkEmail]);
      if (userRes.rows.length > 0) {
        const u = userRes.rows[0];
        resolvedUserId = resolvedUserId || u.id;
        resolvedUserName = resolvedUserName || u.name;
        resolvedUserEmail = resolvedUserEmail || u.email;
        if (u.can_auto_validate) validation_status = 'validated';
      }
    } else if (resolvedUserId) {
      // Fallback: lookup by ID
      const userRes = await client.query('SELECT id, name, email, can_auto_validate FROM users WHERE id = $1', [resolvedUserId]);
      if (userRes.rows.length > 0) {
        const u = userRes.rows[0];
        resolvedUserId = u.id;
        resolvedUserName = resolvedUserName || u.name;
        resolvedUserEmail = resolvedUserEmail || u.email;
        if (u.can_auto_validate) validation_status = 'validated';
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
        created_by_user_id, created_by_user_name, created_by_user_email,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, NOW(), NOW())
      RETURNING id
    `;

    const invoiceValues = [
      company_code, client_id, document_type, document_date,
      document_numero, document_numero_order, document_numero_bl,
      document_numero_devis, document_order_devis, document_bon_de_livraison,
      document_numero_commande, year, sequential_id || 0,
      total_ht || 0, tva_rate || 20, montant_tva || 0, total_ttc || 0,
      creation_method || 'normal', created_by || null, delivered_by || null,
      req.body.ar_status_resolved || 'sans_accuse',
      validation_status,
      resolvedUserId,
      resolvedUserName,
      resolvedUserEmail
    ];

    const resInvoice = await client.query(insertInvoiceText, invoiceValues);
    const invoiceId = resInvoice.rows[0].id;

    if (products && products.length > 0) {
      const insertProductText = `
        INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht)
        VALUES ($1, $2, $3, $4, $5)
      `;
      for (const p of products) {
        await client.query(insertProductText, [invoiceId, p.designation, p.quantite, p.prix_unitaire_ht, p.total_ht]);
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
      products
    } = req.body;

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
      if (doc.validation_status !== undefined) validation_status = doc.validation_status;

      // User identification
      if (doc.created_by_user_id !== undefined) created_by_user_id = doc.created_by_user_id;
      if (doc.created_by_user_name !== undefined) created_by_user_name = doc.created_by_user_name;
      if (doc.created_by_user_email !== undefined) created_by_user_email = doc.created_by_user_email;
      if (doc.updated_by_user_id !== undefined) updated_by_user_id = doc.updated_by_user_id;
      if (doc.updated_by_user_name !== undefined) updated_by_user_name = doc.updated_by_user_name;
      if (doc.updated_by_user_email !== undefined) updated_by_user_email = doc.updated_by_user_email;
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
      year = new Date(document_date).getFullYear();
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
                document_numero_order = COALESCE($11, document_numero_order),
                document_numero_bl = COALESCE($12, document_numero_bl),
                document_numero_devis = COALESCE($13, document_numero_devis),
                document_bon_de_livraison = COALESCE($14, document_bon_de_livraison),
                document_numero_commande = COALESCE($15, document_numero_commande),
                ar_status = COALESCE($16, ar_status),
                validation_status = COALESCE($17, validation_status),
                updated_by_user_id = COALESCE($18, updated_by_user_id),
                updated_by_user_name = COALESCE($19, updated_by_user_name),
                updated_by_user_email = COALESCE($20, updated_by_user_email),
                updated_at = NOW()
            WHERE id = $21
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
      val(document_numero_order),
      val(document_numero_bl),
      val(document_numero_devis),
      val(document_bon_de_livraison),
      val(document_numero_commande),
      val(ar_status),
      val(validation_status),
      val(updated_by_user_id),
      val(updated_by_user_name),
      val(updated_by_user_email),
      id
    ]);

    // Replace products
    await client.query('DELETE FROM invoice_products WHERE invoice_id = $1', [id]);

    if (products && products.length > 0) {
      const insertProductText = `
                INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht)
                VALUES ($1, $2, $3, $4, $5)
            `;
      for (const p of products) {
        await client.query(insertProductText, [id, p.designation, p.quantite, p.prix_unitaire_ht, p.total_ht]);
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

// --- ATTACHMENT ROUTES ---
app.get('/attachments/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT *, created_at as uploaded_at FROM invoice_attachments WHERE id = $1', [id]);
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
    const result = await pool.query('SELECT id, filename, file_type, file_size, created_at as uploaded_at, file_data FROM invoice_attachments WHERE invoice_id = $1 ORDER BY created_at DESC', [invoiceId]);
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

// --- Deleted Redundant Attachment Route ---

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

// Devis Numbers
app.get('/devis/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const table = `${company.toLowerCase()}_devis_numbers`;
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY year DESC, created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/devis/:company/last/:year', async (req, res) => {
  try {
    const { company, year } = req.params;
    const table = `${company.toLowerCase()}_devis_numbers`;
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE year = $1 ORDER BY used_at DESC, created_at DESC LIMIT 1`,
      [year]
    );
    res.json({ success: true, data: result.rows[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/devis/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const { devis_number, year } = req.body;
    const table = `${company.toLowerCase()}_devis_numbers`;
    await pool.query(
      `INSERT INTO ${table} (devis_number, year, used_at) VALUES ($1, $2, NOW()) ON CONFLICT (devis_number, year) DO NOTHING`,
      [devis_number, year]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/devis/:company/:number/:year', async (req, res) => {
  try {
    const { company, number, year } = req.params;
    const table = `${company.toLowerCase()}_devis_numbers`;
    await pool.query(`DELETE FROM ${table} WHERE devis_number = $1 AND year = $2`, [number, year]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PDF Paths
app.get('/pdf/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const table = `${company.toLowerCase()}_pdf_files`;
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY year DESC, created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/pdf/:company/:number/:year', async (req, res) => {
  try {
    const { company, number, year } = req.params;
    const table = `${company.toLowerCase()}_pdf_files`;
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE devis_number = $1 AND year = $2`,
      [number, year]
    );
    res.json({ success: true, data: result.rows[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/pdf/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const { devis_number, year, file_path, created_by } = req.body;
    const table = `${company.toLowerCase()}_pdf_files`;
    await pool.query(
      `INSERT INTO ${table} (devis_number, year, file_path, created_by) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (devis_number, year) DO UPDATE SET file_path = EXCLUDED.file_path, created_by = EXCLUDED.created_by`,
      [devis_number, year, file_path, created_by]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

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

// Validate or Reject an invoice
app.put('/invoices/:id/validation', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'validated' or 'rejected'

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

    const result = await pool.query(
      'UPDATE invoices SET validation_status = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
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
    const result = await pool.query('SELECT id, name, email, can_auto_validate FROM users ORDER BY name ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update user permissions
app.put('/users/:id/permissions', async (req, res) => {
  try {
    const { id } = req.params;
    const { can_auto_validate } = req.body;

    const result = await pool.query(
      'UPDATE users SET can_auto_validate = $1 WHERE id = $2 RETURNING id',
      [can_auto_validate, id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Permissions updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- AUDIT LOG ROUTES ---
app.get('/audit-log/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const result = await pool.query(
      'SELECT * FROM audit_log WHERE invoice_id = $1 ORDER BY created_at DESC',
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

// --- ATTACHMENT ROUTES ---
// Get attachments for an invoice
app.get('/attachments/invoice/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const result = await pool.query(
      'SELECT *, created_at as uploaded_at FROM invoice_attachments WHERE invoice_id = $1 ORDER BY created_at DESC',
      [invoiceId]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single attachment by ID
app.get('/attachments/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT *, created_at as uploaded_at FROM invoice_attachments WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Attachment not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add attachment
app.post('/attachments', async (req, res) => {
  console.log('🔵 [API] POST /attachments called');
  const client = await pool.connect();
  try {
    const { invoice_id, filename, file_type, file_size, file_path, file_data } = req.body;

    console.log(`📝 [API] Attempting to add attachment: ${filename} for invoice: ${invoice_id}`);

    await client.query('BEGIN');

    // Convert base64 to buffer if provided
    let dataBuffer = null;
    if (file_data) {
      dataBuffer = Buffer.from(file_data, 'base64');
      console.log(`📊 [API] Converted file_data to buffer (${dataBuffer.length} bytes)`);
    }

    const result = await client.query(
      `INSERT INTO invoice_attachments (invoice_id, filename, file_type, file_size, file_path, file_data, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id`,
      [invoice_id, filename, file_type, file_size, file_path, dataBuffer]
    );

    const attachmentId = result.rows[0].id;
    console.log(`✅ [API] Inserted attachment record ID: ${attachmentId}`);

    // Update attachment_count in invoices
    await client.query(
      'UPDATE invoices SET attachment_count = (SELECT COUNT(*) FROM invoice_attachments WHERE invoice_id = $1) WHERE id = $1',
      [invoice_id]
    );

    await client.query('COMMIT');
    console.log(`✨ [API] Transaction committed successfully for invoice ${invoice_id}`);
    res.json({ success: true, data: { id: attachmentId } });
  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ [API] Transaction ERROR:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

// Delete attachment
app.delete('/attachments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM invoice_attachments WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API Backend (API 5) running on http://localhost:${port}`);
});
