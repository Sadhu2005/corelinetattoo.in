-- Run after 001_initial.sql in Supabase SQL Editor

INSERT INTO storage.buckets (id, name, public) VALUES
  ('portfolio', 'portfolio', true),
  ('designs', 'designs', true),
  ('uploads', 'uploads', true),
  ('testimonials', 'testimonials', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read portfolio" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Public read designs" ON storage.objects
  FOR SELECT USING (bucket_id = 'designs');
CREATE POLICY "Public read testimonials" ON storage.objects
  FOR SELECT USING (bucket_id = 'testimonials');
CREATE POLICY "Public read uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Admin upload portfolio" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND is_admin());
CREATE POLICY "Admin upload designs" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'designs' AND is_admin());
CREATE POLICY "Admin upload testimonials" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'testimonials' AND is_admin());

CREATE POLICY "Anyone upload references" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Admin delete storage" ON storage.objects
  FOR DELETE USING (is_admin());
