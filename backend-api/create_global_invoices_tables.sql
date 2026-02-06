-- Create global_invoices table
CREATE TABLE IF NOT EXISTS global_invoices (
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

-- Create global_invoice_bons table for linking global invoices to delivery notes
CREATE TABLE IF NOT EXISTS global_invoice_bons (
    global_invoice_id INTEGER REFERENCES global_invoices(id) ON DELETE CASCADE,
    bon_livraison_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    PRIMARY KEY (global_invoice_id, bon_livraison_id)
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_gi_company_code ON global_invoices(company_code);
CREATE INDEX IF NOT EXISTS idx_gi_client_id ON global_invoices(client_id);
