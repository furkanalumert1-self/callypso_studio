"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Sparkles, Check, RefreshCw, Search, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { type Product } from "@/lib/demo/data";
import { listProducts, addProduct as addProductToStore } from "@/lib/products-store";
import { cn, formatMoney } from "@/lib/utils";
import { toast } from "@/components/demo-toast";

type Filter = "all" | "synced" | "needs";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.resolve(listProducts()).then(setProducts);
  }, []);

  useEffect(() => {
    if (!showAdd) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAddModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAdd]);

  const m = {
    tr: {
      title: "Ürünler", sub: "Mağaza kataloğun ve her ürünün çekim durumu.",
      add: "Ürün ekle", all: "Tümü", synced: "Senkron", needs: "Görsel gerek",
      shots: "çekim", generate: "Çekim üret", synced2: "Senkron", draft: "Taslak",
      search: "Ürün ara…", added: "Demo: yeni ürün eklendi.", newTitle: "Yeni Ürün",
      modalTitle: "Yeni ürün ekle", productName: "Ürün adı", productPhoto: "Ürün görseli",
      uploadPhoto: "Görsel yükle", cancel: "Vazgeç", save: "Ürünü ekle",
      needPhoto: "Devam etmek için bir ürün görseli yükle.",
    },
    en: {
      title: "Products", sub: "Your store catalog and each product's shot coverage.",
      add: "Add product", all: "All", synced: "Synced", needs: "Needs shots",
      shots: "shots", generate: "Generate", synced2: "Synced", draft: "Draft",
      search: "Search products…", added: "Demo: new product added.", newTitle: "New Product",
      modalTitle: "Add a new product", productName: "Product name", productPhoto: "Product photo",
      uploadPhoto: "Upload photo", cancel: "Cancel", save: "Add product",
      needPhoto: "Upload a product photo to continue.",
    },
  }[lang];

  function openAddModal() {
    setNewTitle("");
    setNewPhoto(null);
    setShowAdd(true);
  }

  function closeAddModal() {
    setShowAdd(false);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewPhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  function submitAddProduct() {
    if (!newPhoto) {
      toast(m.needPhoto);
      return;
    }
    const title = newTitle.trim() || m.newTitle;
    addProductToStore({ title, photo: newPhoto });
    setProducts(listProducts());
    toast(m.added);
    closeAddModal();
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
        <Button onClick={openAddModal} className="gap-2"><Plus className="h-4 w-4" /> {m.add}</Button>
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
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt={p.title} className="aspect-square w-full object-cover" />
              ) : (
                <ShotImage scene="studio" hue={p.hue} emoji={p.emoji} className="aspect-square w-full" />
              )}
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

      {showAdd && (
        <div onClick={closeAddModal} className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-pop">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold tracking-tight">{m.modalTitle}</h3>
              <button onClick={closeAddModal} className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-1.5">
              <Label>{m.productName}</Label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={m.newTitle} />
            </div>

            <div className="mt-4 space-y-1.5">
              <Label>{m.productPhoto}</Label>
              <div className="overflow-hidden rounded-xl ring-1 ring-border">
                {newPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={newPhoto} alt="" className="aspect-square w-full object-cover" />
                ) : (
                  <div className="grid aspect-square w-full place-items-center bg-muted text-muted-foreground">
                    <Upload className="h-6 w-6" />
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} />
              <Button variant="outline" className="w-full gap-2" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4" /> {m.uploadPhoto}
              </Button>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={closeAddModal}>{m.cancel}</Button>
              <Button onClick={submitAddProduct}>{m.save}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
