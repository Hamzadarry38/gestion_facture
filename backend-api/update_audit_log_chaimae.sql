-- Create audit_log table in PostgreSQL
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

-- Create index for faster searching
CREATE INDEX IF NOT EXISTS idx_audit_log_invoice_id ON audit_log(invoice_id, created_at DESC);
