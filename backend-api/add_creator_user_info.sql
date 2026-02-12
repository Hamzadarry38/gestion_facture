-- Migration script to add user identification fields to invoices
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by_user_id INTEGER;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by_user_name TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by_user_email TEXT;

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_id INTEGER;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_name TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_by_user_email TEXT;

-- Index for performance on user lookup if needed
CREATE INDEX IF NOT EXISTS idx_invoices_created_by_user ON invoices(created_by_user_id);
