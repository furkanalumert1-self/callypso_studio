/** True when the app should render/write demo data instead of failing on missing backends. */
export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export function hasSupabase(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
