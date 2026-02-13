-- Migration: Change quantite column from DECIMAL to TEXT
-- This allows storing values like "F", "50 kg", "40 mg" etc.
ALTER TABLE invoice_products ALTER COLUMN quantite TYPE TEXT USING quantite::TEXT;
