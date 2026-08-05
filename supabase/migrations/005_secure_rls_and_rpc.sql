-- 005: Secure RLS policies and introduce security definer RPC wrappers for admin operations

-- Dynamically drop all existing policies on key tables to ensure a clean slate
DO $$
DECLARE
    pol RECORD;
    t_name TEXT;
    tables_list TEXT[] := ARRAY['products', 'product_variants', 'warranty_registrations', 'contact_messages', 'warranty_claims'];
BEGIN
    FOREACH t_name IN ARRAY tables_list LOOP
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' AND tablename = t_name
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, t_name);
        END LOOP;
    END LOOP;
END $$;

-- Create secure policies (block anonymous SELECT/UPDATE/DELETE on personal tables)
CREATE POLICY "Products public read" ON products FOR SELECT USING (true);
CREATE POLICY "Products admin insert" ON products FOR INSERT WITH CHECK (false);
CREATE POLICY "Products admin update" ON products FOR UPDATE USING (false);
CREATE POLICY "Products admin delete" ON products FOR DELETE USING (false);

CREATE POLICY "Variants public read" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Variants admin insert" ON product_variants FOR INSERT WITH CHECK (false);
CREATE POLICY "Variants admin update" ON product_variants FOR UPDATE USING (false);
CREATE POLICY "Variants admin delete" ON product_variants FOR DELETE USING (false);

CREATE POLICY "Warranty public insert" ON warranty_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Warranty admin select" ON warranty_registrations FOR SELECT USING (false);
CREATE POLICY "Warranty admin update" ON warranty_registrations FOR UPDATE USING (false);
CREATE POLICY "Warranty admin delete" ON warranty_registrations FOR DELETE USING (false);

CREATE POLICY "Contact public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact admin select" ON contact_messages FOR SELECT USING (false);
CREATE POLICY "Contact admin update" ON contact_messages FOR UPDATE USING (false);
CREATE POLICY "Contact admin delete" ON contact_messages FOR DELETE USING (false);

CREATE POLICY "Claims public insert" ON warranty_claims FOR INSERT WITH CHECK (true);
CREATE POLICY "Claims admin select" ON warranty_claims FOR SELECT USING (false);
CREATE POLICY "Claims admin update" ON warranty_claims FOR UPDATE USING (false);
CREATE POLICY "Claims admin delete" ON warranty_claims FOR DELETE USING (false);

-- Define database security helper for admin credentials
CREATE OR REPLACE FUNCTION verify_admin_credentials(p_username TEXT, p_password_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE username = p_username AND password_hash = p_password_hash
  );
END;
$$;

-- Secure public lookup function (prevents public scraping of warranty registrations table)
CREATE OR REPLACE FUNCTION public_lookup_warranty_by_serial(p_serial_number TEXT)
RETURNS SETOF warranty_registrations
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM warranty_registrations
  WHERE serial_number = p_serial_number
  LIMIT 1;
END;
$$;

