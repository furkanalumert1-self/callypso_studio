"use client";

import Link from "next/link";
import {
  ArrowUpRight, ArrowRight, Sparkles, Download, RefreshCw, Check, TrendingUp,
  TrendingDown, Wand2, Gauge, Zap, Scissors, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ShotImage } from "@/components/shot-image";
import { TrendChart } from "@/components/app/trend-chart";
import { useLang } from "@/components/i18n/language-provider";
import {
  activity, credits, extraKpis, genQueue, genTrend, heroKpis, products,
  sceneUsage, scenes, shots, studio, topProducts, type ShotStatus,
} from "@/lib/demo/data";
import { formatRelative } from "@/lib/utils";
import { toast } from "@/components/demo-toast";

const statusLabel: Record<ShotStatus, { tr: string; en: string }> = {
  synced: { tr: "Senkron", en: "Synced" },
  approved: { tr: "Onaylandı", en: "Approved" },
  rendering: { tr: "Render", en: "Rendering" },
  draft: { tr: "Taslak", en: "Draft" },
};
const statusTone: Record<ShotStatus, "success" | "info" | "warning" | "neutral"> = {
  synced: "success", approved: "info", rendering: "warning", draft: "neutral",
};

export default function Dashboard() {
  const { lang, t } = useLang();
  const featured = shots[0];
  const gallery = shots.slice(1, 9);

  const m = {
    tr: {
      eyebrow: "Stüdyo · Bugün", hi: "Merhaba Alex.", made: "çekim üretildi.",
      body: "Kataloğun büyüyor ve kreatiflerin onaya akıyor. Bir ürün seç, bir şablon seç — Callypso Studio gerisini halleder.",
      generate: "Çekim üret", featured: "Öne çıkan çekim", goal: "aylık hedef",
      gallery: "Çekim galerisi", all: "Tümü", queueT: "Üretim kuyruğu", jobs: "iş",
      scenesT: "Sahne seçici", products: "Ürünler", recent: "Son hareketler", shotsN: "çekim",
      trendT: "Haftalık üretim", trendSub: "son 7 gün · üretilen çekim", trendTotal: "bu hafta",
      usageT: "Sahne kullanımı", usageSub: "marka kitinin en çok seçtiği bakışlar",
      creditsT: "Render bütçesi", creditsUsed: "kullanılan kredi", renders: "render", cutouts: "kesim", variants: "varyant",
      topT: "En çok çekilen", topSub: "kataloğunun yıldız ürünleri", topShots: "çekim",
      kpiMore: "Daha fazla ölçüm",
      toastDownload: "Demo: çekim indirildi.", toastRegen: "Demo: yeniden render kuyruğa alındı.",
    },
    en: {
      eyebrow: "Studio · Today", hi: "Hi Alex.", made: "shots made.",
      body: "Your catalog is growing and creatives are flowing to approval. Pick a product, pick a template — Callypso Studio does the rest.",
      generate: "Generate a shot", featured: "Featured shot", goal: "monthly goal",
      gallery: "Shot gallery", all: "All", queueT: "Generation queue", jobs: "jobs",
      scenesT: "Scene picker", products: "Products", recent: "Recent activity", shotsN: "shots",
      trendT: "Weekly output", trendSub: "last 7 days · shots generated", trendTotal: "this week",
      usageT: "Scene usage", usageSub: "the looks your brand kit reaches for most",
      creditsT: "Render budget", creditsUsed: "credits used", renders: "renders", cutouts: "cut-outs", variants: "variants",
      topT: "Most shot", topSub: "the stars of your catalog", topShots: "shots",
      kpiMore: "More metrics",
      toastDownload: "Demo: shot downloaded.", toastRegen: "Demo: regeneration queued.",
    },
  }[lang];

  const trendData = genTrend.map((p) => ({
    label: lang === "tr" ? p.label : { Pzt: "Mon", Sal: "Tue", Çar: "Wed", Per: "Thu", Cum: "Fri", Cmt: "Sat", Paz: "Sun" }[p.label] ?? p.label,
    value: p.value,
  }));
  const trendTotal = genTrend.reduce((s, p) => s + p.value, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl ring-1 ring-border shadow-soft" style={{ background: "var(--grad-hero)" }}>
        <span className="blob -left-12 -top-20 h-64 w-64 bg-primary/30 drift" aria-hidden />
        <span className="blob right-1/3 top-8 h-44 w-44 drift" aria-hidden style={{ background: "color-mix(in oklch, var(--color-serif) 32%, transparent)", animationDelay: "2s" }} />
        <div className="relative grid gap-7 p-7 lg:grid-cols-[1.05fr_1fr] lg:p-9">
          <div className="flex flex-col">
            <p className="label-mono flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> {m.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[34px] font-semibold leading-[1.05] tracking-tight lg:text-[44px]">
              {m.hi} <span className="display-accent font-normal">{studio.shotsMade} {m.made}</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/generate"><Button size="lg" className="gap-2"><Sparkles className="h-4 w-4" /> {m.generate}</Button></Link>
              <div className="min-w-[180px] flex-1">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="label-mono">{m.goal}</span>
                  <span className="tabular-nums">{studio.shotsMade} / {studio.goal}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${studio.goalPct}%`, backgroundImage: "linear-gradient(90deg, var(--color-primary), var(--color-serif))" }} />
                </div>
              </div>
            </div>
            {/* KPI strip */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-7 sm:grid-cols-4">
              {heroKpis.map((k) => {
                const up = (k.delta ?? 0) >= 0;
                return (
                  <div key={k.label.en} className="rounded-xl bg-card/70 p-3 ring-1 ring-border backdrop-blur">
                    <Icon name={k.icon} className="h-4 w-4 text-primary" />
                    <p className="mt-2 font-display text-xl font-semibold tabular-nums">{k.value}</p>
                    <p className="text-[11px] leading-tight text-muted-foreground">{t(k.label)}</p>
                    {k.delta !== undefined && (
                      <p className={`mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold ${up ? "text-success" : "text-destructive"}`}>
                        {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                        {up ? "+" : ""}{k.delta}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured shot */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border">
              <div className="relative">
                <ShotImage scene={featured.kind} hue={featured.hue} emoji={featured.productEmoji} className="aspect-[4/3] w-full" />
                <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{m.featured}</span>
                <Badge tone={statusTone[featured.status]} className="absolute right-3 top-3 shadow-sm">{t(statusLabel[featured.status])}</Badge>
                <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-foreground backdrop-blur tabular-nums">{featured.scene}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{t(featured.title)}</p>
                  <p className="text-xs text-muted-foreground">{featured.product}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => toast(m.toastDownload)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"><Download className="h-4 w-4" /></button>
                  <button onClick={() => toast(m.toastRegen)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"><RefreshCw className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
            {/* filmstrip */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {shots.slice(1, 5).map((s) => (
                <div key={s.id} className="overflow-hidden rounded-lg ring-1 ring-border">
                  <ShotImage scene={s.kind} hue={s.hue} emoji={s.productEmoji} className="aspect-square w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Shot gallery (signature) ─────────────────────────────────── */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight">{m.gallery}</h2>
          <Link href="/scenes" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">{m.all} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid auto-rows-[176px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((s) => (
            <article
              key={s.id}
              className={`group relative overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-pop ${s.span ? "row-span-2 sm:col-span-2" : ""}`}
            >
              <ShotImage scene={s.kind} hue={s.hue} emoji={s.productEmoji} className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                <p className="truncate text-[13px] font-medium text-white">{t(s.title)}</p>
                <p className="truncate text-[11px] text-white/75">{s.scene}</p>
              </div>
              <Badge tone={statusTone[s.status]} className="absolute right-2 top-2 shadow-sm">{t(statusLabel[s.status])}</Badge>
            </article>
          ))}
        </div>
      </section>

      {/* ── Queue + scene picker ─────────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Generation queue */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">{m.queueT}</h2>
            <span className="label-mono text-muted-foreground">{genQueue.length} {m.jobs}</span>
          </div>
          <ul className="mt-4 space-y-4">
            {genQueue.map((j) => {
              const active = j.progress > 0;
              return (
                <li key={j.id} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl">{j.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <p className="truncate font-medium">{j.product}</p>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{active ? `${j.progress}% · ${j.eta}` : j.eta}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{t(j.scene)}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${active ? "" : "bg-border"}`} style={{ width: `${Math.max(j.progress, 4)}%`, backgroundImage: active ? "linear-gradient(90deg, var(--color-primary), var(--color-serif))" : undefined }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/generate" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4">
            <Wand2 className="h-4 w-4" /> {m.generate} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Scene picker */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold tracking-tight">{m.scenesT}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {scenes.slice(0, 6).map((sc) => (
              <Link key={sc.id} href="/scenes" className="group overflow-hidden rounded-xl ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-pop">
                <ShotImage scene={sc.kind} hue={sc.hue} emoji={sc.emoji} className="aspect-[5/3] w-full" />
                <div className="flex items-center justify-between px-2.5 py-2">
                  <p className="truncate text-[12px] font-medium">{sc.name}</p>
                  <span className="text-[10px] tabular-nums text-muted-foreground">{sc.shots}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Generations chart + scene usage ──────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Generations over time */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">{m.trendT}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{m.trendSub}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-semibold tabular-nums text-primary">{trendTotal}</p>
              <p className="label-mono text-muted-foreground">{m.trendTotal}</p>
            </div>
          </div>
          <div className="mt-4">
            <TrendChart data={trendData} height={210} suffix={lang === "tr" ? " çekim" : " shots"} />
          </div>
        </div>

        {/* Scene usage breakdown */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold tracking-tight">{m.usageT}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{m.usageSub}</p>
          <ul className="mt-4 space-y-3.5">
            {sceneUsage.map((u) => (
              <li key={u.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `oklch(64% 0.16 ${u.hue})` }} />
                    <span className="font-medium">{t(u.name)}</span>
                  </span>
                  <span className="tabular-nums text-xs text-muted-foreground">{u.pct}% · {u.shots}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${u.pct * 2.6}%`, background: `oklch(64% 0.18 ${u.hue})` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Credits meter + extra KPIs ───────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.5fr]">
        {/* Credits / usage meter */}
        <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 text-sidebar-foreground shadow-soft">
          <span className="blob -right-12 -top-12 h-40 w-40 bg-primary/40 drift" aria-hidden />
          <div className="relative">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold tracking-tight">{m.creditsT}</h2>
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-4 flex items-end gap-2">
              <span className="font-display text-4xl font-semibold leading-none tabular-nums">{credits.used.toLocaleString()}</span>
              <span className="pb-1 text-sm text-sidebar-muted">/ {credits.total.toLocaleString()}</span>
            </p>
            <p className="mt-1 label-mono text-sidebar-muted">{m.creditsUsed}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${credits.pct}%`, backgroundImage: "linear-gradient(90deg, var(--color-primary), var(--color-serif))" }} />
            </div>
            <p className="mt-2 text-[11px] text-sidebar-muted">{t(credits.resetLabel)}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Zap, n: credits.renders, l: m.renders },
                { icon: Scissors, n: credits.cutouts, l: m.cutouts },
                { icon: Layers, n: credits.variants, l: m.variants },
              ].map((x, i) => (
                <div key={i} className="rounded-xl bg-white/[0.06] p-2.5 ring-1 ring-white/10">
                  <x.icon className="mx-auto h-3.5 w-3.5 text-primary" />
                  <p className="mt-1 font-display text-base font-semibold tabular-nums">{x.n}</p>
                  <p className="text-[10px] text-sidebar-muted">{x.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra KPIs + top products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
            {extraKpis.map((k) => {
              const up = (k.delta ?? 0) >= 0;
              return (
                <div key={k.label.en} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <Icon name={k.icon} className="h-4 w-4 text-primary" />
                    {k.delta !== undefined && (
                      <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${up ? "text-success" : "text-destructive"}`}>
                        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {up ? "+" : ""}{k.delta}%
                      </span>
                    )}
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold tabular-nums">{k.value}</p>
                  <p className="text-[12px] text-muted-foreground">{t(k.label)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/70">{t(k.hint)}</p>
                </div>
              );
            })}
          </div>
          {/* Top products */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold tracking-tight">{m.topT}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{m.topSub}</p>
            <ol className="mt-4 space-y-3">
              {topProducts.map((p, i) => {
                const up = p.trend >= 0;
                return (
                  <li key={p.id} className="flex items-center gap-3">
                    <span className="w-4 shrink-0 text-center font-display text-sm font-semibold text-muted-foreground/60">{i + 1}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-lg" style={{ background: `oklch(94% 0.05 ${p.hue})` }}>{p.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[13px] font-medium">{p.title}</p>
                        {p.synced && <Check className="h-3.5 w-3.5 shrink-0 text-success" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{p.shots} {m.topShots}</p>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold tabular-nums ${up ? "text-success" : "text-destructive"}`}>{up ? "+" : ""}{p.trend}%</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Products strip + activity ────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">{m.products}</h2>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">{m.all} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <Link key={p.id} href="/products" className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop">
                <ShotImage scene="studio" hue={p.hue} emoji={p.emoji} className="aspect-square w-full" />
                <div className="p-3">
                  <p className="truncate text-[13px] font-medium">{p.title}</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Icon name="image" className="h-3 w-3" />{p.shots} {m.shotsN}</span>
                    {p.synced && <span className="inline-flex items-center gap-0.5 text-success"><Check className="h-3 w-3" /></span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold tracking-tight">{m.recent}</h2>
          <ul className="mt-4 space-y-4">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 text-sm">
                  <p className="leading-snug"><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{t(a.action)}</span> <span className="font-medium">{a.target}</span></p>
                  <p className="text-xs text-muted-foreground">{formatRelative(a.at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
