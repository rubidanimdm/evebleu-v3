-- Seed blog articles into pages table
-- These correspond to the hardcoded BLOG_ARTICLES in BlogSection.tsx

-- 1. Dubai Airport Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'dubai-airport-guide',
  'Dubai International Airport — Everything You Need to Know',
  '[{"type":"text","content":"<h1>Dubai International Airport — Everything You Need to Know</h1><p>Dubai International Airport (DXB) is one of the busiest and most advanced airports in the world. Over 80 million passengers pass through it annually, serving as a major international aviation hub connecting East and West.</p>"},{"type":"text","content":"<h2>Terminals &amp; Services</h2><p>The airport features three main terminals. Terminal 3, the largest, is dedicated to Emirates and offers a next-level passenger experience: luxurious VIP lounges, spa, showers, and even a swimming pool. Terminal 1 serves most international airlines, while Terminal 2 focuses on domestic and regional flights.</p>"},{"type":"text","content":"<h2>Duty Free Shopping</h2><p>Dubai Duty Free is considered one of the best in the world. You''ll find luxury brands, alcohol, perfumes, chocolates, and electronics at competitive prices.</p>"},{"type":"text","content":"<h2>Getting to Your Hotel</h2><p>Options include official taxis (available 24/7), Dubai Metro (Red Line passes through the airport), or private transfer services. At EVE BLUE, we offer VIP airport pickup directly to your hotel — in a luxury vehicle with a professional driver waiting with a personalized sign.</p>"},{"type":"text","content":"<h2>Important Tips</h2><ul><li>Arrive at least 3 hours before international flights</li><li>Download the DXB Smart app for flight tracking</li><li>Use Smart Gates to speed up passport control</li><li>Free WiFi available in all terminals</li><li>Rest and sleep zones available 24/7</li></ul>"}]'::jsonb,
  'Dubai International Airport Guide - EVE BLUE',
  'Planning a Dubai vacation? Everything you need to know about Dubai International Airport — terminals, duty free, transfers, and tips.',
  '/assets/blog-airport.jpg',
  true, 'blog', ARRAY['travel','airport','guide'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 2. Emirates Airline
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'emirates-airline',
  'Emirates Airlines — Why It''s the Best Choice for Dubai',
  '[{"type":"text","content":"<h1>Emirates Airlines — Why It''s the Best Choice for Dubai</h1><p>Emirates is the national airline of the UAE and one of the world''s leading airlines. Based in Dubai, it flies to destinations worldwide and is renowned for exceptional service and constant innovation.</p>"},{"type":"text","content":"<h2>Flight Classes</h2><ul><li><strong>Economy</strong> — Large personal entertainment screens, hot meals, generous legroom</li><li><strong>Business</strong> — Lie-flat seats, chef''s menu, bar, lounge access</li><li><strong>First Class</strong> — Fully private suites, in-air spa shower, personal butler service</li></ul>"},{"type":"text","content":"<h2>Fleet</h2><p>Emirates operates Airbus A380s and Boeing 777s. The Emirates A380 is an experience in itself — with cocktail bars, an onboard lounge, and first-class showers.</p>"},{"type":"text","content":"<h2>Booking Tips</h2><ul><li>Book early for better prices</li><li>Check Emirates website for deals</li><li>Consider upgrading to business class — worth every penny</li><li>Join Emirates Skywards for points</li></ul><p>At EVE BLUE, we can help you find the perfect flight and arrange all airport transfers.</p>"}]'::jsonb,
  'Emirates Airlines Guide - EVE BLUE',
  'Planning a flight to Dubai in style? Emirates is the airline for you. Impeccable service, a modern fleet, and premium classes.',
  '/assets/blog-emirates.jpg',
  true, 'blog', ARRAY['travel','airline','emirates'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 3. Dubai Drone Show
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'dubai-nightlife-guide',
  'The Complete Guide to Dubai''s Spectacular Drone Show (2026)',
  '[{"type":"text","content":"<h1>The Complete Guide to Dubai''s Spectacular Drone Show (2026)</h1><p>Dubai never stops surprising — and the nightly drone show is one of the most spectacular events the city offers. Every evening, hundreds of illuminated drones create stunning 3D formations in the Dubai sky.</p>"},{"type":"text","content":"<h2>What Is It?</h2><p>A lights and sound show where hundreds or thousands of programmed drones rise into the sky, creating giant figures, logos, and 3D animations. It''s a blend of advanced technology, visual art, and an unforgettable experience.</p>"},{"type":"text","content":"<h2>Where to Watch?</h2><ul><li><strong>The Palm Jumeirah</strong> — Excellent beachside viewing</li><li><strong>Dubai Marina</strong> — Amazing atmosphere with towers in the background</li><li><strong>Bluewaters Island</strong> — Close to Ain Dubai</li><li><strong>JBR Beach</strong> — Accessible, free, with restaurants nearby</li></ul>"},{"type":"text","content":"<h2>Our Tips</h2><ul><li>Arrive at least an hour early for a good spot</li><li>Bring a camera with night photography capabilities</li><li>Check the schedule in advance</li><li>Combine the show with dinner at a restaurant with a view</li></ul><p>Want us to organize a full evening around the show? Talk to us at EVE BLUE.</p>"}]'::jsonb,
  'Dubai Drone Show Guide - EVE BLUE',
  'The complete guide to Dubai''s spectacular nightly drone show. Best viewing spots, tips, and how to plan your evening.',
  '/assets/blog-dubai-nightlife.jpg',
  true, 'blog', ARRAY['attractions','drone-show','nightlife'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 4. Yacht Charter Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'yacht-charter-guide',
  'Yacht Charter in Dubai — The Complete Guide to a Perfect Cruise',
  '[{"type":"text","content":"<h1>Yacht Charter in Dubai — The Complete Guide</h1><p>Yacht charter in Dubai has become one of the most popular luxury experiences for travelers seeking the next level of exclusivity.</p>"},{"type":"text","content":"<h2>Why a Yacht in Dubai?</h2><p>Dubai offers the perfect combination: warm clear seas, a stunning coastline with skyscrapers as backdrop, and advanced maritime infrastructure.</p>"},{"type":"text","content":"<h2>Types of Yachts</h2><ul><li><strong>Compact (36-44ft)</strong> — Perfect for couples and small families</li><li><strong>Medium (48-56ft)</strong> — Ideal for groups of 8-15, with spacious sun deck</li><li><strong>Large (70-100+ft)</strong> — For events and parties, full crew, kitchen and cabins</li></ul>"},{"type":"text","content":"<h2>What''s Usually Included?</h2><ul><li>Professional captain and navigator</li><li>Fuel</li><li>Welcome drinks</li><li>Fishing and snorkeling equipment</li><li>Sound system</li></ul>"},{"type":"text","content":"<h2>Recommended Routes</h2><ul><li>Around The Palm Jumeirah</li><li>Along JBR coastline and Ain Dubai</li><li>Dubai Marina — cruise between the towers</li><li>Burj Al Arab — perfect photo opportunity from the sea</li></ul><p>Talk to us at EVE BLUE and we''ll find you the perfect yacht.</p>"}]'::jsonb,
  'Yacht Charter Dubai Guide - EVE BLUE',
  'The complete guide to yacht charter in Dubai. Types, prices, routes, and tips for a perfect cruise.',
  '/assets/blog-yacht.jpg',
  true, 'blog', ARRAY['luxury','yacht','experiences'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 5. Desert Safari Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'desert-safari-guide',
  'Desert Safari in Dubai — An Adventure You Can''t Miss',
  '[{"type":"text","content":"<h1>Desert Safari in Dubai — An Adventure You Can''t Miss</h1><p>The Dubai desert is not just sand — it''s an experience. A safari in the Arabian desert is one of the first things to do when arriving in Dubai.</p>"},{"type":"text","content":"<h2>Types of Safari</h2><ul><li><strong>Sunset Safari</strong> — The most popular. Afternoon departure, dune bashing, sunset watching, and dinner</li><li><strong>Morning Safari</strong> — Dunes, sandboarding, and camel rides</li><li><strong>Overnight Safari</strong> — Luxury Bedouin tent, stargazing, and desert breakfast</li><li><strong>VIP Private Safari</strong> — Private vehicle, personal guide, custom menu</li></ul>"},{"type":"text","content":"<h2>What''s Included?</h2><ul><li>4x4 dune bashing</li><li>Camel riding</li><li>Sandboarding</li><li>Traditional Bedouin dinner</li><li>Belly dance and fire shows</li><li>Henna painting</li></ul><p>Want a VIP desert experience? EVE BLUE arranges private safari packages with luxury upgrades.</p>"}]'::jsonb,
  'Desert Safari Dubai Guide - EVE BLUE',
  'Desert safari in Dubai — types, what to expect, and tips for an unforgettable Arabian desert adventure.',
  '/assets/blog-desert.jpg',
  true, 'blog', ARRAY['attractions','desert','safari'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 6. Fine Dining Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'fine-dining-guide',
  'The Best Restaurants in Dubai — Our 2026 Guide',
  '[{"type":"text","content":"<h1>The Best Restaurants in Dubai — Our 2026 Guide</h1><p>Dubai''s restaurant scene is one of the most dynamic and exciting in the world. Every year, new restaurants open, famous chefs launch outposts, and the competition for the best table only intensifies.</p>"},{"type":"text","content":"<h2>Top Picks</h2><p>From world-class chef restaurants to hidden gems, Dubai offers an unmatched culinary paradise. Whether you''re looking for fine dining with a view, authentic Middle Eastern cuisine, or the latest fusion concepts — we''ve got you covered.</p>"},{"type":"text","content":"<h2>Tips for Dining in Dubai</h2><ul><li>Book popular restaurants at least 2 weeks in advance</li><li>Dress code matters — smart casual minimum for most fine dining</li><li>Friday brunch is a Dubai institution — try at least one</li><li>Many restaurants offer stunning views — request a window or terrace table</li></ul><p>Need a reservation at a fully booked restaurant? EVE BLUE has connections everywhere.</p>"}]'::jsonb,
  'Best Restaurants Dubai 2026 - EVE BLUE',
  'Dubai is a culinary paradise. Our 2026 guide to the best restaurants, dining tips, and how to get the best tables.',
  '/assets/blog-dining.jpg',
  true, 'blog', ARRAY['dining','restaurants','guide'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 7. Dubai Nightlife Clubs
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'dubai-nightlife-clubs',
  'Dubai Nightlife — The Complete Guide to Clubs, Bars & VIP Nights',
  '[{"type":"text","content":"<h1>Dubai Nightlife — The Complete Guide</h1><p>Dubai nightlife is a world of its own. The city offers an incredible variety of clubs, bars, lounges, and parties — all at a level that competes with London, Ibiza, and Miami.</p>"},{"type":"text","content":"<h2>Top Venues</h2><p>From rooftop bars with insane views to underground clubs with world-class DJs — Dubai has it all. The nightlife scene is concentrated around DIFC, Dubai Marina, JBR, and Palm Jumeirah.</p>"},{"type":"text","content":"<h2>VIP Experience</h2><ul><li>Table reservations are essential for top clubs</li><li>Dress code is strictly enforced — dress to impress</li><li>Ladies'' nights offer free entry and drinks on certain days</li><li>Most clubs open at 10 PM but peak hours are midnight-3 AM</li></ul><p>Want VIP access to Dubai''s hottest clubs? EVE BLUE handles guest lists, tables, and bottle service.</p>"}]'::jsonb,
  'Dubai Nightlife Guide - EVE BLUE',
  'The complete guide to Dubai nightlife — clubs, bars, VIP nights, and how to experience it all with EVE BLUE.',
  '/assets/blog-nightlife.jpg',
  true, 'blog', ARRAY['nightlife','clubs','bars'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 8. Luxury Shopping Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'luxury-shopping-guide',
  'Luxury Shopping in Dubai — Our Guide to Malls, Brands & Shopping Experiences',
  '[{"type":"text","content":"<h1>Luxury Shopping in Dubai</h1><p>Dubai and shopping go hand in hand. The city offers an unparalleled shopping experience — massive malls, luxury brands everywhere, and prices sometimes better than Europe thanks to tax-free shopping.</p>"},{"type":"text","content":"<h2>Top Shopping Destinations</h2><ul><li><strong>Dubai Mall</strong> — The world''s largest mall with 1,200+ stores</li><li><strong>Mall of the Emirates</strong> — Home to Ski Dubai and luxury brands</li><li><strong>City Walk</strong> — Open-air boutique shopping</li><li><strong>DIFC Gate Avenue</strong> — High-end designer stores</li></ul>"},{"type":"text","content":"<h2>Shopping Tips</h2><ul><li>Dubai Shopping Festival (Jan-Feb) offers massive discounts</li><li>Tax-free shopping means better prices on luxury goods</li><li>Most malls are open until 10 PM (midnight on weekends)</li><li>Personal shoppers available at major department stores</li></ul><p>Need a personal shopping experience? EVE BLUE arranges VIP shopping tours with private stylists.</p>"}]'::jsonb,
  'Luxury Shopping Dubai Guide - EVE BLUE',
  'Dubai is a shopping paradise. Our guide to luxury malls, brands, and exclusive shopping experiences.',
  '/assets/blog-shopping.jpg',
  true, 'blog', ARRAY['shopping','luxury','malls'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 9. Family Attractions Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'family-attractions-guide',
  'Dubai with Kids — The Best Family Attractions (2026)',
  '[{"type":"text","content":"<h1>Dubai with Kids — The Best Family Attractions</h1><p>Dubai is a perfect family destination. The city invested billions in world-class attractions suitable for all ages.</p>"},{"type":"text","content":"<h2>Top Family Attractions</h2><ul><li><strong>Aquaventure Waterpark</strong> — The Middle East''s largest waterpark at Atlantis</li><li><strong>Dubai Aquarium</strong> — One of the world''s largest aquariums inside Dubai Mall</li><li><strong>LEGOLAND Dubai</strong> — Theme park, water park, and hotel</li><li><strong>IMG Worlds of Adventure</strong> — The world''s largest indoor theme park</li><li><strong>KidZania</strong> — Interactive kids'' city in Dubai Mall</li><li><strong>Dubai Frame</strong> — 150m tall picture frame with glass floor</li></ul>"},{"type":"text","content":"<h2>Family Tips</h2><ul><li>Visit water parks on weekdays to avoid crowds</li><li>Many hotels offer kids'' clubs and babysitting</li><li>Summer months (Jun-Sep) are very hot — plan indoor activities</li><li>Most attractions offer family packages at better rates</li></ul><p>Planning a family trip? EVE BLUE creates custom family itineraries with all the best activities.</p>"}]'::jsonb,
  'Dubai Family Attractions 2026 - EVE BLUE',
  'The best family attractions in Dubai — water parks, aquariums, theme parks, and activities kids will love.',
  '/assets/blog-family.jpg',
  true, 'blog', ARRAY['family','attractions','kids'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 10. JW Marriott Marquis Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'jw-marriott-marquis-dubai',
  'JW Marriott Marquis Hotel Dubai — The World''s Tallest Hotel',
  '[{"type":"text","content":"<h1>JW Marriott Marquis Hotel Dubai</h1><p>JW Marriott Marquis Hotel Dubai is one of Dubai''s most iconic hotels and holds the title of the world''s tallest hotel, with twin towers soaring to 355 meters. Located in the prestigious Business Bay area.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>World''s tallest hotel at 355 meters</li><li>1,608 rooms and suites</li><li>Multiple award-winning restaurants</li><li>Luxury spa and wellness center</li><li>Stunning panoramic views of Downtown Dubai</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>Perfect for business travelers and luxury seekers. Minutes from Downtown Dubai, Dubai Mall, and Burj Khalifa. The rooftop restaurants offer some of the best views in the city.</p>"}]'::jsonb,
  'JW Marriott Marquis Dubai - EVE BLUE',
  'Two impressive twin towers in the heart of Business Bay, with world-class restaurants and unrivaled panoramic views.',
  '/assets/blog-jw-marriott.jpg',
  true, 'blog', ARRAY['hotels','luxury','business-bay'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 11. Shangri-La Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'shangri-la-dubai',
  'Shangri-La Dubai — Asian Elegance with Burj Khalifa Views',
  '[{"type":"text","content":"<h1>Shangri-La Dubai</h1><p>Shangri-La Dubai is a classic luxury hotel bringing Asia''s renowned hospitality tradition to the heart of Dubai. Located on Sheikh Zayed Road, it offers direct metro access and an ideal base for exploring the city.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Direct Burj Khalifa views from most rooms</li><li>Traditional Asian hospitality</li><li>Award-winning CHI, The Spa</li><li>Multiple restaurants including Shang Palace</li><li>Outdoor pool and fitness center</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>A perfect blend of traditional Asian elegance and modern luxury. Ideal for those who appreciate understated sophistication and impeccable service.</p>"}]'::jsonb,
  'Shangri-La Dubai Hotel - EVE BLUE',
  'A top-tier 5-star hotel on Sheikh Zayed Road with direct Burj Khalifa views and traditional Asian hospitality.',
  '/assets/blog-shangrila.jpg',
  true, 'blog', ARRAY['hotels','luxury','sheikh-zayed'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 12. Sofitel Dubai Jumeirah Beach
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'sofitel-dubai-jumeirah-beach',
  'Sofitel Dubai Jumeirah Beach — French Elegance on the Beach',
  '[{"type":"text","content":"<h1>Sofitel Dubai Jumeirah Beach</h1><p>Sofitel Dubai Jumeirah Beach is an impressive 5-star hotel blending renowned French elegance with a dreamy beachfront location. Situated in the popular JBR area, it offers direct access to white sandy beach.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Direct private beach access</li><li>French Art de Vivre style</li><li>Multiple restaurants and bars</li><li>Infinity pool overlooking the sea</li><li>Walking distance to The Walk JBR</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>Perfect for beach lovers who appreciate French sophistication. The location near JBR offers both relaxation and vibrant entertainment options.</p>"}]'::jsonb,
  'Sofitel Dubai Jumeirah Beach - EVE BLUE',
  'A luxurious French-style boutique hotel directly on Jumeirah Beach with stunning private beach and prime JBR location.',
  '/assets/blog-sofitel.jpg',
  true, 'blog', ARRAY['hotels','luxury','beach','jbr'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 13. Park Hyatt Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'park-hyatt-dubai',
  'Park Hyatt Dubai — A Serene Luxury Resort on Dubai Creek',
  '[{"type":"text","content":"<h1>Park Hyatt Dubai</h1><p>Park Hyatt Dubai is one of Dubai''s most unique hotels — a luxury boutique hotel offering a completely different experience from the city''s large, bustling properties. Located on the banks of Dubai Creek.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Serene creek-side location</li><li>Moorish-Mediterranean architecture</li><li>Private marina</li><li>Award-winning restaurants</li><li>Luxurious spa with private treatment rooms</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>An oasis of tranquility in the heart of Dubai. Perfect for those seeking a resort-like experience with personal, attentive service away from the high-rise bustle.</p>"}]'::jsonb,
  'Park Hyatt Dubai Hotel - EVE BLUE',
  'An oasis of tranquility on Dubai Creek with Moorish architecture, private marina, and personal luxury service.',
  '/assets/blog-park-hyatt.jpg',
  true, 'blog', ARRAY['hotels','luxury','creek'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 14. Rixos Premium Dubai JBR
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'rixos-premium-dubai-jbr',
  'Rixos Premium Dubai JBR — Ultra All-Inclusive at Its Finest',
  '[{"type":"text","content":"<h1>Rixos Premium Dubai JBR</h1><p>Rixos Premium Dubai JBR is one of Dubai''s most popular hotels. This luxury All-Inclusive hotel offers a complete experience: private beach, stunning pools, unlimited restaurants and bars.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Ultra all-inclusive concept</li><li>Private beach on JBR</li><li>Multiple infinity pools</li><li>Unlimited restaurants and bars</li><li>Beach club with late-night entertainment</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>The best value luxury all-inclusive in Dubai. Perfect for those who want a worry-free vacation with everything included at 5-star level.</p>"}]'::jsonb,
  'Rixos Premium Dubai JBR - EVE BLUE',
  'A luxury all-inclusive hotel on JBR beach with infinity pools, unlimited restaurants, and a vibrant beach club.',
  '/assets/blog-rixos.jpg',
  true, 'blog', ARRAY['hotels','all-inclusive','jbr','beach'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 15. Burj Khalifa Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'burj-khalifa-guide',
  'Burj Khalifa — The World''s Tallest Building',
  '[{"type":"text","content":"<h1>Burj Khalifa — The World''s Tallest Building</h1><p>Burj Khalifa is not just the world''s tallest building — it''s a symbol of ambition, innovation, and vision. Soaring to an incredible 828 meters with 163 floors, it dominates Dubai''s skyline.</p>"},{"type":"text","content":"<h2>Observation Decks</h2><ul><li><strong>At The Top (Level 124-125)</strong> — The main observation deck with panoramic views</li><li><strong>At The Top SKY (Level 148)</strong> — The premium experience at 555 meters</li></ul>"},{"type":"text","content":"<h2>Dubai Fountain</h2><p>At the base of Burj Khalifa, the Dubai Fountain puts on a spectacular show every 30 minutes from 6 PM. The world''s largest choreographed fountain system shoots water up to 150 meters high.</p>"},{"type":"text","content":"<h2>Tips</h2><ul><li>Book tickets online in advance — much cheaper than walk-in</li><li>Sunset timing offers the best views and photos</li><li>The fountain show is free to watch from the promenade</li></ul>"}]'::jsonb,
  'Burj Khalifa Guide - EVE BLUE',
  'Soaring 828 meters with 163 floors, Burj Khalifa is Dubai''s ultimate icon. Observation decks, fountains, and sky-high dining.',
  '/assets/blog-burj-khalifa.jpg',
  true, 'blog', ARRAY['attractions','landmarks','burj-khalifa'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 16. Dubai Mall Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'dubai-mall-guide',
  'Dubai Mall — The World''s Largest Shopping Destination',
  '[{"type":"text","content":"<h1>Dubai Mall — The World''s Largest Shopping Destination</h1><p>Dubai Mall is far more than a shopping center — it''s an entire city unto itself. With a total area exceeding 1.1 million square meters, it''s the world''s largest mall, attracting over 80 million visitors annually.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Over 1,200 stores including all luxury brands</li><li>Dubai Aquarium &amp; Underwater Zoo</li><li>Olympic-size Ice Rink</li><li>VR Park and KidZania</li><li>Indoor waterfall</li><li>Direct access to Burj Khalifa</li></ul>"},{"type":"text","content":"<h2>Tips</h2><ul><li>The mall is enormous — plan which sections to visit</li><li>Download the Dubai Mall app for navigation</li><li>Visit on weekday mornings for fewer crowds</li><li>Valet parking available at multiple entrances</li></ul>"}]'::jsonb,
  'Dubai Mall Guide - EVE BLUE',
  'Over 1,200 stores, a giant aquarium, ice rink, and attractions for all ages — all under one roof at Dubai Mall.',
  '/assets/blog-dubai-mall.jpg',
  true, 'blog', ARRAY['attractions','shopping','dubai-mall'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 17. Desert Safari Dubai (Top Attractions)
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'desert-safari-dubai',
  'Desert Safari Dubai — An Adventure Among the Dunes',
  '[{"type":"text","content":"<h1>Desert Safari Dubai — An Adventure Among the Dunes</h1><p>Desert safari is one of the most unique experiences Dubai offers — and one of the most popular among tourists worldwide. A short drive from the city, you find yourself in the heart of the Arabian desert.</p>"},{"type":"text","content":"<h2>The Experience</h2><ul><li>Thrilling dune bashing in 4x4 vehicles</li><li>Camel riding through the desert</li><li>Sandboarding on golden dunes</li><li>Traditional Bedouin camp dinner</li><li>Belly dance and fire show performances</li><li>Stargazing in the desert sky</li></ul>"},{"type":"text","content":"<h2>Booking Tips</h2><ul><li>Sunset safaris offer the best photographic opportunities</li><li>Wear comfortable, light clothing</li><li>Bring a light jacket for cooler desert evenings</li><li>Camera is a must — the scenery is incredible</li></ul>"}]'::jsonb,
  'Desert Safari Dubai - EVE BLUE',
  'An authentic desert experience with dune bashing, camel riding, sandboarding, and Bedouin dinner under the stars.',
  '/assets/blog-desert-safari.jpg',
  true, 'blog', ARRAY['attractions','desert','adventure'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 18. Palm Jumeirah & Atlantis
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'palm-jumeirah-atlantis',
  'Palm Jumeirah & Atlantis — The World''s Most Famous Man-Made Island',
  '[{"type":"text","content":"<h1>Palm Jumeirah &amp; Atlantis</h1><p>Palm Jumeirah is one of the most spectacular engineering projects ever built — a man-made island shaped like a palm tree, visible from space. It has become a symbol of Dubai.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Iconic palm-shaped island visible from space</li><li>Atlantis The Palm and Atlantis The Royal hotels</li><li>Aquaventure Waterpark — Middle East''s largest</li><li>The Lost Chambers Aquarium</li><li>Stunning beaches and beach clubs</li><li>World-class restaurants by celebrity chefs</li></ul>"},{"type":"text","content":"<h2>Getting There</h2><p>The Palm Monorail connects to the mainland, or take a taxi/ride-share. The views while crossing the Palm are spectacular.</p>"}]'::jsonb,
  'Palm Jumeirah & Atlantis Guide - EVE BLUE',
  'The palm-shaped island visible from space, with iconic hotels, a massive waterpark, and world-class restaurants.',
  '/assets/blog-palm-atlantis.jpg',
  true, 'blog', ARRAY['attractions','palm-jumeirah','atlantis'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 19. Ain Dubai Guide
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'ain-dubai-guide',
  'Ain Dubai — The World''s Largest Observation Wheel',
  '[{"type":"text","content":"<h1>Ain Dubai — The World''s Largest Observation Wheel</h1><p>Ain Dubai is the world''s largest observation wheel, rising an impressive 250 meters — nearly twice the height of the London Eye. Located on Bluewaters Island facing JBR beach.</p>"},{"type":"text","content":"<h2>Experience Options</h2><ul><li><strong>Observation Pods</strong> — Standard 38-minute rotation with panoramic views</li><li><strong>Social Pods</strong> — Lounge seating with beverages</li><li><strong>Private Pods</strong> — Exclusive hire for special occasions</li></ul>"},{"type":"text","content":"<h2>Views</h2><p>From the top, you can see the entire Dubai coastline, Palm Jumeirah, Dubai Marina, and on clear days, even the World Islands. Sunset rides are the most popular.</p>"},{"type":"text","content":"<h2>Tips</h2><ul><li>Book sunset time slots in advance — they sell out</li><li>Bluewaters Island has great restaurants for before/after</li><li>Walking distance from JBR Beach</li></ul>"}]'::jsonb,
  'Ain Dubai Guide - EVE BLUE',
  'Rising 250 meters on Bluewaters Island, Ain Dubai offers breathtaking panoramic views of Dubai''s coastline.',
  '/assets/blog-ain-dubai.jpg',
  true, 'blog', ARRAY['attractions','ain-dubai','bluewaters'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 20. Atlantis The Royal
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'atlantis-the-royal',
  'Atlantis The Royal — Dubai''s Newest Crown Jewel',
  '[{"type":"text","content":"<h1>Atlantis The Royal</h1><p>Atlantis The Royal is Dubai''s newest and most luxurious hotel, opened in 2023 on the shores of Palm Jumeirah. With groundbreaking architectural design, the hotel instantly became a city icon.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Revolutionary architecture with sky-bridges</li><li>Private pool suites and penthouses</li><li>Restaurants by Jose Andres, Heston Blumenthal, and more</li><li>Cloud 22 rooftop with infinity pools</li><li>AWAY Spa and wellness center</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>The ultimate in Dubai luxury. Perfect for special occasions and those who want the very best Dubai has to offer.</p>"}]'::jsonb,
  'Atlantis The Royal Dubai - EVE BLUE',
  'Dubai''s most luxurious modern hotel with private pool suites, celebrity chef restaurants and revolutionary architecture.',
  '/assets/blog-atlantis-royal.jpg',
  true, 'blog', ARRAY['hotels','luxury','palm-jumeirah'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 21. Atlantis The Palm
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'atlantis-the-palm',
  'Atlantis The Palm — Dubai''s Iconic Resort',
  '[{"type":"text","content":"<h1>Atlantis The Palm</h1><p>Atlantis The Palm is Dubai''s most iconic hotel, located at the tip of Palm Jumeirah with its famous arch. Since opening in 2008, it has become a symbol of the city.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Iconic arch design on Palm Jumeirah</li><li>Aquaventure Waterpark — included for guests</li><li>The Lost Chambers Aquarium</li><li>Nobu, Ossiano, and other world-class restaurants</li><li>Dolphin Bay experiences</li><li>ShuiQi Spa</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>The ultimate family-friendly luxury resort. The combination of waterpark, aquarium, and world-class dining makes it unbeatable for families.</p>"}]'::jsonb,
  'Atlantis The Palm Dubai - EVE BLUE',
  'Dubai''s most iconic resort on Palm Jumeirah with waterpark, giant aquarium and unforgettable family experience.',
  '/assets/blog-atlantis-palm.jpg',
  true, 'blog', ARRAY['hotels','luxury','palm-jumeirah','family'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 22. FIVE Palm Jumeirah
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'five-palm-jumeirah',
  'FIVE Palm Jumeirah — Dubai''s Ultimate Party Hotel',
  '[{"type":"text","content":"<h1>FIVE Palm Jumeirah</h1><p>FIVE Palm Jumeirah is Dubai''s most energetic luxury boutique hotel, located directly on the Palm Jumeirah beach. The hotel is renowned for its famous pool parties and beach events.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Famous pool and beach parties</li><li>Stunning infinity pools</li><li>Direct Palm Jumeirah beach access</li><li>Multiple restaurants and bars</li><li>Young, energetic atmosphere</li><li>Praia and other renowned venues</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>Perfect for younger travelers and party-goers who want luxury with an energetic vibe. The beach and pool parties are legendary.</p>"}]'::jsonb,
  'FIVE Palm Jumeirah Dubai - EVE BLUE',
  'Luxury boutique hotel on the Palm with stunning infinity pools, famous beach parties, and a young energetic vibe.',
  '/assets/blog-five-palm.jpg',
  true, 'blog', ARRAY['hotels','nightlife','palm-jumeirah','party'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 23. Armani Hotel Burj Khalifa
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'armani-hotel-burj-khalifa',
  'Armani Hotel Dubai — Luxury Inside Burj Khalifa',
  '[{"type":"text","content":"<h1>Armani Hotel Dubai</h1><p>Armani Hotel Dubai is an exclusive luxury hotel located on the first floors of Burj Khalifa — the world''s tallest building. The entire hotel was designed by Giorgio Armani.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Located inside Burj Khalifa</li><li>Entirely designed by Giorgio Armani</li><li>Minimalist Italian luxury design</li><li>Multiple Armani restaurants</li><li>Armani/SPA wellness center</li><li>Direct Dubai Mall access</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>For those who appreciate understated Italian luxury and exclusive design. Living inside the world''s tallest building is a unique experience.</p>"}]'::jsonb,
  'Armani Hotel Dubai - EVE BLUE',
  'The only hotel in the world inside the tallest building, entirely designed by Giorgio Armani.',
  '/assets/blog-armani-burj.jpg',
  true, 'blog', ARRAY['hotels','luxury','burj-khalifa','designer'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 24. Address Dubai Marina
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'address-dubai-marina',
  'Address Dubai Marina — Luxury on the Marina',
  '[{"type":"text","content":"<h1>Address Dubai Marina</h1><p>Address Dubai Marina is a luxury hotel from the Address Hotels chain, located in the heart of Dubai Marina with direct views of yachts, marina towers, and the sea.</p>"},{"type":"text","content":"<h2>Highlights</h2><ul><li>Stunning Dubai Marina views</li><li>Rooftop pool and lounge</li><li>Multiple restaurants and bars</li><li>Walking distance to Marina Walk</li><li>Close to JBR beach and tram</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>Perfect location for those who want to be in the heart of Marina''s vibrant dining and entertainment scene with luxury hotel comfort.</p>"}]'::jsonb,
  'Address Dubai Marina - EVE BLUE',
  'Luxury Address hotel with stunning Dubai Marina views, rooftop pools, and perfect location for entertainment.',
  '/assets/blog-marina-gate.jpg',
  true, 'blog', ARRAY['hotels','luxury','marina'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 25. Hot Air Balloon Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'hot-air-balloon-dubai',
  'Hot Air Balloon Dubai — Flight Over the Desert',
  '[{"type":"text","content":"<h1>Hot Air Balloon Dubai — Flight Over the Desert</h1><p>A hot air balloon flight over Dubai''s desert is one of the most thrilling and unique experiences you can have in the Emirates. The flight takes place at sunrise, painting the dunes in shades of gold and orange.</p>"},{"type":"text","content":"<h2>The Experience</h2><ul><li>Early morning pickup from your hotel</li><li>Sunrise flight over the desert dunes</li><li>360-degree panoramic views</li><li>Duration: approximately 1 hour in the air</li><li>Post-flight celebration with refreshments</li><li>Optional falcon show and camel ride</li></ul>"},{"type":"text","content":"<h2>Tips</h2><ul><li>Book in advance — flights often sell out</li><li>Dress in layers — desert mornings can be cool</li><li>Bring a camera with good zoom</li><li>Available October through May (not summer)</li></ul><p>Want to fly? EVE BLUE arranges private balloon experiences with luxury transfers.</p>"}]'::jsonb,
  'Hot Air Balloon Dubai - EVE BLUE',
  'An unforgettable hot air balloon flight over Dubai''s desert dunes at sunrise with breathtaking 360-degree views.',
  '/assets/blog-hot-air-balloon.jpg',
  true, 'blog', ARRAY['attractions','adventure','balloon'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 26. Helicopter Tour Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'helicopter-tour-dubai',
  'Helicopter Tour Dubai — See Dubai from Above',
  '[{"type":"text","content":"<h1>Helicopter Tour Dubai — See Dubai from Above</h1><p>A helicopter tour over Dubai is one of the most impressive experiences you can have in the city. Seeing all of Dubai''s icons from above — Burj Khalifa, Palm Jumeirah, Dubai Marina — is something words can''t describe.</p>"},{"type":"text","content":"<h2>Tour Options</h2><ul><li><strong>Classic Tour (12 min)</strong> — Fly over Atlantis, Palm Jumeirah, and Burj Al Arab</li><li><strong>Extended Tour (22 min)</strong> — Includes Dubai Marina, Burj Khalifa, and World Islands</li><li><strong>Ultimate Tour (40 min)</strong> — Complete Dubai coverage from coast to desert</li></ul>"},{"type":"text","content":"<h2>Tips</h2><ul><li>Wear dark clothing to reduce window reflections</li><li>Morning flights offer best visibility</li><li>Window seats are available on all tours</li><li>Book at least a week in advance for preferred timing</li></ul><p>EVE BLUE arranges private helicopter charters for special occasions.</p>"}]'::jsonb,
  'Helicopter Tour Dubai - EVE BLUE',
  'A breathtaking helicopter flight over Dubai''s icons — Burj Khalifa, the Palm, Marina and more.',
  '/assets/blog-helicopter-dubai.jpg',
  true, 'blog', ARRAY['attractions','adventure','helicopter'], 'standard'
) ON CONFLICT (slug) DO NOTHING;

-- 27. Skydiving Dubai
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, featured_image_url, is_published, category, tags, layout_template)
VALUES (
  'skydiving-dubai',
  'Skydiving Dubai — Adrenaline Over the Palm',
  '[{"type":"text","content":"<h1>Skydiving Dubai — Adrenaline Over the Palm</h1><p>Skydiving over Dubai is the most insane adrenaline experience you can have. Jumping from 13,000 feet above Palm Jumeirah, flying in freefall, and seeing all of Dubai from above — it''s life-changing.</p>"},{"type":"text","content":"<h2>Jump Options</h2><ul><li><strong>Tandem Jump (Palm DZ)</strong> — Jump over Palm Jumeirah, no experience needed</li><li><strong>Tandem Jump (Desert DZ)</strong> — More affordable, stunning desert views</li><li><strong>Solo Jump</strong> — For licensed skydivers only</li><li><strong>Video Package</strong> — Professional cameraman films your entire jump</li></ul>"},{"type":"text","content":"<h2>Requirements</h2><ul><li>Minimum age: 18</li><li>Maximum weight: 100 kg</li><li>No prior experience needed for Tandem</li><li>Good health condition required</li></ul>"},{"type":"text","content":"<h2>Why We Recommend It</h2><p>A life-changing experience everyone should try once. The view from above the Palm is the most impressive in the world. Want to jump? Talk to us and we''ll arrange everything!</p>"}]'::jsonb,
  'Skydiving Dubai - EVE BLUE',
  'Freefall from 13,000 feet above Palm Jumeirah — Dubai''s ultimate adrenaline experience with unrivaled views.',
  '/assets/blog-skydiving-dubai.jpg',
  true, 'blog', ARRAY['attractions','adventure','skydiving'], 'standard'
) ON CONFLICT (slug) DO NOTHING;
