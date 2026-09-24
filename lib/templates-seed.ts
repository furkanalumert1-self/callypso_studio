export type TemplateCategory =
  | "E-commerce" | "Product" | "Office/Corporate" | "Call Center" | "Studio Portrait" | "Lifestyle" | "Outdoor"
  | "Tech/Futuristic" | "Retail" | "Healthcare" | "Food" | "Real Estate" | "Seasonal/Holiday";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "E-commerce", "Product", "Office/Corporate", "Call Center", "Studio Portrait", "Lifestyle", "Outdoor",
  "Tech/Futuristic", "Retail", "Healthcare", "Food", "Real Estate", "Seasonal/Holiday",
];

export interface SceneTemplateSeed {
  id: string;
  name: string;
  category: TemplateCategory;
  basePrompt: string;
  /** fal.ai-generated style preview, shown as the template card's thumbnail. */
  thumbnail?: string;
}

/** 68 scene templates across 13 categories (led by a dedicated E-commerce set).
 *  Mirrored into supabase/schema.sql as seed data and used as the localStorage
 *  fallback when Supabase isn't configured. */
export const TEMPLATES_SEED: SceneTemplateSeed[] = [
  // E-commerce — the core set for online store listings, ads and campaigns
  { id: "ecom-marketplace-white", name: "Marketplace White BG", category: "E-commerce", basePrompt: "product on a pure white background, centered, no shadow, meets Amazon/Etsy/Trendyol listing requirements", thumbnail: "https://v3b.fal.media/files/b/0aabc155/3SVZ3l5RHBtyEOktAAnNY.jpg" },
  { id: "ecom-pdp-hero-banner", name: "PDP Hero Banner", category: "E-commerce", basePrompt: "wide lifestyle hero banner of the product for a product detail page, cinematic lighting", thumbnail: "https://v3b.fal.media/files/b/0aabc155/H3x_z4CmPljRSiefhPBTQ.jpg" },
  { id: "ecom-instagram-grid", name: "Instagram Grid Square", category: "E-commerce", basePrompt: "product styled for an Instagram feed post, square crop, on-trend aesthetic, soft natural light", thumbnail: "https://v3b.fal.media/files/b/0aabc155/N24MVEWjaOxBVQUuqG5Ww.jpg" },
  { id: "ecom-meta-ads-carousel", name: "Meta Ads Carousel", category: "E-commerce", basePrompt: "bold, colorful ad-style scene for the product with clear negative space for ad copy overlay", thumbnail: "https://v3b.fal.media/files/b/0aabc155/07nvyuLWcymER6tJ9F20k.jpg" },
  { id: "ecom-unboxing", name: "Unboxing Moment", category: "E-commerce", basePrompt: "hands opening the product's package, excited unboxing moment, warm natural light", thumbnail: "https://v3b.fal.media/files/b/0aabc155/SlejNTvLc2sSDlS0qBKMA.jpg" },
  { id: "ecom-bundle-flatlay", name: "Bundle Kit Flat Lay", category: "E-commerce", basePrompt: "overhead flat lay of the product bundled with matching accessories, neatly arranged", thumbnail: "https://v3b.fal.media/files/b/0aabc155/bHGyb1rrC9zVT4OUYA4zF.jpg" },
  { id: "ecom-size-comparison", name: "Size Comparison", category: "E-commerce", basePrompt: "product placed next to a common everyday object for a clear sense of scale", thumbnail: "https://v3b.fal.media/files/b/0aabc155/tFli3DhlAjLUOu_kVQj9X.jpg" },
  { id: "ecom-before-after", name: "Before / After Split", category: "E-commerce", basePrompt: "split-screen before and after comparison showing the product's result or use", thumbnail: "https://v3b.fal.media/files/b/0aabc155/lDswe6mBinkwscW6xiWHi.jpg" },
  { id: "ecom-ghost-mannequin", name: "Ghost Mannequin", category: "E-commerce", basePrompt: "apparel product shot with an invisible ghost-mannequin effect, clean studio background", thumbnail: "https://v3b.fal.media/files/b/0aabc155/IVvO35Q4k1sYgNmcL1-ag.jpg" },
  { id: "ecom-360-turntable", name: "360° Turntable Hero", category: "E-commerce", basePrompt: "product on a rotating turntable, three-quarter hero angle, studio lighting", thumbnail: "https://v3b.fal.media/files/b/0aabc155/dlfVd32q4opXzqtXKJcYS.jpg" },
  { id: "ecom-gift-wrapped", name: "Gift Wrapped", category: "E-commerce", basePrompt: "product wrapped as a gift with ribbon and a small gift tag, soft festive light", thumbnail: "https://v3b.fal.media/files/b/0aabc155/xHNSjZXfja8ebLYCmhEbg.jpg" },
  { id: "ecom-subscription-box", name: "Subscription Box Reveal", category: "E-commerce", basePrompt: "opened subscription box with the product nestled inside tissue paper", thumbnail: "https://v3b.fal.media/files/b/0aabc155/1U9VQoIsuhuQZHucFopDm.jpg" },
  { id: "ecom-ingredient-flatlay", name: "Ingredient / Material Flat Lay", category: "E-commerce", basePrompt: "product surrounded by its raw ingredients or materials, overhead flat lay", thumbnail: "https://v3b.fal.media/files/b/0aabc156/MpaZqwHN6Jlx7x4d0NdWm.jpg" },
  { id: "ecom-on-the-go", name: "On-the-Go Lifestyle", category: "E-commerce", basePrompt: "product being carried or used outdoors as part of a daily on-the-go lifestyle", thumbnail: "https://v3b.fal.media/files/b/0aabc156/Mco33c96e-U-3_sEEHAod.jpg" },
  { id: "ecom-home-office", name: "Home Office Desk", category: "E-commerce", basePrompt: "product styled on a tidy home-office desk setup, soft daylight", thumbnail: "https://v3b.fal.media/files/b/0aabc156/TS5vDGLoeMKMDN10wXzWN.jpg" },
  { id: "ecom-sale-badge", name: "Discount Sale Campaign", category: "E-commerce", basePrompt: "bold sale campaign scene for the product with dramatic accent color and copy space for a discount badge", thumbnail: "https://v3b.fal.media/files/b/0aabc156/W1-jMHVKxQYV-0Qk6hYIN.jpg" },
  { id: "ecom-new-arrival", name: "New Arrival Spotlight", category: "E-commerce", basePrompt: "clean spotlight scene introducing the product as a new arrival, single dramatic light source", thumbnail: "https://v3b.fal.media/files/b/0aabc156/Wo4QmYMbv1MPpNg7p3cg6.jpg" },
  { id: "ecom-influencer-flatlay", name: "Influencer Style Flat Lay", category: "E-commerce", basePrompt: "trendy influencer-style flat lay of the product with coffee, phone and lifestyle props", thumbnail: "https://v3b.fal.media/files/b/0aabc156/hGevTPL4KaPCn8UsseXWn.jpg" },
  { id: "ecom-valentines", name: "Valentine's Gift Scene", category: "E-commerce", basePrompt: "romantic Valentine's Day gifting scene for the product in soft red and pink tones", thumbnail: "https://v3b.fal.media/files/b/0aabc156/J8XfZVR2qRbJbN-jYjOmz.jpg" },
  { id: "ecom-back-to-school", name: "Back to School Scene", category: "E-commerce", basePrompt: "bright, energetic back-to-school campaign scene for the product", thumbnail: "https://v3b.fal.media/files/b/0aabc156/vHjDusHOgR-POd9I1eHEf.jpg" },
  // Product
  { id: "prod-white-sweep", name: "White Sweep Studio", category: "Product", basePrompt: "product on an infinity white sweep background, no shadow, clean marketplace listing shot" },
  { id: "prod-marble", name: "Marble Pedestal", category: "Product", basePrompt: "product on a polished marble pedestal with soft reflection" },
  { id: "prod-floating", name: "Floating Product", category: "Product", basePrompt: "product levitating with a soft drop shadow on a gradient backdrop" },
  { id: "prod-macro-texture", name: "Macro Texture Detail", category: "Product", basePrompt: "extreme close-up of the product surface texture and material detail" },
  // Office/Corporate
  { id: "corp-boardroom", name: "Boardroom Meeting", category: "Office/Corporate", basePrompt: "professionals around a glass boardroom table in a modern office" },
  { id: "corp-desk-hero", name: "Executive Desk Hero", category: "Office/Corporate", basePrompt: "product or laptop on a clean executive desk with city skyline window" },
  { id: "corp-teamwork", name: "Open-Plan Teamwork", category: "Office/Corporate", basePrompt: "team collaborating at a shared desk in a bright open-plan office" },
  { id: "corp-handshake", name: "Handshake Close-Up", category: "Office/Corporate", basePrompt: "close-up business handshake in a corporate lobby" },
  // Call Center
  { id: "cc-headset-agent", name: "Headset Agent", category: "Call Center", basePrompt: "customer support agent wearing a headset at a modern workstation" },
  { id: "cc-floor-wide", name: "Call Floor Wide Shot", category: "Call Center", basePrompt: "wide shot of a busy call center floor with agents at desks" },
  { id: "cc-dashboard-screen", name: "Support Dashboard Screen", category: "Call Center", basePrompt: "close-up of a support dashboard on a monitor, agent blurred in background" },
  { id: "cc-team-huddle", name: "Team Huddle", category: "Call Center", basePrompt: "support team huddled around a supervisor reviewing metrics" },
  // Studio Portrait
  { id: "sp-headshot", name: "Classic Headshot", category: "Studio Portrait", basePrompt: "professional headshot portrait against a seamless studio backdrop" },
  { id: "sp-half-body", name: "Half-Body Portrait", category: "Studio Portrait", basePrompt: "half-body studio portrait with soft rembrandt lighting" },
  { id: "sp-editorial", name: "Editorial Portrait", category: "Studio Portrait", basePrompt: "editorial-style studio portrait with bold shadow play" },
  { id: "sp-group", name: "Team Group Portrait", category: "Studio Portrait", basePrompt: "small group studio portrait, even lighting, seamless backdrop" },
  // Lifestyle
  { id: "life-cafe-table", name: "Café Table Moment", category: "Lifestyle", basePrompt: "product on a sunlit café table with a coffee cup nearby" },
  { id: "life-home-cozy", name: "Cozy Home Corner", category: "Lifestyle", basePrompt: "product styled in a cozy living-room corner with a throw blanket" },
  { id: "life-hand-holding", name: "In-Hand Lifestyle", category: "Lifestyle", basePrompt: "product held in someone's hand in a natural everyday setting" },
  { id: "life-morning-routine", name: "Morning Routine", category: "Lifestyle", basePrompt: "product as part of a relaxed morning routine scene, warm light" },
  // Outdoor
  { id: "out-golden-hour", name: "Golden Hour Terrace", category: "Outdoor", basePrompt: "product on a sunlit outdoor terrace at golden hour" },
  { id: "out-urban-street", name: "Urban Street Scene", category: "Outdoor", basePrompt: "product against an urban street backdrop with soft bokeh" },
  { id: "out-nature-picnic", name: "Nature Picnic", category: "Outdoor", basePrompt: "product styled in a nature picnic setting with linen and greenery" },
  { id: "out-beach", name: "Beach Sunset", category: "Outdoor", basePrompt: "product on sand with a soft beach sunset in the background" },
  // Tech/Futuristic
  { id: "tech-neon-grid", name: "Neon Grid Backdrop", category: "Tech/Futuristic", basePrompt: "product on a glowing neon grid surface with glass reflections" },
  { id: "tech-holographic", name: "Holographic Display", category: "Tech/Futuristic", basePrompt: "product with a holographic UI overlay floating beside it" },
  { id: "tech-server-room", name: "Server Room Ambience", category: "Tech/Futuristic", basePrompt: "product against a blurred server room background with blue light" },
  { id: "tech-circuit-macro", name: "Circuit Macro", category: "Tech/Futuristic", basePrompt: "macro shot of glowing circuit-board patterns behind the product" },
  // Retail
  { id: "retail-shelf", name: "Retail Shelf Display", category: "Retail", basePrompt: "product displayed on a retail store shelf among similar items" },
  { id: "retail-window", name: "Storefront Window", category: "Retail", basePrompt: "product staged in a boutique storefront window display" },
  { id: "retail-checkout", name: "Checkout Counter", category: "Retail", basePrompt: "product near a modern checkout counter with soft ambient light" },
  { id: "retail-mannequin", name: "Mannequin Styling", category: "Retail", basePrompt: "product styled on or beside a retail mannequin display" },
  // Healthcare
  { id: "health-clinic-clean", name: "Clean Clinic Counter", category: "Healthcare", basePrompt: "product on a clean clinical counter with soft white light" },
  { id: "health-professional", name: "Healthcare Professional", category: "Healthcare", basePrompt: "healthcare professional in scrubs holding or near the product" },
  { id: "health-wellness", name: "Wellness Studio", category: "Healthcare", basePrompt: "product styled in a calm wellness studio with plants and linen" },
  { id: "health-lab", name: "Lab Bench", category: "Healthcare", basePrompt: "product on a laboratory bench with soft scientific lighting" },
  // Food
  { id: "food-flatlay", name: "Food Flat Lay", category: "Food", basePrompt: "overhead flat lay of the product with garnish and props" },
  { id: "food-plated", name: "Plated Hero Shot", category: "Food", basePrompt: "beautifully plated hero shot with shallow depth of field" },
  { id: "food-rustic-table", name: "Rustic Wood Table", category: "Food", basePrompt: "product on a rustic wooden table with warm natural light" },
  { id: "food-steam-action", name: "Steam Action Shot", category: "Food", basePrompt: "product with visible steam rising, dramatic side lighting" },
  // Real Estate
  { id: "re-living-room", name: "Bright Living Room", category: "Real Estate", basePrompt: "product staged in a bright, modern living room interior" },
  { id: "re-kitchen-island", name: "Kitchen Island", category: "Real Estate", basePrompt: "product on a marble kitchen island in a modern home" },
  { id: "re-exterior-facade", name: "Exterior Facade", category: "Real Estate", basePrompt: "product composited against a modern house exterior facade" },
  { id: "re-balcony-view", name: "Balcony City View", category: "Real Estate", basePrompt: "product on a balcony table with a city skyline view behind it" },
  // Seasonal/Holiday
  { id: "season-winter-gift", name: "Winter Gifting", category: "Seasonal/Holiday", basePrompt: "product styled as a winter holiday gift with pine and string lights" },
  { id: "season-summer-bright", name: "Bright Summer Scene", category: "Seasonal/Holiday", basePrompt: "product in a bright, colorful summer seasonal scene" },
  { id: "season-autumn-cozy", name: "Cozy Autumn Scene", category: "Seasonal/Holiday", basePrompt: "product styled with autumn leaves and warm cozy tones" },
  { id: "season-blackfriday", name: "Black Friday Campaign", category: "Seasonal/Holiday", basePrompt: "product in a bold Black Friday campaign scene with dramatic accent color" },
];
