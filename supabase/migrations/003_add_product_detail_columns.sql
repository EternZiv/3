-- 003: Add full product detail columns to products table

-- General info
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS hover_image_url TEXT DEFAULT '';

-- Overview tab
ALTER TABLE products ADD COLUMN IF NOT EXISTS what_included TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS warranty_support TEXT[] DEFAULT '{}';

-- Technical specifications (JSONB key-value pairs)
ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';

-- Features & Applications tab
ALTER TABLE products ADD COLUMN IF NOT EXISTS detailed_key_features TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS applications TEXT[] DEFAULT '{}';
