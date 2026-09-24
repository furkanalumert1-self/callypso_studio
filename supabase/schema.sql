-- Callypso Studio — Supabase schema for scene templates + generation history.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).
-- Demo-mode policies below allow anon select/insert; tighten before real production use.

create extension if not exists pgcrypto;

-- ── Scene templates (the template gallery) ─────────────────────────────────
create table if not exists scene_templates (
  id text primary key,
  name text not null,
  category text not null,
  base_prompt text not null,
  thumbnail text,
  default_variations jsonb,
  created_at timestamptz not null default now()
);

alter table scene_templates enable row level security;

drop policy if exists "scene_templates_select_anon" on scene_templates;
create policy "scene_templates_select_anon"
  on scene_templates for select
  to anon, authenticated
  using (true);

-- ── Generations (one row per generated image) ──────────────────────────────
create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  template_id text references scene_templates(id) on delete set null,
  prompt text not null,
  variation_params jsonb,
  image_url text,
  status text not null default 'done' check (status in ('pending', 'done', 'error')),
  created_at timestamptz not null default now()
);

alter table generations enable row level security;

drop policy if exists "generations_select_anon" on generations;
create policy "generations_select_anon"
  on generations for select
  to anon, authenticated
  using (true);

drop policy if exists "generations_insert_anon" on generations;
create policy "generations_insert_anon"
  on generations for insert
  to anon, authenticated
  with check (true);

