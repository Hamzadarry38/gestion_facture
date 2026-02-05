-- Database: facture_db

-- 1. Users Table (Shared & Admin)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    can_auto_validate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ice VARCHAR(255),
    company_code VARCHAR(50) NOT NULL, -- 'MRY', 'CHAIMAE', 'MULTI', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
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
    
    validation_status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'validated'
    
    created_by VARCHAR(255),
    created_by_user_id INTEGER,
    created_by_user_name VARCHAR(255),
    created_by_user_email VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Invoice Products Table
CREATE TABLE IF NOT EXISTS invoice_products (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    designation TEXT NOT NULL,
    quantite DECIMAL(15, 3),
    prix_unitaire_ht DECIMAL(15, 3),
    total_ht DECIMAL(15, 3)
);

-- 5. Attachments Table
CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    file_data BYTEA, -- Optional if storing constraints allow
    file_path TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Devis Number Tracking (for Secondary Companies)
-- Used for SAAISS, SMARTS, MSH3, BENALI, SKM
CREATE TABLE IF NOT EXISTS saaiss_devis_numbers (
    devis_number VARCHAR(50),
    year INTEGER,
    company_code VARCHAR(50), 
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS smarts_devis_numbers (
    devis_number VARCHAR(50),
    year INTEGER,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS msh3_devis_numbers (
    devis_number VARCHAR(50),
    year INTEGER,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS benali_devis_numbers (
    devis_number VARCHAR(50),
    year INTEGER,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS skm_devis_numbers (
    devis_number VARCHAR(50),
    year INTEGER,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

-- 7. PDF Files Tracking (for Secondary Companies)
CREATE TABLE IF NOT EXISTS saaiss_pdf_files (
    devis_number VARCHAR(50),
    year INTEGER,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS smarts_pdf_files (
    devis_number VARCHAR(50),
    year INTEGER,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS msh3_pdf_files (
    devis_number VARCHAR(50),
    year INTEGER,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS benali_pdf_files (
    devis_number VARCHAR(50),
    year INTEGER,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE IF NOT EXISTS skm_pdf_files (
    devis_number VARCHAR(50),
    year INTEGER,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);
