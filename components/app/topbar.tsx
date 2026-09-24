"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import appConfig from "@/app.config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/components/i18n/language-provider";
import { toast } from "@/components/demo-toast";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, ui, lang } = useLang();
  const [query, setQuery] = useState("");
  const current = appConfig.nav.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/"),
  );

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur">
      <h1 className="font-display text-lg font-semibold tracking-tight">
        {current ? t(current.label) : ""}
      </h1>

      <div className="ml-auto flex items-center gap-1.5">
        <form onSubmit={submitSearch} className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground lg:flex">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ui.search}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none" />
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
        </form>
        <LanguageToggle className="mr-1" />
        <button
          aria-label="Notifications"
          onClick={() => toast(lang === "tr" ? "Demo: yeni bildirim yok." : "Demo: no new notifications.")}
          className="relative grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
