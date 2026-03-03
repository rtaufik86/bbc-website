-- Add knowledge_base_text column to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS knowledge_base_text TEXT;

-- Verify it exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'knowledge_base_text';
