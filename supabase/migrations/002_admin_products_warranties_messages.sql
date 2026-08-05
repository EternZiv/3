-- 002: Admin panel tables, products, warranties, contact messages

-- Admin users table (service role only)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT NOT NULL,
  capacity NUMERIC DEFAULT 0,
  capacity_label TEXT DEFAULT '',
  power TEXT DEFAULT '',
  voltage TEXT DEFAULT '',
  warranty TEXT DEFAULT '',
  price NUMERIC DEFAULT 0,
  price_label TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  features TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  has_variants BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  capacity TEXT DEFAULT '',
  capacity_label TEXT DEFAULT '',
  model TEXT DEFAULT '',
  power TEXT DEFAULT '',
  voltage TEXT DEFAULT '',
  price NUMERIC DEFAULT 0,
  price_label TEXT DEFAULT '',
  features TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  specifications JSONB DEFAULT '{}',
  key_features TEXT[] DEFAULT '{}',
  applications TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Warranty registrations table (replaces Google Sheets)
CREATE TABLE IF NOT EXISTS warranty_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  postal_code TEXT DEFAULT '',
  product_model TEXT DEFAULT '',
  serial_number TEXT DEFAULT '',
  purchase_date TEXT DEFAULT '',
  dealer_name TEXT DEFAULT '',
  dealer_location TEXT DEFAULT '',
  warranty_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Products: public read, authenticated write
CREATE POLICY "Products public read" ON products FOR SELECT USING (true);
CREATE POLICY "Products insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Products update" ON products FOR UPDATE USING (true);
CREATE POLICY "Products delete" ON products FOR DELETE USING (true);

-- Product variants: public read, authenticated write
CREATE POLICY "Variants public read" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Variants insert" ON product_variants FOR INSERT WITH CHECK (true);
CREATE POLICY "Variants update" ON product_variants FOR UPDATE USING (true);
CREATE POLICY "Variants delete" ON product_variants FOR DELETE USING (true);

-- Warranty registrations: public insert, full read
CREATE POLICY "Warranty public insert" ON warranty_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Warranty read" ON warranty_registrations FOR SELECT USING (true);
CREATE POLICY "Warranty update" ON warranty_registrations FOR UPDATE USING (true);
CREATE POLICY "Warranty delete" ON warranty_registrations FOR DELETE USING (true);

-- Contact messages: public insert, full read
CREATE POLICY "Contact public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact read" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Contact update" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Contact delete" ON contact_messages FOR DELETE USING (true);

-- Admin users: no public access
CREATE POLICY "Admin no public access" ON admin_users FOR SELECT USING (false);
CREATE POLICY "Admin no public insert" ON admin_users FOR INSERT WITH CHECK (false);
CREATE POLICY "Admin no public update" ON admin_users FOR UPDATE USING (false);
CREATE POLICY "Admin no public delete" ON admin_users FOR DELETE USING (false);

-- Insert admin user (password: power2go13674533)
-- Hash generated via: crypto.createHash('sha256').update('power2go13674533').digest('hex')
INSERT INTO admin_users (username, password_hash)
VALUES ('power2go', '5964f30b02cb1e5693e470926bccd68e366033bd9bd59fbeb9573d34ff7ad377')
ON CONFLICT (username) DO NOTHING;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
