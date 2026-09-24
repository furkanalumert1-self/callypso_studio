"use client";

import { useEffect, useState } from "react";

export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("demo-toast", { detail: message }));
}

export function Toaster() {
  const [items, setItems] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    function onToast(e: Event) {
      const message = (e as CustomEvent<string>).detail;
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, message }]);
      setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2800);
    }
    window.addEventListener("demo-toast", onToast);
    return () => window.removeEventListener("demo-toast", onToast);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {items.map((i) => (
        <div key={i.id} className="pointer-events-auto rounded-lg bg-foreground px-4 py-2.5 text-sm text-background shadow-pop">
          {i.message}
        </div>
      ))}
    </div>
  );
}
