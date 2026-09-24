"use client";

import { CheckCircle2, CircleDashed } from "lucide-react";
import appConfig from "@/app.config";
import { brandProfile } from "@/lib/demo/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { useLang } from "@/components/i18n/language-provider";
import { toast } from "@/components/demo-toast";

export function SettingsClient({ connected }: { connected: Record<string, boolean> }) {
  const { t, ui, lang } = useLang();
  const savedMsg = lang === "tr" ? "Demo: ayarlar kaydedildi." : "Demo: settings saved.";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Brand Profile: brand colors, style, logo & visual preferences */}
      <Card>
        <CardHeader>
          <CardTitle>{ui.brandProfile}</CardTitle>
          <p className="text-sm text-muted-foreground">{ui.brandHint}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{ui.productName}</Label>
              <Input defaultValue={appConfig.name} readOnly />
            </div>
            <div className="space-y-1.5">
              <Label>{ui.domain}</Label>
              <Input defaultValue={appConfig.domain} readOnly />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{ui.tagline}</Label>
              <Input defaultValue={t(appConfig.tagline)} readOnly />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{ui.brandLogo}</Label>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Logo withWordmark={false} />
              <span className="text-sm text-muted-foreground">{appConfig.logoText}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{ui.brandColors}</Label>
            <div className="flex flex-wrap gap-3">
              {brandProfile.colors.map((c) => (
                <div key={c.name} className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
                  <span className="h-5 w-5 rounded-full ring-1 ring-border" style={{ backgroundColor: c.hex }} />
                  <span className="text-xs text-muted-foreground">{c.name} · {c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{ui.brandStyle}</Label>
            <div className="flex flex-wrap gap-1.5">
              {brandProfile.style.map((s, i) => (
                <span key={i} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border">{t(s)}</span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{ui.visualPreferences}</Label>
            <div className="flex flex-wrap gap-1.5">
              {brandProfile.visualPreferences.map((s, i) => (
                <span key={i} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border">{t(s)}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>{ui.integrations}</CardTitle>
          <p className="text-sm text-muted-foreground">{ui.integrationsHint}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {appConfig.integrations.map((it) => (
            <div key={it.key} className="flex items-center gap-4 rounded-lg border border-border p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Icon name="plug" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{it.name}</p>
                  {it.required && <Badge tone="warning">{ui.required}</Badge>}
                </div>
                <p className="truncate text-sm text-muted-foreground">{it.purpose}</p>
              </div>
              {connected[it.key] ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" /> {ui.connected}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <CircleDashed className="h-4 w-4" /> {ui.demoMode}
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => toast(savedMsg)}>{ui.saveChanges}</Button>
      </div>
    </div>
  );
}
