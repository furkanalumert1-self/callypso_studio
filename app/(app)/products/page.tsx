"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Sparkles, Check, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { products as seedProducts, type Product } from "@/lib/demo/data";
import { cn, formatMoney } from "@/lib/utils";
import { toast } from "@/components/demo-toast";

type Filter = "all" | "synced" | "needs";
const NEW_EMOJIS = ["🆕", "✨", "📦", "🎁"];

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}

function ProductsPageInner() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<Filter>("all");
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const m = {
    tr: {
      title: "Ürünler", sub: "Mağaza kataloğun ve her ürünün çekim durumu.",
      add: "Ürün ekle", all: "Tümü", synced: "Senkron", needs: "Görsel gerek",
      shots: "çekim", generate: "Çekim üret", synced2: "Senkron", draft: "Taslak",
      search: "Ürün ara…", added: "Demo: yeni ürün eklendi.", newTitle: "Yeni Ürün",
    },
    en: {
      title: "Products", sub: "Your store catalog and each product's shot coverage.",
      add: "Add product", all: "All", synced: "Synced", needs: "Needs shots",
      shots: "shots", generate: "Generate", synced2: "Synced", draft: "Draft",
      search: "Search products…", added: "Demo: new product added.", newTitle: "New Product",
    },
  }[lang];

  function addProduct() {
    const id = `p${Date.now()}`;
    const emoji = NEW_EMOJIS[products.length % NEW_EMOJIS.length];
    setProducts((prev) => [
      { id, title: `${m.newTitle} ${prev.length + 1}`, sku: `SKU-${id.slice(-5)}`, price: 0, emoji, hue: "200", shots: 0, synced: false },
      ...prev,
    ]);
    toast(m.added);
  }

  const shown = products
    .filter((p) => (filter === "all" ? true : filter === "synced" ? p.synced : !p.synced))
    .filter((p) => `${p.title} ${p.sku}`.toLowerCase().includes(query.toLowerCase()));
  const filters: Filter[] = ["all", "synced", "needs"];
  const labels: Record<Filter, string> = { all: m.all, synced: m.synced, needs: m.needs };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">{m.title}</h2>
          <p className="text-sm text-muted-foreground">{m.sub}</p>
        </div>
        <Button onClick={addProduct} className="gap-2"><Plus className="h-4 w-4" /> {m.add}</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
            {labels[f]}
          </button>
        ))}
        <div className="ml-auto hidden h-9 w-56 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm sm:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={m.search}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <div key={p.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop">
            <div className="relative">
              <ShotImage scene="studio" hue={p.hue} emoji={p.emoji} className="aspect-square w-full" />
              {p.synced ? (
                <Badge tone="success" className="absolute left-3 top-3 shadow-sm"><Check className="h-3 w-3" /> {m.synced2}</Badge>
              ) : (
                <Badge tone="neutral" className="absolute left-3 top-3 shadow-sm">{m.draft}</Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate font-medium">{p.title}</p>
                <p className="shrink-0 font-display text-sm font-semibold tabular-nums text-primary">{formatMoney(p.price)}</p>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground">{p.sku}</p>
              <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-primary" />{p.shots} {m.shots}</span>
                <Link href="/generate" className="ml-auto inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4">
                  <RefreshCw className="h-3.5 w-3.5" /> {m.generate}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
