-- Schema exported at 2026-02-12T13:34:00.445Z
-- Database: facture_db
-- This file contains ONLY table structures (no data)
-- Fixed Table Order to satisfy Foreign Key constraints

BEGIN;

-- Drop all existing tables (Order: Child tables first)
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS invoice_attachments CASCADE;
DROP TABLE IF EXISTS invoice_products CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS benali_devis_numbers CASCADE;
DROP TABLE IF EXISTS benali_pdf_files CASCADE;
DROP TABLE IF EXISTS benali_pdf_paths CASCADE;
DROP TABLE IF EXISTS company_pdf_settings CASCADE;
DROP TABLE IF EXISTS delivery_persons CASCADE;
DROP TABLE IF EXISTS msh3_devis_numbers CASCADE;
DROP TABLE IF EXISTS msh3_pdf_files CASCADE;
DROP TABLE IF EXISTS msh3_pdf_paths CASCADE;
DROP TABLE IF EXISTS saaiss_devis_numbers CASCADE;
DROP TABLE IF EXISTS saaiss_pdf_files CASCADE;
DROP TABLE IF EXISTS saaiss_pdf_paths CASCADE;
DROP TABLE IF EXISTS skm_devis_numbers CASCADE;
DROP TABLE IF EXISTS skm_pdf_files CASCADE;
DROP TABLE IF EXISTS skm_pdf_paths CASCADE;
DROP TABLE IF EXISTS smarts_devis_numbers CASCADE;
DROP TABLE IF EXISTS smarts_pdf_files CASCADE;
DROP TABLE IF EXISTS smarts_pdf_paths CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Table: users (Independent)
CREATE TABLE users (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    can_auto_validate BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(email)
);

-- 2. Table: clients (Independent)
CREATE TABLE clients (
    id SERIAL,
    nom VARCHAR(255) NOT NULL,
    ice VARCHAR(255),
    company_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- 3. Table: invoices (Depends on clients)
CREATE TABLE invoices (
    id SERIAL,
    company_code VARCHAR(50) NOT NULL,
    client_id INTEGER,
    document_type VARCHAR(50) NOT NULL,
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
    validation_status VARCHAR(50) DEFAULT 'draft'::character varying,
    created_by VARCHAR(255),
    created_by_user_id INTEGER,
    created_by_user_name VARCHAR(255),
    created_by_user_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ar_status VARCHAR(50) DEFAULT 'sans_accuse'::character varying,
    creation_method VARCHAR(50) DEFAULT 'normal'::character varying,
    delivered_by VARCHAR(255),
    attachment_count INTEGER DEFAULT 0,
    updated_by_user_id INTEGER,
    updated_by_user_name VARCHAR(255),
    updated_by_user_email VARCHAR(255),
    is_modified BOOLEAN DEFAULT false,
    is_converted BOOLEAN DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- 4. Table: audit_log (Depends on invoices)
CREATE TABLE audit_log (
    id SERIAL,
    invoice_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    user_id INTEGER,
    user_name TEXT,
    user_email TEXT,
    changes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- 5. Table: invoice_attachments (Depends on invoices)
CREATE TABLE invoice_attachments (
    id SERIAL,
    invoice_id INTEGER,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    file_data BYTEA,
    file_path TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- 6. Table: invoice_products (Depends on invoices)
CREATE TABLE invoice_products (
    id SERIAL,
    invoice_id INTEGER,
    designation TEXT NOT NULL,
    quantite DECIMAL(15, 3),
    prix_unitaire_ht DECIMAL(15, 3),
    total_ht DECIMAL(15, 3),
    PRIMARY KEY (id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- 7. Secondary / Independent Tables
CREATE TABLE benali_devis_numbers (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    used_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE benali_pdf_files (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE benali_pdf_paths (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE company_pdf_settings (
    id SERIAL,
    company_code VARCHAR(50) NOT NULL,
    percentage DECIMAL(10, 2) DEFAULT 0,
    product_names JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(company_code)
);

CREATE TABLE delivery_persons (
    id SERIAL,
    name TEXT NOT NULL,
    company_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(name, company_code)
);

CREATE TABLE msh3_devis_numbers (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    used_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE msh3_pdf_files (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE msh3_pdf_paths (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE saaiss_devis_numbers (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE saaiss_pdf_files (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE saaiss_pdf_paths (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown'::character varying,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE skm_devis_numbers (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    company_code VARCHAR(50),
    created_at TIMESTAMP,
    used_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE skm_pdf_files (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE skm_pdf_paths (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown'::character varying,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE smarts_devis_numbers (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    used_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

CREATE TABLE smarts_pdf_files (
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    PRIMARY KEY (devis_number, year)
);

CREATE TABLE smarts_pdf_paths (
    id SERIAL,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(devis_number, year)
);

-- Indexes
CREATE INDEX idx_invoices_created_by_user ON public.invoices USING btree (created_by_user_id);
CREATE INDEX idx_invoices_delivered_by ON public.invoices USING btree (company_code, delivered_by);
CREATE INDEX idx_audit_log_invoice_id ON public.audit_log USING btree (invoice_id, created_at DESC);
CREATE INDEX idx_skm_devis_year ON public.skm_devis_numbers USING btree (year, devis_number);
CREATE INDEX idx_skm_pdf_year ON public.skm_pdf_paths USING btree (year, devis_number);
CREATE INDEX idx_saaiss_devis_year ON public.saaiss_devis_numbers USING btree (year, devis_number);
CREATE INDEX idx_saaiss_pdf_year ON public.saaiss_pdf_paths USING btree (year, devis_number);

COMMIT;
