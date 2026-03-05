-- Seed an About Us page with starter content
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, is_published, category, layout_template)
VALUES (
  'about-us',
  'About EVE BLUE',
  '[
    {
      "type": "text",
      "content": "<h1>About EVE BLUE</h1><p>EVE BLUE is your private luxury concierge for Dubai. We handle everything — dining reservations, VIP nightlife access, yacht charters, luxury transportation, and bespoke experiences — so you can enjoy Dubai effortlessly.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Our Mission</h2><p>Information is free. Execution is what we deliver. We believe that the best Dubai experience comes with zero friction. Our AI-powered concierge understands your preferences and executes instantly, while our human team ensures every detail is perfect.</p>"
    },
    {
      "type": "text",
      "content": "<h2>What We Offer</h2><ul><li><strong>AI Concierge</strong> — Available 24/7, fluent in every language, knows Dubai inside out.</li><li><strong>Restaurant Reservations</strong> — From hidden gems to Michelin-starred venues.</li><li><strong>VIP Nightlife</strong> — Tables, guest lists, and exclusive access.</li><li><strong>Yacht Charters</strong> — Sunset cruises, fishing trips, and private events.</li><li><strong>Luxury Transport</strong> — Airport transfers, private drivers, helicopter tours.</li><li><strong>Custom Experiences</strong> — Desert adventures, spa retreats, birthday celebrations.</li></ul>"
    },
    {
      "type": "text",
      "content": "<h2>Concierge. It. Done.</h2><p>Whether you are visiting Dubai for the first time or you are a seasoned resident, EVE BLUE is your single point of contact for everything premium. Just tell us what you need, and we will handle the rest.</p>"
    }
  ]'::jsonb,
  'About EVE BLUE - Your Private Luxury Concierge in Dubai',
  'EVE BLUE is a premium AI-powered luxury concierge service for Dubai. Dining, nightlife, yachts, transport, and bespoke experiences — handled for you.',
  true,
  'about',
  'standard'
);
