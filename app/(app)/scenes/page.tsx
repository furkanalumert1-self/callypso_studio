"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Sparkles, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { products, scenes, useCases, useCaseLabels, type UseCase } from "@/lib/demo/data";
import { cn } from "@/lib/utils";

export default function ScenesPage() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(scenes[1].id);
  const [lockedIds, setLockedIds] = useState<string[]>(scenes.filter((s) => s.locked).map((s) => s.id));
  const [useCaseFilter, setUseCaseFilter] = useState<UseCase | "all">("all");
  const scene = scenes.find((s) => s.id === active)!;
  const shown = scenes.filter((s) => useCaseFilter === "all" || s.useCases.includes(useCaseFilter));
  // a few catalog products previewed in the active scene
  const previews = products.slice(0, 8);
  const isLocked = lockedIds.includes(scene.id);

  function toggleLock(id: string) {
    setLockedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const m = {
    tr: {
      title: "Sahne Şablonları", sub: "Markana kilitli sahne/ışık/kompozisyon şablonları. Beğendiğini kilitle, sonraki ürünlerinde tekrar kullan.",
      add: "Şablon oluştur", shots: "çekim", surface: "Yüzey", mood: "Hava", all: "Tümü",
      preview: "kataloğunda", useScene: "Bu şablonda üret", locked: "Markaya kilitli",
      lockTemplate: "Şablonu kilitle", unlockTemplate: "Kilidi kaldır", templateLocked: "Kilitli",
    },
    en: {
      title: "Scene Templates", sub: "On-brand scene, light & composition templates. Lock the ones you like and reuse them on your next products.",
      add: "Create template", shots: "shots", surface: "Surface", mood: "Mood", all: "All",
      preview: "across your catalog", useScene: "Generate in this template", locked: "Locked to brand",
      lockTemplate: "Lock this template", unlockTemplate: "Unlock template", templateLocked: "Locked",
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

      {/* Use-case filter: Studio, Lifestyle, Instagram, Meta Ads, E-commerce */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setUseCaseFilter("all")}
          className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            useCaseFilter === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
          {m.all}
        </button>
        {useCases.map((uc) => (
          <button key={uc} onClick={() => setUseCaseFilter(uc)}
            className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              useCaseFilter === uc ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
            {t(useCaseLabels[uc])}
          </button>
        ))}
      </div>

      {/* Scene template cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <div key={s.id}
            className={cn("group overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop",
              active === s.id ? "border-primary ring-2 ring-primary" : "border-border")}>
            <button onClick={() => setActive(s.id)} className="block w-full text-left">
              <div className="relative">
                <ShotImage scene={s.kind} hue={s.hue} emoji={s.emoji} className="aspect-[16/9] w-full" />
                {active === s.id && (
                  <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow"><Check className="h-4 w-4" /></span>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{s.shots} {m.shots}</span>
                {lockedIds.includes(s.id) && (
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[11px] font-medium text-primary-foreground backdrop-blur">
                    <Lock className="h-3 w-3" /> {m.templateLocked}
                  </span>
                )}
              </div>
              <div className="p-4 pb-2">
                <p className="font-display font-semibold tracking-tight">{s.name}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{t(s.surface)}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><Sparkles className="h-3 w-3 text-primary" />{t(s.mood)}</p>
              </div>
            </button>
            <div className="flex flex-wrap gap-1 px-4 pb-3">
              {s.useCases.map((uc) => (
                <span key={uc} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border">{t(useCaseLabels[uc])}</span>
              ))}
            </div>
            <div className="border-t border-border px-4 py-2.5">
              <button onClick={() => toggleLock(s.id)}
                className={cn("inline-flex items-center gap-1.5 text-xs font-medium transition-colors",
                  lockedIds.includes(s.id) ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                <Lock className="h-3.5 w-3.5" /> {lockedIds.includes(s.id) ? m.unlockTemplate : m.lockTemplate}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active scene template applied across the catalog */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              <span className="text-primary">{scene.name}</span> {m.preview}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(scene.surface)} · {m.locked}
              {isLocked && <span className="ml-2 inline-flex items-center gap-1 text-primary"><Lock className="h-3 w-3" /> {m.templateLocked}</span>}
            </p>
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
