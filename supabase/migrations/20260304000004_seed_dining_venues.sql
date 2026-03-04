-- Seed 100 dining & nightlife venues into catalog_items
DO $$
BEGIN
  -- Adaline (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Adaline' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Adaline', 'DINING', 0, 'per_person', true, '/logos/adaline.jpeg', 0);
  END IF;

  -- African Queen (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'African Queen' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('African Queen', 'DINING', 0, 'per_person', true, '/logos/african-queen.png', 0);
  END IF;

  -- Alaya (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Alaya' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Alaya', 'DINING', 0, 'per_person', true, '/logos/alaya.png', 0);
  END IF;

  -- Amazonico (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Amazonico' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Amazonico', 'DINING', 0, 'per_person', true, 'https://amazonicorestaurant.com', 0);
  END IF;

  -- Amelia (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Amelia' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Amelia', 'DINING', 0, 'per_person', true, '/logos/amelia.jpeg', 0);
  END IF;

  -- Aretha (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Aretha' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Aretha', 'DINING', 0, 'per_person', true, '/logos/aretha.jpeg', 0);
  END IF;

  -- Arrogante (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Arrogante' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Arrogante', 'DINING', 0, 'per_person', true, '/logos/arrogante.png', 0);
  END IF;

  -- Avenue (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Avenue' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Avenue', 'DINING', 0, 'per_person', true, '/logos/avenue.jpeg', 0);
  END IF;

  -- Baoli (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Baoli' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Baoli', 'CLUB', 0, 'per_person', true, '/logos/baoli.jpeg', 0);
  END IF;

  -- Bar De Pres (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Bar De Pres' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Bar De Pres', 'DINING', 0, 'per_person', true, '/logos/bar-de-pres.jpeg', 0);
  END IF;

  -- BCH:CLB (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'BCH:CLB' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('BCH:CLB', 'CLUB', 0, 'per_person', true, '/logos/bch-clb.png', 0);
  END IF;

  -- Beach by FIVE (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Beach by FIVE' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Beach by FIVE', 'DINING', 0, 'per_person', true, '/logos/beach-by-five.png', 0);
  END IF;

  -- Billionaire (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Billionaire' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Billionaire', 'CLUB', 0, 'per_person', true, '/logos/billionaire.jpeg', 0);
  END IF;

  -- Blume (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Blume' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Blume', 'DINING', 0, 'per_person', true, '/logos/blume.jpg', 0);
  END IF;

  -- Bohemia (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Bohemia' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Bohemia', 'DINING', 0, 'per_person', true, '/logos/bohemia.jpeg', 0);
  END IF;

  -- Carnival (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Carnival' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Carnival', 'DINING', 0, 'per_person', true, '/logos/carnival.jpeg', 0);
  END IF;

  -- Casa Amor (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Casa Amor' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Casa Amor', 'DINING', 0, 'per_person', true, '/logos/casa-amor.png', 0);
  END IF;

  -- Ce La Vi (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Ce La Vi' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, logo_path, sort_order) VALUES ('Ce La Vi', 'DINING', 0, 'per_person', true, '/logos/ce-la-vi.webp', 0);
  END IF;

  -- Chic Nonna (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Chic Nonna' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Chic Nonna', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Cinque (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Cinque' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Cinque', 'DINING', 0, 'per_person', true, 'https://cinquedubai.com', 0);
  END IF;

  -- CoveBeach (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'CoveBeach' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('CoveBeach', 'CLUB', 0, 'per_person', true, 'https://cfrgroup.com', 0);
  END IF;

  -- Cou Cou (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Cou Cou' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Cou Cou', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Coya (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Coya' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Coya', 'DINING', 0, 'per_person', true, 'https://coyarestaurant.com', 0);
  END IF;

  -- Dream (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Dream' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Dream', 'CLUB', 0, 'per_person', true, 'https://dreamdubai.com', 0);
  END IF;

  -- Eva (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Eva' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Eva', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- FIVE Venues (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'FIVE Venues' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('FIVE Venues', 'CLUB', 0, 'per_person', true, 'https://fivehotelsandresorts.com', 0);
  END IF;

  -- GAL (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'GAL' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('GAL', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Gatsby (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Gatsby' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Gatsby', 'CLUB', 0, 'per_person', true, 'https://gatsbydubai.com', 0);
  END IF;

  -- Gigi (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Gigi' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Gigi', 'DINING', 0, 'per_person', true, 'https://gigidubai.com', 0);
  END IF;

  -- Gitano (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Gitano' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Gitano', 'DINING', 0, 'per_person', true, 'https://gitanodubai.com', 0);
  END IF;

  -- Hanu (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Hanu' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Hanu', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Il'Gatto Pardo (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Il''Gatto Pardo' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Il''Gatto Pardo', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Iliana (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Iliana' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Iliana', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Kaspia (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Kaspia' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Kaspia', 'DINING', 0, 'per_person', true, 'https://kaspia.com', 0);
  END IF;

  -- Kinugawa (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Kinugawa' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Kinugawa', 'DINING', 0, 'per_person', true, 'https://kinugawa.fr', 0);
  END IF;

  -- Krasota (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Krasota' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Krasota', 'DINING', 0, 'per_person', true, 'https://krasota.ae', 0);
  END IF;

  -- L'amo Bistro (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'L''amo Bistro' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('L''amo Bistro', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- La Nina (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'La Nina' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('La Nina', 'DINING', 0, 'per_person', true, 'https://laninadubai.com', 0);
  END IF;

  -- La Cantine (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'La Cantine' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('La Cantine', 'DINING', 0, 'per_person', true, 'https://lacantine.ae', 0);
  END IF;

  -- Ly-La (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Ly-La' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Ly-La', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Maiden Shanghai (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Maiden Shanghai' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Maiden Shanghai', 'DINING', 0, 'per_person', true, 'https://maidenshanghai.com', 0);
  END IF;

  -- Maison De Curry (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Maison De Curry' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Maison De Curry', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Maison De La Page (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Maison De La Page' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Maison De La Page', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Maison Revka (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Maison Revka' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Maison Revka', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Mamabella (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Mamabella' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Mamabella', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Mimi Kakushi (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Mimi Kakushi' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Mimi Kakushi', 'DINING', 0, 'per_person', true, 'https://mimikakushi.com', 0);
  END IF;

  -- Mott 32 (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Mott 32' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Mott 32', 'DINING', 0, 'per_person', true, 'https://mott32.com', 0);
  END IF;

  -- Nahate (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Nahate' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Nahate', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Nammos (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Nammos' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Nammos', 'DINING', 0, 'per_person', true, 'https://nammosdubai.com', 0);
  END IF;

  -- Nazcaa (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Nazcaa' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Nazcaa', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Nikki Beach (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Nikki Beach' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Nikki Beach', 'CLUB', 0, 'per_person', true, 'https://nikkibeach.com', 0);
  END IF;

  -- Ninive beach (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Ninive beach' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Ninive beach', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Nobu (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Nobu' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Nobu', 'DINING', 0, 'per_person', true, 'https://noburestaurants.com', 0);
  END IF;

  -- O Beach (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'O Beach' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('O Beach', 'CLUB', 0, 'per_person', true, 'https://obeachdubai.com', 0);
  END IF;

  -- Opa (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Opa' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Opa', 'DINING', 0, 'per_person', true, 'https://opadubai.com', 0);
  END IF;

  -- Ora (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Ora' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Ora', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Pacha Icons (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Pacha Icons' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Pacha Icons', 'CLUB', 0, 'per_person', true, 'https://pacha.com', 0);
  END IF;

  -- Paris Paradis (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Paris Paradis' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Paris Paradis', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Playa Pacha (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Playa Pacha' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Playa Pacha', 'CLUB', 0, 'per_person', true, 0);
  END IF;

  -- Pool by FIVE (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Pool by FIVE' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Pool by FIVE', 'DINING', 0, 'per_person', true, 'https://fivehotelsandresorts.com', 0);
  END IF;

  -- Ram & Roll (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Ram & Roll' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Ram & Roll', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Raspoutine (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Raspoutine' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Raspoutine', 'CLUB', 0, 'per_person', true, 'https://raspoutine.com', 0);
  END IF;

  -- Revelry (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Revelry' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Revelry', 'CLUB', 0, 'per_person', true, 0);
  END IF;

  -- Rialto (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Rialto' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Rialto', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Sakhalin (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Sakhalin' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Sakhalin', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Salvaje (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Salvaje' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Salvaje', 'DINING', 0, 'per_person', true, 'https://salvajedubai.com', 0);
  END IF;

  -- Sana (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Sana' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Sana', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Sexy Fish (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Sexy Fish' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Sexy Fish', 'DINING', 0, 'per_person', true, 'https://sexyfish.com', 0);
  END IF;

  -- Signor Sassi (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Signor Sassi' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Signor Sassi', 'DINING', 0, 'per_person', true, 'https://signorsassi.com', 0);
  END IF;

  -- Surf Club (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Surf Club' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Surf Club', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Sushi Samba (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Sushi Samba' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Sushi Samba', 'DINING', 0, 'per_person', true, 'https://sushisamba.com', 0);
  END IF;

  -- Tang (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Tang' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Tang', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Tattu (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Tattu' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Tattu', 'DINING', 0, 'per_person', true, 'https://tattu.co.uk', 0);
  END IF;

  -- Terra Solis (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Terra Solis' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Terra Solis', 'DINING', 0, 'per_person', true, 'https://terrasolis.com', 0);
  END IF;

  -- Theater (CLUB)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Theater' AND category = 'CLUB') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Theater', 'CLUB', 0, 'per_person', true, 0);
  END IF;

  -- Tresind (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Tresind' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Tresind', 'DINING', 0, 'per_person', true, 'https://tresind.com', 0);
  END IF;

  -- Urla (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Urla' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, website_url, sort_order) VALUES ('Urla', 'DINING', 0, 'per_person', true, 'https://urladubai.com', 0);
  END IF;

  -- Verde Beach (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Verde Beach' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Verde Beach', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Verde Restaurant (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Verde Restaurant' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Verde Restaurant', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Villa Coconut (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Villa Coconut' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Villa Coconut', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Woohoo (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Woohoo' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Woohoo', 'DINING', 0, 'per_person', true, 0);
  END IF;

  -- Zenon (DINING)
  IF NOT EXISTS (SELECT 1 FROM catalog_items WHERE title = 'Zenon' AND category = 'DINING') THEN
    INSERT INTO catalog_items (title, category, price, pricing_unit, is_active, sort_order) VALUES ('Zenon', 'DINING', 0, 'per_person', true, 0);
  END IF;

END $$;
