"use client";

/**
 * Data layer for the template gallery + generation history.
 * Order: Supabase (if configured and reachable) → localStorage (demo fallback).
 * Components should only import from this file, never from lib/supabase/* directly.
 */
import { createClient } from "@/lib/supabase/client";
import { TEMPLATES_SEED, type SceneTemplateSeed, type TemplateCategory } from "@/lib/templates-seed";
import type { VariationParams } from "@/lib/variations";

const LS_GENERATIONS = "callypso-demo-generations";

/** Never let a slow/unreachable Supabase leave the demo UI hanging. */
function withTimeout<T>(promise: PromiseLike<T>, ms = 4000): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Supabase request timed out")), ms)),
  ]);
}

export interface GenerationRecord {
  id: string;
  template_id: string;
  prompt: string;
  variation_params: VariationParams;
  image_url: string;
  status: "done" | "error";
  created_at: string;
}

export async function listTemplates(): Promise<SceneTemplateSeed[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout(supabase.from("scene_templates").select("*").order("category"));
      if (!error && data && data.length > 0) {
        return data.map((r: { id: string; name: string; category: TemplateCategory; base_prompt: string; thumbnail?: string | null }) => ({
          id: r.id, name: r.name, category: r.category, basePrompt: r.base_prompt, thumbnail: r.thumbnail ?? undefined,
        }));
      }
    } catch {
      // network/config error — fall through to the bundled seed
    }
  }
  return TEMPLATES_SEED;
}

export async function listGenerations(templateId?: string): Promise<GenerationRecord[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      let query = supabase.from("generations").select("*").order("created_at", { ascending: false });
      if (templateId) query = query.eq("template_id", templateId);
      const { data, error } = await withTimeout(query);
      if (!error && data) return data as GenerationRecord[];
    } catch {
      // fall through
    }
  }
  const local = readLocalGenerations();
  return templateId ? local.filter((g) => g.template_id === templateId) : local;
}

export async function saveGeneration(rec: Omit<GenerationRecord, "id" | "created_at">): Promise<GenerationRecord> {
  const full: GenerationRecord = {
    ...rec,
    id: `g${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    created_at: new Date().toISOString(),
  };
  const supabase = createClient();
  if (supabase) {
    try {
      const { error } = await withTimeout(supabase.from("generations").insert(full));
      if (!error) return full;
    } catch {
      // fall through to localStorage
    }
  }
  const all = readLocalGenerations();
  all.unshift(full);
  writeLocalGenerations(all);
  return full;
}

export function resetDemoData() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_GENERATIONS);
  } catch {
    // ignore
  }
}

function readLocalGenerations(): GenerationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_GENERATIONS);
    return raw ? (JSON.parse(raw) as GenerationRecord[]) : [];
  } catch {
    return [];
  }
}

function writeLocalGenerations(list: GenerationRecord[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_GENERATIONS, JSON.stringify(list));
  } catch {
    // storage unavailable — memory-only for this session
  }
}
