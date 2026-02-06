-- Database: facture_db
-- Consolidated Schema 2026-02-06
-- Includes all tables, constraints, and new global invoice features.

-----------------------------------------------------------
-- ⚠️ تنبيه هام: الكود التالي سيقوم بمسح الجداول القديمة تماماً
-- استخدم هذا الخيار فقط إذا كنت تريد تثبيت النظام من الصفر في حاسوب جديد
-----------------------------------------------------------

BEGIN;

DROP TABLE IF EXISTS global_invoice_bons CASCADE;
DROP TABLE IF EXISTS global_invoices CASCADE;
DROP TABLE IF EXISTS invoice_products CASCADE;
DROP TABLE IF EXISTS invoice_attachments CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS delivery_persons CASCADE;
DROP TABLE IF EXISTS saaiss_devis_numbers, smarts_devis_numbers, msh3_devis_numbers, benali_devis_numbers, skm_devis_numbers CASCADE;
DROP TABLE IF EXISTS saaiss_pdf_files, smarts_pdf_files, msh3_pdf_files, benali_pdf_files, skm_pdf_files CASCADE;

-- 1. Users Table (Shared & Admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    can_auto_validate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Clients Table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ice VARCHAR(255),
    company_code VARCHAR(50) NOT NULL, -- 'MRY', 'CHAIMAE', 'MULTI', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Invoices Table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    company_code VARCHAR(50) NOT NULL, -- Originating DB
    client_id INTEGER REFERENCES clients(id),
    
    document_type VARCHAR(50) NOT NULL, -- 'facture', 'devis', 'bon_livraison', 'avoir'
    document_date DATE,
    
    document_numero VARCHAR(50),
    document_numero_order VARCHAR(50),
    document_numero_bl VARCHAR(50),
    document_numero_devis VARCHAR(50),
    document_order_devis VARCHAR(50),
    document_bon_de_livraison VARCHAR(50),
    document_numero_commande VARCHAR(50),
    
    year INTEGER,
    sequential_id INTEGER,
    
    total_ht DECIMAL(15, 3),
    tva_rate DECIMAL(5, 2),
    montant_tva DECIMAL(15, 3),
    total_ttc DECIMAL(15, 3),
    
    validation_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'validated'
    
    -- Chaimae & Validation specific fields
    ar_status VARCHAR(50) DEFAULT 'sans_accuse',
    creation_method VARCHAR(50) DEFAULT 'normal',
    created_by VARCHAR(255),
    delivered_by VARCHAR(255),
    attachment_count INTEGER DEFAULT 0,

    -- User Identification fields
    created_by_user_id INTEGER,
    created_by_user_name VARCHAR(255),
    created_by_user_email VARCHAR(255),
    updated_by_user_id INTEGER,
    updated_by_user_name VARCHAR(255),
    updated_by_user_email VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Invoice Products Table
CREATE TABLE invoice_products (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    designation TEXT NOT NULL,
    quantite DECIMAL(15, 3),
    prix_unitaire_ht DECIMAL(15, 3),
    total_ht DECIMAL(15, 3)
);

-- 5. Invoice Attachments Table
CREATE TABLE invoice_attachments (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    file_data BYTEA,
    file_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Audit Log Table
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    user_id INTEGER,
    user_name TEXT,
    user_email TEXT,
    changes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Delivery Persons Table
CREATE TABLE delivery_persons (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(name, company_code)
);

-- 8. Global Invoices Feature
CREATE TABLE global_invoices (
    id SERIAL PRIMARY KEY,
    company_code VARCHAR(50) NOT NULL,
    client_id INTEGER REFERENCES clients(id),
    document_numero VARCHAR(50),
    document_date DATE,
    total_ht DECIMAL(15, 3),
    tva_rate DECIMAL(5, 2),
    montant_tva DECIMAL(15, 3),
    total_ttc DECIMAL(15, 3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Joining table for linking global invoices to delivery notes
CREATE TABLE global_invoice_bons (
    global_invoice_id INTEGER REFERENCES global_invoices(id) ON DELETE CASCADE,
    bon_livraison_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    PRIMARY KEY (global_invoice_id, bon_livraison_id)
);

-- 9. Devis Number Tracking (for Secondary Companies)
CREATE TABLE saaiss_devis_numbers (devis_number VARCHAR(50), year INTEGER, company_code VARCHAR(50), created_at TIMESTAMP, used_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE smarts_devis_numbers (devis_number VARCHAR(50), year INTEGER, company_code VARCHAR(50), created_at TIMESTAMP, used_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE msh3_devis_numbers (devis_number VARCHAR(50), year INTEGER, company_code VARCHAR(50), created_at TIMESTAMP, used_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE benali_devis_numbers (devis_number VARCHAR(50), year INTEGER, company_code VARCHAR(50), created_at TIMESTAMP, used_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE skm_devis_numbers (devis_number VARCHAR(50), year INTEGER, company_code VARCHAR(50), created_at TIMESTAMP, used_at TIMESTAMP, PRIMARY KEY (devis_number, year));

-- 10. PDF Files Tracking (for Secondary Companies)
CREATE TABLE saaiss_pdf_files (devis_number VARCHAR(50), year INTEGER, file_path TEXT, created_by VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE smarts_pdf_files (devis_number VARCHAR(50), year INTEGER, file_path TEXT, created_by VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE msh3_pdf_files (devis_number VARCHAR(50), year INTEGER, file_path TEXT, created_by VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE benali_pdf_files (devis_number VARCHAR(50), year INTEGER, file_path TEXT, created_by VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY (devis_number, year));
CREATE TABLE skm_pdf_files (devis_number VARCHAR(50), year INTEGER, file_path TEXT, created_by VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY (devis_number, year));

-- Indexes
CREATE INDEX idx_invoices_delivered_by ON invoices(company_code, delivered_by);
CREATE INDEX idx_audit_log_invoice_id ON audit_log(invoice_id, created_at DESC);
CREATE INDEX idx_invoices_created_by_user ON invoices(created_by_user_id);
CREATE INDEX idx_gi_company_code ON global_invoices(company_code);
CREATE INDEX idx_gi_client_id ON global_invoices(client_id);

COMMIT;
