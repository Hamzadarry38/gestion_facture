-- Add ar_status column to invoices table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='invoices' AND column_name='ar_status') THEN
        ALTER TABLE invoices ADD COLUMN ar_status TEXT DEFAULT 'sans_accuse';
    END IF;
END $$;

-- Update existing records to have 'sans_accuse' if they are null
UPDATE invoices SET ar_status = 'sans_accuse' WHERE ar_status IS NULL;