-- Secure admin product functions
CREATE OR REPLACE FUNCTION admin_fetch_products(p_username TEXT, p_password_hash TEXT)
RETURNS SETOF products
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY SELECT * FROM products ORDER BY sort_order ASC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_create_product(p_username TEXT, p_password_hash TEXT, p_product JSONB)
RETURNS products
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_prod products;
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  INSERT INTO products (
    product_id, name, model, category, capacity, capacity_label, power, voltage, warranty,
    price, price_label, badge, features, image_url, has_variants, is_active, sort_order,
    description, hover_image_url, what_included, warranty_support, specifications,
    detailed_key_features, applications, image_data, hover_image_data
  )
  VALUES (
    (p_product->>'product_id')::INTEGER,
    p_product->>'name',
    p_product->>'model',
    p_product->>'category',
    (p_product->>'capacity')::NUMERIC,
    p_product->>'capacity_label',
    p_product->>'power',
    p_product->>'voltage',
    p_product->>'warranty',
    (p_product->>'price')::NUMERIC,
    p_product->>'price_label',
    p_product->>'badge',
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_product->'features', '[]'::jsonb))),
    p_product->>'image_url',
    COALESCE((p_product->>'has_variants')::BOOLEAN, false),
    COALESCE((p_product->>'is_active')::BOOLEAN, true),
    COALESCE((p_product->>'sort_order')::INTEGER, 0),
    p_product->>'description',
    p_product->>'hover_image_url',
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_product->'what_included', '[]'::jsonb))),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_product->'warranty_support', '[]'::jsonb))),
    COALESCE(p_product->'specifications', '{}'::jsonb),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_product->'detailed_key_features', '[]'::jsonb))),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_product->'applications', '[]'::jsonb))),
    p_product->>'image_data',
    p_product->>'hover_image_data'
  )
  RETURNING * INTO v_prod;
  
  RETURN v_prod;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_product(p_username TEXT, p_password_hash TEXT, p_id UUID, p_updates JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  UPDATE products
  SET
    name = COALESCE(p_updates->>'name', name),
    model = COALESCE(p_updates->>'model', model),
    category = COALESCE(p_updates->>'category', category),
    capacity = COALESCE((p_updates->>'capacity')::NUMERIC, capacity),
    capacity_label = COALESCE(p_updates->>'capacity_label', capacity_label),
    power = COALESCE(p_updates->>'power', power),
    voltage = COALESCE(p_updates->>'voltage', voltage),
    warranty = COALESCE(p_updates->>'warranty', warranty),
    price = COALESCE((p_updates->>'price')::NUMERIC, price),
    price_label = COALESCE(p_updates->>'price_label', price_label),
    badge = COALESCE(p_updates->>'badge', badge),
    features = CASE WHEN p_updates ? 'features' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'features')) ELSE features END,
    image_url = COALESCE(p_updates->>'image_url', image_url),
    has_variants = COALESCE((p_updates->>'has_variants')::BOOLEAN, has_variants),
    is_active = COALESCE((p_updates->>'is_active')::BOOLEAN, is_active),
    sort_order = COALESCE((p_updates->>'sort_order')::INTEGER, sort_order),
    description = COALESCE(p_updates->>'description', description),
    hover_image_url = COALESCE(p_updates->>'hover_image_url', hover_image_url),
    what_included = CASE WHEN p_updates ? 'what_included' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'what_included')) ELSE what_included END,
    warranty_support = CASE WHEN p_updates ? 'warranty_support' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'warranty_support')) ELSE warranty_support END,
    specifications = COALESCE(p_updates->'specifications', specifications),
    detailed_key_features = CASE WHEN p_updates ? 'detailed_key_features' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'detailed_key_features')) ELSE detailed_key_features END,
    applications = CASE WHEN p_updates ? 'applications' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'applications')) ELSE applications END,
    image_data = COALESCE(p_updates->>'image_data', image_data),
    hover_image_data = COALESCE(p_updates->>'hover_image_data', hover_image_data)
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_product(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  DELETE FROM products WHERE id = p_id;
END;
$$;

-- Secure admin product variant functions
CREATE OR REPLACE FUNCTION admin_fetch_product_variants(p_username TEXT, p_password_hash TEXT, p_product_id UUID)
RETURNS SETOF product_variants
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY SELECT * FROM product_variants WHERE product_id = p_product_id ORDER BY sort_order ASC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_create_product_variant(p_username TEXT, p_password_hash TEXT, p_variant JSONB)
RETURNS product_variants
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_var product_variants;
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  INSERT INTO product_variants (
    product_id, capacity, capacity_label, model, power, voltage, price, price_label,
    features, description, specifications, key_features, applications, sort_order
  )
  VALUES (
    (p_variant->>'product_id')::UUID,
    p_variant->>'capacity',
    p_variant->>'capacity_label',
    p_variant->>'model',
    p_variant->>'power',
    p_variant->>'voltage',
    (p_variant->>'price')::NUMERIC,
    p_variant->>'price_label',
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_variant->'features', '[]'::jsonb))),
    p_variant->>'description',
    COALESCE(p_variant->'specifications', '{}'::jsonb),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_variant->'key_features', '[]'::jsonb))),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_variant->'applications', '[]'::jsonb))),
    COALESCE((p_variant->>'sort_order')::INTEGER, 0)
  )
  RETURNING * INTO v_var;
  
  RETURN v_var;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_product_variant(p_username TEXT, p_password_hash TEXT, p_id UUID, p_updates JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  UPDATE product_variants
  SET
    capacity = COALESCE(p_updates->>'capacity', capacity),
    capacity_label = COALESCE(p_updates->>'capacity_label', capacity_label),
    model = COALESCE(p_updates->>'model', model),
    power = COALESCE(p_updates->>'power', power),
    voltage = COALESCE(p_updates->>'voltage', voltage),
    price = COALESCE((p_updates->>'price')::NUMERIC, price),
    price_label = COALESCE(p_updates->>'price_label', price_label),
    features = CASE WHEN p_updates ? 'features' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'features')) ELSE features END,
    description = COALESCE(p_updates->>'description', description),
    specifications = COALESCE(p_updates->'specifications', specifications),
    key_features = CASE WHEN p_updates ? 'key_features' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'key_features')) ELSE key_features END,
    applications = CASE WHEN p_updates ? 'applications' THEN ARRAY(SELECT jsonb_array_elements_text(p_updates->'applications')) ELSE applications END,
    sort_order = COALESCE((p_updates->>'sort_order')::INTEGER, sort_order)
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_product_variant(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  DELETE FROM product_variants WHERE id = p_id;
END;
$$;

-- Secure admin warranty functions
CREATE OR REPLACE FUNCTION admin_fetch_warranties(p_username TEXT, p_password_hash TEXT)
RETURNS SETOF warranty_registrations
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY SELECT * FROM warranty_registrations ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_warranty_status(p_username TEXT, p_password_hash TEXT, p_id UUID, p_status TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  UPDATE warranty_registrations
  SET warranty_status = p_status
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_warranty(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  DELETE FROM warranty_registrations WHERE id = p_id;
END;
$$;

-- Secure admin contact messages functions
CREATE OR REPLACE FUNCTION admin_fetch_messages(p_username TEXT, p_password_hash TEXT)
RETURNS SETOF contact_messages
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY SELECT * FROM contact_messages ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_mark_message_read(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  UPDATE contact_messages
  SET is_read = true
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_message(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  DELETE FROM contact_messages WHERE id = p_id;
END;
$$;

-- Secure admin claims functions
CREATE OR REPLACE FUNCTION admin_fetch_claims(p_username TEXT, p_password_hash TEXT)
RETURNS SETOF warranty_claims
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY SELECT * FROM warranty_claims ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_claim_status(p_username TEXT, p_password_hash TEXT, p_id UUID, p_status TEXT, p_notes TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  UPDATE warranty_claims
  SET
    claim_status = p_status,
    admin_notes = p_notes,
    updated_at = now()
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_claim(p_username TEXT, p_password_hash TEXT, p_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  DELETE FROM warranty_claims WHERE id = p_id;
END;
$$;

-- Secure admin dashboard statistics function
CREATE OR REPLACE FUNCTION admin_dashboard_stats(p_username TEXT, p_password_hash TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_prod_count BIGINT;
  v_warn_count BIGINT;
  v_msg_count BIGINT;
  v_unread_msg_count BIGINT;
  v_recent_warns JSONB;
  v_recent_msgs JSONB;
BEGIN
  IF NOT verify_admin_credentials(p_username, p_password_hash) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Counts
  SELECT COUNT(*) INTO v_prod_count FROM products;
  SELECT COUNT(*) INTO v_warn_count FROM warranty_registrations;
  SELECT COUNT(*) INTO v_msg_count FROM contact_messages;
  SELECT COUNT(*) INTO v_unread_msg_count FROM contact_messages WHERE is_read = false;
  
  -- Recent rows
  SELECT COALESCE(jsonb_agg(t), '[]'::jsonb) INTO v_recent_warns FROM (
    SELECT * FROM warranty_registrations ORDER BY created_at DESC LIMIT 5
  ) t;
  
  SELECT COALESCE(jsonb_agg(t), '[]'::jsonb) INTO v_recent_msgs FROM (
    SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5
  ) t;
  
  RETURN jsonb_build_object(
    'total_products', v_prod_count,
    'total_warranties', v_warn_count,
    'total_messages', v_msg_count,
    'unread_messages', v_unread_msg_count,
    'recent_warranties', v_recent_warns,
    'recent_messages', v_recent_msgs
  );
END;
$$;
