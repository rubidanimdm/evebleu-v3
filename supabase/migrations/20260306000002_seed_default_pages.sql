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
)
ON CONFLICT (slug) DO NOTHING;

-- Privacy Policy
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, is_published, category, layout_template)
VALUES (
  'privacy-policy',
  'Privacy Policy',
  '[
    {
      "type": "text",
      "content": "<h1>Privacy Policy</h1><p>Last updated: March 2026</p><p>EVE BLUE (\"we\", \"us\", or \"our\") operates the evebleu.vip website and mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Information We Collect</h2><ul><li><strong>Account Information</strong> — When you create an account, we collect your name, email address, phone number, and profile preferences.</li><li><strong>Booking Data</strong> — Details of reservations, requests, and concierge interactions.</li><li><strong>Usage Data</strong> — Information about how you access and use the Service, including device type, browser, and pages visited.</li><li><strong>Location Data</strong> — With your permission, we may collect location data to provide location-based recommendations.</li></ul>"
    },
    {
      "type": "text",
      "content": "<h2>How We Use Your Information</h2><ul><li>To provide and maintain our concierge services</li><li>To personalize your experience and recommendations</li><li>To process bookings and reservations on your behalf</li><li>To communicate with you about your requests and updates</li><li>To improve our Service and develop new features</li><li>To comply with legal obligations</li></ul>"
    },
    {
      "type": "text",
      "content": "<h2>Data Sharing</h2><p>We do not sell your personal data. We may share your information with third-party service providers (restaurants, hotels, transport companies) solely to fulfill your booking requests. All partners are contractually obligated to protect your data.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Data Security</h2><p>We use industry-standard encryption and security measures to protect your personal information. Your data is stored securely on cloud infrastructure with regular security audits.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Your Rights</h2><p>You have the right to access, update, or delete your personal data at any time through your profile settings or by contacting us at privacy@evebleu.vip.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Contact Us</h2><p>If you have questions about this Privacy Policy, please contact us at <strong>privacy@evebleu.vip</strong>.</p>"
    }
  ]'::jsonb,
  'Privacy Policy - EVE BLUE',
  'Learn how EVE BLUE collects, uses, and protects your personal information.',
  true,
  'legal',
  'standard'
)
ON CONFLICT (slug) DO NOTHING;

-- Terms of Service
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, is_published, category, layout_template)
VALUES (
  'terms-of-service',
  'Terms of Service',
  '[
    {
      "type": "text",
      "content": "<h1>Terms of Service</h1><p>Last updated: March 2026</p><p>Please read these Terms of Service carefully before using the EVE BLUE platform. By accessing or using our Service, you agree to be bound by these terms.</p>"
    },
    {
      "type": "text",
      "content": "<h2>1. Service Description</h2><p>EVE BLUE provides a luxury concierge platform connecting users with premium dining, hospitality, entertainment, and lifestyle services in Dubai. We act as an intermediary between you and third-party service providers.</p>"
    },
    {
      "type": "text",
      "content": "<h2>2. User Accounts</h2><ul><li>You must be at least 18 years old to create an account.</li><li>You are responsible for maintaining the security of your account credentials.</li><li>You agree to provide accurate and current information.</li><li>We reserve the right to suspend accounts that violate these terms.</li></ul>"
    },
    {
      "type": "text",
      "content": "<h2>3. Bookings & Reservations</h2><p>All bookings are subject to availability and the terms of the respective service provider. EVE BLUE facilitates reservations but is not liable for third-party service quality, cancellations, or changes made by venues.</p>"
    },
    {
      "type": "text",
      "content": "<h2>4. Payments</h2><p>Certain services may require payment. All prices are displayed in the applicable currency and include relevant taxes unless stated otherwise. Refund policies vary by service provider.</p>"
    },
    {
      "type": "text",
      "content": "<h2>5. Intellectual Property</h2><p>All content on the EVE BLUE platform, including text, graphics, logos, and software, is the property of EVE BLUE or its licensors and is protected by intellectual property laws.</p>"
    },
    {
      "type": "text",
      "content": "<h2>6. Limitation of Liability</h2><p>EVE BLUE shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount paid by you in the preceding 12 months.</p>"
    },
    {
      "type": "text",
      "content": "<h2>7. Contact</h2><p>For questions about these Terms, please contact us at <strong>legal@evebleu.vip</strong>.</p>"
    }
  ]'::jsonb,
  'Terms of Service - EVE BLUE',
  'Read the terms and conditions for using the EVE BLUE luxury concierge platform.',
  true,
  'legal',
  'standard'
)
ON CONFLICT (slug) DO NOTHING;

-- Cookie Policy
INSERT INTO pages (slug, title, content_blocks, meta_title, meta_description, is_published, category, layout_template)
VALUES (
  'cookie-policy',
  'Cookie Policy',
  '[
    {
      "type": "text",
      "content": "<h1>Cookie Policy</h1><p>Last updated: March 2026</p><p>This Cookie Policy explains how EVE BLUE uses cookies and similar tracking technologies when you visit our website and mobile application.</p>"
    },
    {
      "type": "text",
      "content": "<h2>What Are Cookies?</h2><p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our platform, and improve your experience.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Types of Cookies We Use</h2><ul><li><strong>Essential Cookies</strong> — Required for the platform to function (authentication, security, session management).</li><li><strong>Preference Cookies</strong> — Remember your language, currency, and display preferences.</li><li><strong>Analytics Cookies</strong> — Help us understand usage patterns to improve the Service.</li><li><strong>Marketing Cookies</strong> — Used to deliver relevant content and measure campaign effectiveness.</li></ul>"
    },
    {
      "type": "text",
      "content": "<h2>Managing Cookies</h2><p>You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies may affect the functionality of our Service.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Third-Party Cookies</h2><p>We use services like Google Analytics and Supabase that may set their own cookies. These are governed by the respective third-party privacy policies.</p>"
    },
    {
      "type": "text",
      "content": "<h2>Contact</h2><p>If you have questions about our use of cookies, please contact us at <strong>privacy@evebleu.vip</strong>.</p>"
    }
  ]'::jsonb,
  'Cookie Policy - EVE BLUE',
  'Learn how EVE BLUE uses cookies and tracking technologies on our platform.',
  true,
  'legal',
  'standard'
)
ON CONFLICT (slug) DO NOTHING;
