# Callypso Studio

**AI Creative Studio for E-commerce.** Turn one product photo into
sales-ready creatives — on-brand lifestyle scenes, crisp white backgrounds
and campaign heroes — with Product Lock keeping your logo, text, color,
shape and packaging untouched.

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000  (demo mode, no keys needed)
```

## MVP flow

Product Upload → Product Lock / Background Removal → Brand Profile → Scene
Template → Generate 4 Variations → Approve → Export.

Ready-made use cases: Studio, Lifestyle, Instagram, Meta Ads, E-commerce.
Export ratios: 1:1, 4:5, 9:16.

## Make it yours

Open this folder in **Claude Code** and say **"set up this project"** (or run
**`/setup`**). It asks for your brand, logo, colors, and your **fal.ai** key,
then wires them in. By hand? See [`SETUP.md`](./SETUP.md).

## What it needs (all optional — demo mode works with none)

| Integration | Powers |
|---|---|
| **fal.ai** (`FAL_KEY`) | Product creatives, lifestyle scenes & clean cut-outs |
| **Supabase** | Stores products, brand profiles, locked templates & generated creatives |

> Shopify/ikas product sync and Meta Ads push are on the roadmap and are
> intentionally **not** built in this first phase — approved creatives are
> exported instead (see `TODO(real integration)` comments in the code).

## Pages

`Dashboard` (overview & activity) · `Products` (catalog) · `Generate`
(product lock, scene template, 4 variations, approve, export) · `Scenes`
(scene templates & template lock) · `Settings` (Brand Profile & integrations).

Built on the GoatStarter template — Next.js 16 · React 19 · Tailwind v4.
Turkish and English are both fully supported (live toggle in the navbar).
