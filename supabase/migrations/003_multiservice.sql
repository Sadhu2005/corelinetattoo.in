-- Multi-service: class bookings, inquiries, Instagram embed extensions

ALTER TABLE instagram_embeds
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'post'
    CHECK (media_type IN ('post', 'reel'));

ALTER TABLE instagram_embeds
  ADD COLUMN IF NOT EXISTS featured_on TEXT NOT NULL DEFAULT 'home'
    CHECK (featured_on IN ('home', 'tattoo', 'art', 'zumba', 'gallery'));

CREATE TABLE IF NOT EXISTS class_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  class_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  status order_status NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_pillar TEXT NOT NULL
    CHECK (service_pillar IN ('tattoo', 'art', 'zumba', 'general')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_class_bookings_status ON class_bookings(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_pillar ON inquiries(service_pillar, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_featured ON instagram_embeds(featured_on, active, sort_order);

ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert class bookings" ON class_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all class bookings" ON class_bookings FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin all inquiries" ON inquiries FOR ALL USING (is_admin()) WITH CHECK (is_admin());
