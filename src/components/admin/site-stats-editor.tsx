"use client";

import { useTransition } from "react";
import { updateSiteStat } from "@/lib/actions/orders";
import type { SiteStat } from "@/lib/types/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteStatsEditor({ stats }: { stats: SiteStat[] }) {
  const [isPending, startTransition] = useTransition();

  function handleSave(id: string, value: string) {
    startTransition(async () => {
      await updateSiteStat(id, value);
    });
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex items-center gap-3 rounded-lg border border-border p-4"
        >
          <span className="min-w-[120px] text-sm text-muted-foreground">
            {stat.label}
          </span>
          <Input
            defaultValue={stat.value}
            id={`stat-${stat.id}`}
            className="max-w-[120px]"
          />
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => {
              const input = document.getElementById(
                `stat-${stat.id}`
              ) as HTMLInputElement;
              handleSave(stat.id, input.value);
            }}
          >
            Save
          </Button>
        </div>
      ))}
    </div>
  );
}
