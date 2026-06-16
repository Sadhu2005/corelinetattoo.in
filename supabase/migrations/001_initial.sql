-- Coreline Art & Tattoo Platform — initial schema

CREATE TYPE order_status AS ENUM (
  'received',
  'in_progress',
  'completed',
  'delivered'
);

CREATE TYPE portfolio_type AS ENUM (
  'tattoo',
  'portrait',
  'blood_art',
  'before_after',
  'video'
);

CREATE TYPE tattoo_category AS ENUM (
  'minimal',
  'anime',
  'couple',
  'name',
  'religious',
  'sleeve',
  'tribal',
  'custom'
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type portfolio_type NOT NULL DEFAULT 'tattoo',
  category tattoo_category,
  image_url TEXT NOT NULL,
  video_url TEXT,
  instagram_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tattoo_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category tattoo_category NOT NULL DEFAULT 'custom',
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  price_inr INT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE portrait_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  style TEXT NOT NULL,
  size TEXT NOT NULL,
  frame TEXT NOT NULL,
  delivery_type TEXT NOT NULL,
  address TEXT,
  reference_image_url TEXT,
  notes TEXT,
  status order_status NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tattoo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  body_placement TEXT NOT NULL,
  size TEXT NOT NULL,
  style TEXT NOT NULL,
  reference_image_url TEXT,
  notes TEXT,
  status order_status NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  photo_url TEXT,
  review_text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service_type TEXT NOT NULL DEFAULT 'tattoo',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE instagram_embeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_url TEXT NOT NULL,
  account_handle TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_portfolio_featured ON portfolio_items(featured, sort_order);
CREATE INDEX idx_tattoo_designs_category ON tattoo_designs(category, sort_order);
CREATE INDEX idx_portrait_orders_status ON portrait_orders(status, created_at DESC);
CREATE INDEX idx_tattoo_bookings_status ON tattoo_bookings(status, created_at DESC);
CREATE INDEX idx_testimonials_featured ON testimonials(featured, created_at DESC);

-- Order number generators
CREATE OR REPLACE FUNCTION generate_order_number(prefix TEXT)
RETURNS TEXT AS $$
DECLARE
  seq INT;
BEGIN
  seq := floor(random() * 900000 + 100000)::INT;
  RETURN prefix || '-' || to_char(NOW(), 'YYMMDD') || '-' || seq;
END;
$$ LANGUAGE plpgsql;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tattoo_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE portrait_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tattoo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_embeds ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Public read
CREATE POLICY "Public read site_stats" ON site_stats FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read designs" ON tattoo_designs FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read instagram" ON instagram_embeds FOR SELECT USING (active = true);

-- Public insert orders
CREATE POLICY "Public insert portrait orders" ON portrait_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert tattoo bookings" ON tattoo_bookings FOR INSERT WITH CHECK (true);

-- Admin full access
CREATE POLICY "Admin all site_stats" ON site_stats FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all portfolio" ON portfolio_items FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all designs" ON tattoo_designs FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all portrait orders" ON portrait_orders FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all tattoo bookings" ON tattoo_bookings FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all instagram" ON instagram_embeds FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Storage buckets (run in Supabase dashboard or via SQL)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('designs', 'designs', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true);

-- Seed stats
INSERT INTO site_stats (label, value, sort_order) VALUES
  ('Portraits', '500+', 1),
  ('Tattoos', '300+', 2),
  ('Years Experience', '4+', 3),
  ('Happy Clients', '1000+', 4);

-- Seed testimonials
INSERT INTO testimonials (customer_name, review_text, rating, service_type, featured) VALUES
  ('Priya S.', 'Amazing blood art portrait! Captured every detail perfectly. Highly recommend Coreline Studio.', 5, 'portrait', true),
  ('Rahul K.', 'Best tattoo experience in Mysore. Clean studio, professional artist, stunning minimal design.', 5, 'tattoo', true),
  ('Ananya M.', 'Got a couple portrait as anniversary gift. My husband was speechless. True artist!', 5, 'portrait', true),
  ('Vikram D.', 'Custom sleeve design exceeded expectations. Already booked my next session.', 5, 'tattoo', true);
