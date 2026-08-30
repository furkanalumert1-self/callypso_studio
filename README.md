# Pixmint

**Studio-grade product photos, generated on demand.** Pixmint turns a single
phone snap into a full set of on-brand product shots — lifestyle scenes, crisp
white backgrounds and campaign heroes — synced straight to your Shopify store.

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000  (demo mode, no keys needed)
```

## Make it yours

Open this folder in **Claude Code** and say **"set up this project"** (or run
**`/setup`**). It asks for your brand, logo, colors, and your **fal.ai** +
**Shopify** keys, then wires them in. By hand? See [`SETUP.md`](./SETUP.md).

## What it needs (all optional — demo mode works with none)

| Integration | Powers |
|---|---|
| **fal.ai** (`FAL_KEY`) | Product shots, lifestyle scenes & clean cut-outs |
| **Shopify** (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_ACCESS_TOKEN`) | Product sync & pushing shots to your store |
| **Supabase** | Stores products, brand kits & generated shots |

## Pages

`Shots` (gallery & activity) · `Products` (synced catalog) · `Generate` (AI shot
generator) · `Brand` (palette & scene presets) · `Settings`.

Built on the GoatStarter template — Next.js 16 · React 19 · Tailwind v4.
