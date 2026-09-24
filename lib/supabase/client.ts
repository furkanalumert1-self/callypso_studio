"use client";

import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client. Returns null when unconfigured (demo mode). */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}
