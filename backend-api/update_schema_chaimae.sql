-- Migration script to add Chaimae specific fields
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS delivered_by TEXT;

-- Create delivery_persons table for persistent list
CREATE TABLE IF NOT EXISTS delivery_persons (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(name, company_code)
);

-- Index for performance on delivery persons lookup
CREATE INDEX IF NOT EXISTS idx_invoices_delivered_by ON invoices(company_code, delivered_by);
