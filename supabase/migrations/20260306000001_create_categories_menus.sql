CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL DEFAULT '{}',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: public read active, managers/staff CRUD
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Managers and staff can manage categories" ON categories FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('manager', 'staff')));

-- Seed default categories
INSERT INTO categories (slug, name, icon, sort_order) VALUES
  ('guide', '{"en":"Guide","he":"מדריך","ar":"دليل","fr":"Guide","ru":"Гид"}', 'BookOpen', 1),
  ('news', '{"en":"News","he":"חדשות","ar":"أخبار","fr":"Actualités","ru":"Новости"}', 'Newspaper', 2),
  ('hotels', '{"en":"Hotels","he":"מלונות","ar":"فنادق","fr":"Hôtels","ru":"Отели"}', 'Hotel', 3),
  ('attractions', '{"en":"Attractions","he":"אטרקציות","ar":"معالم","fr":"Attractions","ru":"Достопримечательности"}', 'MapPin', 4),
  ('dining', '{"en":"Dining","he":"מסעדות","ar":"مطاعم","fr":"Restaurants","ru":"Рестораны"}', 'UtensilsCrossed', 5),
  ('about', '{"en":"About","he":"אודות","ar":"حول","fr":"À propos","ru":"О нас"}', 'Info', 6),
  ('legal', '{"en":"Legal","he":"משפטי","ar":"قانوني","fr":"Juridique","ru":"Юридический"}', 'Scale', 7);

CREATE TABLE site_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_location TEXT NOT NULL,
  label JSONB NOT NULL DEFAULT '{}',
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active menus" ON site_menus FOR SELECT USING (is_active = true);
CREATE POLICY "Managers and staff can manage menus" ON site_menus FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('manager', 'staff')));

-- Seed top nav
INSERT INTO site_menus (menu_location, label, url, sort_order) VALUES
  ('top_nav', '{"en":"Hotels","he":"מלונות","ar":"فنادق","fr":"Hôtels","ru":"Отели"}', '/hotels', 1),
  ('top_nav', '{"en":"Yachts","he":"יאכטות","ar":"يخوت","fr":"Yachts","ru":"Яхты"}', '/yachts', 2),
  ('top_nav', '{"en":"Dining","he":"מסעדות","ar":"مطاعم","fr":"Restaurants","ru":"Рестораны"}', '/dining', 3),
  ('top_nav', '{"en":"Attractions","he":"אטרקציות","ar":"معالم","fr":"Attractions","ru":"Достопримечательности"}', '/explore', 4),
  ('top_nav', '{"en":"About","he":"אודות","ar":"حول","fr":"À propos","ru":"О нас"}', '/about', 5);

-- Seed footer legal
INSERT INTO site_menus (menu_location, label, url, sort_order) VALUES
  ('footer_legal', '{"en":"Privacy Policy","he":"מדיניות פרטיות","ar":"سياسة الخصوصية","fr":"Politique de confidentialité","ru":"Политика конфиденциальности"}', '/p/privacy-policy', 1),
  ('footer_legal', '{"en":"Terms of Service","he":"תנאי שימוש","ar":"شروط الخدمة","fr":"Conditions d''utilisation","ru":"Условия использования"}', '/p/terms-of-service', 2),
  ('footer_legal', '{"en":"Cookie Policy","he":"מדיניות עוגיות","ar":"سياسة ملفات تعريف الارتباط","fr":"Politique de cookies","ru":"Политика файлов cookie"}', '/p/cookie-policy', 3);
