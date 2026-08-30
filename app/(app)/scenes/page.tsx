"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { products, scenes } from "@/lib/demo/data";
import { cn } from "@/lib/utils";

export default function ScenesPage() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(scenes[1].id);
  const scene = scenes.find((s) => s.id === active)!;
  // a few catalog products previewed in the active scene
  const previews = products.slice(0, 8);

  const m = {
    tr: {
      title: "Sahneler", sub: "Markana kilitli stüdyo görünümleri. Bir sahne seç, kataloğa uygula.",
      add: "Sahne oluştur", shots: "çekim", surface: "Yüzey", mood: "Hava",
      preview: "kataloğunda", useScene: "Bu sahnede üret", locked: "Markaya kilitli",
    },
    en: {
      title: "Scenes", sub: "On-brand studio looks. Pick a scene and apply it to the catalog.",
      add: "Create scene", shots: "shots", surface: "Surface", mood: "Mood",
      preview: "across your catalog", useScene: "Generate in this scene", locked: "Locked to brand",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">{m.title}</h2>
          <p className="text-sm text-muted-foreground">{m.sub}</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> {m.add}</Button>
      </div>

      {/* Scene preset cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scenes.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)}
            className={cn("group overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop",
              active === s.id ? "border-primary ring-2 ring-primary" : "border-border")}>
            <div className="relative">
              <ShotImage scene={s.kind} hue={s.hue} emoji={s.emoji} className="aspect-[16/9] w-full" />
              {active === s.id && (
                <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow"><Check className="h-4 w-4" /></span>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{s.shots} {m.shots}</span>
            </div>
            <div className="p-4">
              <p className="font-display font-semibold tracking-tight">{s.name}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{t(s.surface)}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><Sparkles className="h-3 w-3 text-primary" />{t(s.mood)}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Active scene applied across the catalog */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              <span className="text-primary">{scene.name}</span> {m.preview}
            </h3>
            <p className="text-sm text-muted-foreground">{t(scene.surface)} · {m.locked}</p>
          </div>
          <Link href="/generate"><Button className="gap-2"><Sparkles className="h-4 w-4" /> {m.useScene}</Button></Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {previews.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-xl ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop">
              <ShotImage scene={scene.kind} hue={scene.hue} emoji={p.emoji} className="aspect-square w-full" />
              <div className="flex items-center justify-between px-2.5 py-2">
                <p className="truncate text-[12px] font-medium">{p.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
