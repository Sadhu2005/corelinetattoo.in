"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { orderStatuses } from "@/lib/constants/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface StatusSelectProps {
  id: string;
  status: string;
  type: "portrait" | "tattoo" | "class";
}

export function StatusSelect({ id, status, type }: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      await updateOrderStatus(id, value, type);
    });
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[160px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {orderStatuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    received: "bg-yellow-500/20 text-yellow-400",
    in_progress: "bg-blue-500/20 text-blue-400",
    completed: "bg-green-500/20 text-green-400",
    delivered: "bg-primary/20 text-primary",
  };
  const label = orderStatuses.find((s) => s.value === status)?.label ?? status;
  return (
    <Badge className={colors[status] ?? ""} variant="secondary">
      {label}
    </Badge>
  );
}
