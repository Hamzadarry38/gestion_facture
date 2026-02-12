-- 1. Rename attachments table to invoice_attachments
ALTER TABLE IF EXISTS attachments RENAME TO invoice_attachments;

-- 2. Add missing columns to invoices table
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS ar_status VARCHAR(50) DEFAULT 'sans_accuse';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS creation_method VARCHAR(50) DEFAULT 'normal';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS delivered_by VARCHAR(255);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS attachment_count INTEGER DEFAULT 0;

-- 3. Add missing user tracking columns
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_id INTEGER;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_name VARCHAR(255);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_email VARCHAR(255);

-- 4. Create missing tables if they don't exist
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    user_id INTEGER,
    user_name TEXT,
    user_email TEXT,
    changes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_persons (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(name, company_code)
);

-- 5. Updates and Indexes
UPDATE invoices SET ar_status = 'sans_accuse' WHERE ar_status IS NULL;
UPDATE invoices SET creation_method = 'normal' WHERE creation_method IS NULL;
UPDATE invoices SET attachment_count = 0 WHERE attachment_count IS NULL;

CREATE INDEX IF NOT EXISTS idx_invoices_delivered_by ON invoices(company_code, delivered_by);
CREATE INDEX IF NOT EXISTS idx_audit_log_invoice_id ON audit_log(invoice_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_created_by_user ON invoices(created_by_user_id);
