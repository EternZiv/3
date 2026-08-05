-- 004: Warranty claims table + image columns on products

-- Warranty claims table (File a Claim)
CREATE TABLE IF NOT EXISTS warranty_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  serial_number TEXT NOT NULL,
  product_model TEXT DEFAULT '',
  purchase_date TEXT DEFAULT '',
  claim_type TEXT DEFAULT '',
  issue_description TEXT NOT NULL,
  attachment_urls TEXT[] DEFAULT '{}',
  claim_status TEXT DEFAULT 'open',
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE warranty_claims ENABLE ROW LEVEL SECURITY;

-- Policies: public insert, full read/update/delete
CREATE POLICY "Claims public insert" ON warranty_claims FOR INSERT WITH CHECK (true);
CREATE POLICY "Claims read" ON warranty_claims FOR SELECT USING (true);
CREATE POLICY "Claims update" ON warranty_claims FOR UPDATE USING (true);
CREATE POLICY "Claims delete" ON warranty_claims FOR DELETE USING (true);

-- Updated_at trigger for claims
CREATE TRIGGER update_warranty_claims_updated_at
  BEFORE UPDATE ON warranty_claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add image columns to products table (base64 data URLs)
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_data TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS hover_image_data TEXT DEFAULT '';
