"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import type {
  ClassBooking,
  Inquiry,
  PortraitOrder,
  TattooBooking,
} from "@/lib/types/database";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type LeadKind = "all" | "art" | "tattoo" | "zumba" | "inquiry";

type LeadRow = {
  id: string;
  kind: LeadKind;
  ref: string;
  name: string;
  phone: string;
  summary: string;
  status: string;
  created_at: string;
};

export function LeadsInbox({
  orders,
  tattoos,
  classes,
  inquiries,
}: {
  orders: PortraitOrder[];
  tattoos: TattooBooking[];
  classes: ClassBooking[];
  inquiries: Inquiry[];
}) {
  const [kind, setKind] = useState<LeadKind>("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list: LeadRow[] = [
      ...orders.map((o) => ({
        id: o.id,
        kind: "art" as const,
        ref: o.order_number,
        name: o.customer_name,
        phone: o.phone,
        summary: `${o.style} · ${o.size}`,
        status: o.status,
        created_at: o.created_at,
      })),
      ...tattoos.map((t) => ({
        id: t.id,
        kind: "tattoo" as const,
        ref: t.booking_number,
        name: t.customer_name,
        phone: t.phone,
        summary: `${t.style} · ${t.preferred_date}`,
        status: t.status,
        created_at: t.created_at,
      })),
      ...classes.map((c) => ({
        id: c.id,
        kind: "zumba" as const,
        ref: c.booking_number,
        name: c.customer_name,
        phone: c.phone,
        summary: `${c.class_type} · ${c.preferred_date}`,
        status: c.status,
        created_at: c.created_at,
      })),
      ...inquiries.map((i) => ({
        id: i.id,
        kind: "inquiry" as const,
        ref: i.inquiry_number,
        name: i.customer_name,
        phone: i.phone,
        summary: `${i.service_pillar}: ${i.message.slice(0, 60)}`,
        status: i.status,
        created_at: i.created_at,
      })),
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return list.filter((row) => {
      if (kind !== "all" && row.kind !== kind) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        row.phone.includes(s) ||
        row.name.toLowerCase().includes(s) ||
        row.ref.toLowerCase().includes(s)
      );
    });
  }, [orders, tattoos, classes, inquiries, kind, q]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search phone or name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={kind}
          onValueChange={(v) => {
            if (
              v === "all" ||
              v === "art" ||
              v === "tattoo" ||
              v === "zumba" ||
              v === "inquiry"
            ) {
              setKind(v);
            }
          }}
        >
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All leads</SelectItem>
            <SelectItem value="art">Art orders</SelectItem>
            <SelectItem value="tattoo">Tattoos</SelectItem>
            <SelectItem value="zumba">Zumba classes</SelectItem>
            <SelectItem value="inquiry">Inquiries</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-muted-foreground">No leads match.</p>
        ) : (
          rows.map((row) => (
            <Card key={`${row.kind}-${row.id}`} className="border-border">
              <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {row.kind}
                    </Badge>
                    <span className="font-mono text-xs text-primary">{row.ref}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(row.created_at), "dd MMM · HH:mm")}
                    </span>
                  </div>
                  <p className="mt-1 font-medium">
                    {row.name} · {row.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">{row.summary}</p>
                </div>
                <Badge className="w-fit capitalize">{row.status}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