-- ── Seed data: 68 scene templates across 13 categories (E-commerce first) ──
insert into scene_templates (id, name, category, base_prompt, thumbnail, default_variations) values
  ('ecom-marketplace-white', 'Marketplace White BG', 'E-commerce', 'product on a pure white background, centered, no shadow, meets Amazon/Etsy/Trendyol listing requirements', 'https://v3b.fal.media/files/b/0aabc155/3SVZ3l5RHBtyEOktAAnNY.jpg', null),
  ('ecom-pdp-hero-banner', 'PDP Hero Banner', 'E-commerce', 'wide lifestyle hero banner of the product for a product detail page, cinematic lighting', 'https://v3b.fal.media/files/b/0aabc155/H3x_z4CmPljRSiefhPBTQ.jpg', null),
  ('ecom-instagram-grid', 'Instagram Grid Square', 'E-commerce', 'product styled for an Instagram feed post, square crop, on-trend aesthetic, soft natural light', 'https://v3b.fal.media/files/b/0aabc155/N24MVEWjaOxBVQUuqG5Ww.jpg', null),
  ('ecom-meta-ads-carousel', 'Meta Ads Carousel', 'E-commerce', 'bold, colorful ad-style scene for the product with clear negative space for ad copy overlay', 'https://v3b.fal.media/files/b/0aabc155/07nvyuLWcymER6tJ9F20k.jpg', null),
  ('ecom-unboxing', 'Unboxing Moment', 'E-commerce', 'hands opening the product''s package, excited unboxing moment, warm natural light', 'https://v3b.fal.media/files/b/0aabc155/SlejNTvLc2sSDlS0qBKMA.jpg', null),
  ('ecom-bundle-flatlay', 'Bundle Kit Flat Lay', 'E-commerce', 'overhead flat lay of the product bundled with matching accessories, neatly arranged', 'https://v3b.fal.media/files/b/0aabc155/bHGyb1rrC9zVT4OUYA4zF.jpg', null),
  ('ecom-size-comparison', 'Size Comparison', 'E-commerce', 'product placed next to a common everyday object for a clear sense of scale', 'https://v3b.fal.media/files/b/0aabc155/tFli3DhlAjLUOu_kVQj9X.jpg', null),
  ('ecom-before-after', 'Before / After Split', 'E-commerce', 'split-screen before and after comparison showing the product''s result or use', 'https://v3b.fal.media/files/b/0aabc155/lDswe6mBinkwscW6xiWHi.jpg', null),
  ('ecom-ghost-mannequin', 'Ghost Mannequin', 'E-commerce', 'apparel product shot with an invisible ghost-mannequin effect, clean studio background', 'https://v3b.fal.media/files/b/0aabc155/IVvO35Q4k1sYgNmcL1-ag.jpg', null),
  ('ecom-360-turntable', '360° Turntable Hero', 'E-commerce', 'product on a rotating turntable, three-quarter hero angle, studio lighting', 'https://v3b.fal.media/files/b/0aabc155/dlfVd32q4opXzqtXKJcYS.jpg', null),
  ('ecom-gift-wrapped', 'Gift Wrapped', 'E-commerce', 'product wrapped as a gift with ribbon and a small gift tag, soft festive light', 'https://v3b.fal.media/files/b/0aabc155/xHNSjZXfja8ebLYCmhEbg.jpg', null),
  ('ecom-subscription-box', 'Subscription Box Reveal', 'E-commerce', 'opened subscription box with the product nestled inside tissue paper', 'https://v3b.fal.media/files/b/0aabc155/1U9VQoIsuhuQZHucFopDm.jpg', null),
  ('ecom-ingredient-flatlay', 'Ingredient / Material Flat Lay', 'E-commerce', 'product surrounded by its raw ingredients or materials, overhead flat lay', 'https://v3b.fal.media/files/b/0aabc156/MpaZqwHN6Jlx7x4d0NdWm.jpg', null),
  ('ecom-on-the-go', 'On-the-Go Lifestyle', 'E-commerce', 'product being carried or used outdoors as part of a daily on-the-go lifestyle', 'https://v3b.fal.media/files/b/0aabc156/Mco33c96e-U-3_sEEHAod.jpg', null),
  ('ecom-home-office', 'Home Office Desk', 'E-commerce', 'product styled on a tidy home-office desk setup, soft daylight', 'https://v3b.fal.media/files/b/0aabc156/TS5vDGLoeMKMDN10wXzWN.jpg', null),
  ('ecom-sale-badge', 'Discount Sale Campaign', 'E-commerce', 'bold sale campaign scene for the product with dramatic accent color and copy space for a discount badge', 'https://v3b.fal.media/files/b/0aabc156/W1-jMHVKxQYV-0Qk6hYIN.jpg', null),
  ('ecom-new-arrival', 'New Arrival Spotlight', 'E-commerce', 'clean spotlight scene introducing the product as a new arrival, single dramatic light source', 'https://v3b.fal.media/files/b/0aabc156/Wo4QmYMbv1MPpNg7p3cg6.jpg', null),
  ('ecom-influencer-flatlay', 'Influencer Style Flat Lay', 'E-commerce', 'trendy influencer-style flat lay of the product with coffee, phone and lifestyle props', 'https://v3b.fal.media/files/b/0aabc156/hGevTPL4KaPCn8UsseXWn.jpg', null),
  ('ecom-valentines', 'Valentine''s Gift Scene', 'E-commerce', 'romantic Valentine''s Day gifting scene for the product in soft red and pink tones', 'https://v3b.fal.media/files/b/0aabc156/J8XfZVR2qRbJbN-jYjOmz.jpg', null),
  ('ecom-back-to-school', 'Back to School Scene', 'E-commerce', 'bright, energetic back-to-school campaign scene for the product', 'https://v3b.fal.media/files/b/0aabc156/vHjDusHOgR-POd9I1eHEf.jpg', null),
  ('prod-white-sweep', 'White Sweep Studio', 'Product', 'product on an infinity white sweep background, no shadow, clean marketplace listing shot', null, null),
  ('prod-marble', 'Marble Pedestal', 'Product', 'product on a polished marble pedestal with soft reflection', null, null),
  ('prod-floating', 'Floating Product', 'Product', 'product levitating with a soft drop shadow on a gradient backdrop', null, null),
  ('prod-macro-texture', 'Macro Texture Detail', 'Product', 'extreme close-up of the product surface texture and material detail', null, null),
  ('corp-boardroom', 'Boardroom Meeting', 'Office/Corporate', 'professionals around a glass boardroom table in a modern office', null, null),
  ('corp-desk-hero', 'Executive Desk Hero', 'Office/Corporate', 'product or laptop on a clean executive desk with city skyline window', null, null),
  ('corp-teamwork', 'Open-Plan Teamwork', 'Office/Corporate', 'team collaborating at a shared desk in a bright open-plan office', null, null),
  ('corp-handshake', 'Handshake Close-Up', 'Office/Corporate', 'close-up business handshake in a corporate lobby', null, null),
  ('cc-headset-agent', 'Headset Agent', 'Call Center', 'customer support agent wearing a headset at a modern workstation', null, null),
  ('cc-floor-wide', 'Call Floor Wide Shot', 'Call Center', 'wide shot of a busy call center floor with agents at desks', null, null),
  ('cc-dashboard-screen', 'Support Dashboard Screen', 'Call Center', 'close-up of a support dashboard on a monitor, agent blurred in background', null, null),
  ('cc-team-huddle', 'Team Huddle', 'Call Center', 'support team huddled around a supervisor reviewing metrics', null, null),
  ('sp-headshot', 'Classic Headshot', 'Studio Portrait', 'professional headshot portrait against a seamless studio backdrop', null, null),
  ('sp-half-body', 'Half-Body Portrait', 'Studio Portrait', 'half-body studio portrait with soft rembrandt lighting', null, null),
  ('sp-editorial', 'Editorial Portrait', 'Studio Portrait', 'editorial-style studio portrait with bold shadow play', null, null),
  ('sp-group', 'Team Group Portrait', 'Studio Portrait', 'small group studio portrait, even lighting, seamless backdrop', null, null),
  ('life-cafe-table', 'Café Table Moment', 'Lifestyle', 'product on a sunlit café table with a coffee cup nearby', null, null),
  ('life-home-cozy', 'Cozy Home Corner', 'Lifestyle', 'product styled in a cozy living-room corner with a throw blanket', null, null),
  ('life-hand-holding', 'In-Hand Lifestyle', 'Lifestyle', 'product held in someone''s hand in a natural everyday setting', null, null),
  ('life-morning-routine', 'Morning Routine', 'Lifestyle', 'product as part of a relaxed morning routine scene, warm light', null, null),
  ('out-golden-hour', 'Golden Hour Terrace', 'Outdoor', 'product on a sunlit outdoor terrace at golden hour', null, null),
  ('out-urban-street', 'Urban Street Scene', 'Outdoor', 'product against an urban street backdrop with soft bokeh', null, null),
  ('out-nature-picnic', 'Nature Picnic', 'Outdoor', 'product styled in a nature picnic setting with linen and greenery', null, null),
  ('out-beach', 'Beach Sunset', 'Outdoor', 'product on sand with a soft beach sunset in the background', null, null),
  ('tech-neon-grid', 'Neon Grid Backdrop', 'Tech/Futuristic', 'product on a glowing neon grid surface with glass reflections', null, null),
  ('tech-holographic', 'Holographic Display', 'Tech/Futuristic', 'product with a holographic UI overlay floating beside it', null, null),
  ('tech-server-room', 'Server Room Ambience', 'Tech/Futuristic', 'product against a blurred server room background with blue light', null, null),
  ('tech-circuit-macro', 'Circuit Macro', 'Tech/Futuristic', 'macro shot of glowing circuit-board patterns behind the product', null, null),
  ('retail-shelf', 'Retail Shelf Display', 'Retail', 'product displayed on a retail store shelf among similar items', null, null),
  ('retail-window', 'Storefront Window', 'Retail', 'product staged in a boutique storefront window display', null, null),
  ('retail-checkout', 'Checkout Counter', 'Retail', 'product near a modern checkout counter with soft ambient light', null, null),
  ('retail-mannequin', 'Mannequin Styling', 'Retail', 'product styled on or beside a retail mannequin display', null, null),
  ('health-clinic-clean', 'Clean Clinic Counter', 'Healthcare', 'product on a clean clinical counter with soft white light', null, null),
  ('health-professional', 'Healthcare Professional', 'Healthcare', 'healthcare professional in scrubs holding or near the product', null, null),
  ('health-wellness', 'Wellness Studio', 'Healthcare', 'product styled in a calm wellness studio with plants and linen', null, null),
  ('health-lab', 'Lab Bench', 'Healthcare', 'product on a laboratory bench with soft scientific lighting', null, null),
  ('food-flatlay', 'Food Flat Lay', 'Food', 'overhead flat lay of the product with garnish and props', null, null),
  ('food-plated', 'Plated Hero Shot', 'Food', 'beautifully plated hero shot with shallow depth of field', null, null),
  ('food-rustic-table', 'Rustic Wood Table', 'Food', 'product on a rustic wooden table with warm natural light', null, null),
  ('food-steam-action', 'Steam Action Shot', 'Food', 'product with visible steam rising, dramatic side lighting', null, null),
  ('re-living-room', 'Bright Living Room', 'Real Estate', 'product staged in a bright, modern living room interior', null, null),
  ('re-kitchen-island', 'Kitchen Island', 'Real Estate', 'product on a marble kitchen island in a modern home', null, null),
  ('re-exterior-facade', 'Exterior Facade', 'Real Estate', 'product composited against a modern house exterior facade', null, null),
  ('re-balcony-view', 'Balcony City View', 'Real Estate', 'product on a balcony table with a city skyline view behind it', null, null),
  ('season-winter-gift', 'Winter Gifting', 'Seasonal/Holiday', 'product styled as a winter holiday gift with pine and string lights', null, null),
  ('season-summer-bright', 'Bright Summer Scene', 'Seasonal/Holiday', 'product in a bright, colorful summer seasonal scene', null, null),
  ('season-autumn-cozy', 'Cozy Autumn Scene', 'Seasonal/Holiday', 'product styled with autumn leaves and warm cozy tones', null, null),
  ('season-blackfriday', 'Black Friday Campaign', 'Seasonal/Holiday', 'product in a bold Black Friday campaign scene with dramatic accent color', null, null)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  base_prompt = excluded.base_prompt,
  thumbnail = excluded.thumbnail;
