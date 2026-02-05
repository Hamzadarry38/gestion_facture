-- Add creation_method column to invoices table
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS creation_method VARCHAR(20) DEFAULT 'normal';

-- Update existing invoices to have 'normal' as default
UPDATE invoices SET creation_method = 'normal' WHERE creation_method IS NULL;
