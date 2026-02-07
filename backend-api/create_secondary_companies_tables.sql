-- Create devis_numbers tables for secondary companies
-- Run this SQL in PostgreSQL

-- BEN ALI
CREATE TABLE IF NOT EXISTS benali_devis_numbers (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- SKM
CREATE TABLE IF NOT EXISTS skm_devis_numbers (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- SAAISS
CREATE TABLE IF NOT EXISTS saaiss_devis_numbers (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- MSH3
CREATE TABLE IF NOT EXISTS msh3_devis_numbers (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- Create PDF paths tables for secondary companies

-- BEN ALI
CREATE TABLE IF NOT EXISTS benali_pdf_paths (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- SKM
CREATE TABLE IF NOT EXISTS skm_pdf_paths (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- SAAISS
CREATE TABLE IF NOT EXISTS saaiss_pdf_paths (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- MSH3
CREATE TABLE IF NOT EXISTS msh3_pdf_paths (
    id SERIAL PRIMARY KEY,
    devis_number VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_by VARCHAR(255) DEFAULT 'Unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(devis_number, year)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_benali_devis_year ON benali_devis_numbers(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_skm_devis_year ON skm_devis_numbers(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_saaiss_devis_year ON saaiss_devis_numbers(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_msh3_devis_year ON msh3_devis_numbers(year, devis_number);

CREATE INDEX IF NOT EXISTS idx_benali_pdf_year ON benali_pdf_paths(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_skm_pdf_year ON skm_pdf_paths(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_saaiss_pdf_year ON saaiss_pdf_paths(year, devis_number);
CREATE INDEX IF NOT EXISTS idx_msh3_pdf_year ON msh3_pdf_paths(year, devis_number);
