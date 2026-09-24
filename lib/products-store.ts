"use client";

/** Client-only store for products added in demo mode (photo + title), merged
 * with the static catalog from lib/demo/data.ts. localStorage-backed so
 * Products and Generate both see the same catalog without a backend. */
import { products as SEED_PRODUCTS, type Product } from "@/lib/demo/data";

const LS_KEY = "callypso-demo-products";

export function listProducts(): Product[] {
  return [...readLocal(), ...SEED_PRODUCTS];
}

export function addProduct(input: { title: string; photo: string }): Product {
  const id = `p${Date.now()}`;
  const product: Product = {
    id,
    title: input.title,
    sku: `SKU-${id.slice(-6)}`,
    price: 0,
    emoji: "🆕",
    hue: "200",
    shots: 0,
    synced: false,
    photo: input.photo,
  };
  const all = readLocal();
  all.unshift(product);
  writeLocal(all);
  return product;
}

export function resetLocalProducts() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}

function readLocal(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: Product[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable — memory-only for this session
  }
}
