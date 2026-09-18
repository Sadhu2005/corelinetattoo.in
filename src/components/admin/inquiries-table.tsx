"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { updateInquiryStatus } from "@/lib/actions/orders";
import { inquiryStatuses } from "@/lib/constants/site";
import type { Inquiry } from "@/lib/types/database";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Select
      defaultValue={status}
      disabled={isPending}
      onValueChange={(v) => {
        if (!v) return;
        startTransition(async () => {
          await updateInquiryStatus(id, v);
        });
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {inquiryStatuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ref</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Pillar</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No inquiries yet
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((inq) => (
              <TableRow key={inq.id}>
                <TableCell className="font-mono text-sm">{inq.inquiry_number}</TableCell>
                <TableCell>
                  <div>{inq.customer_name}</div>
                  <div className="text-xs text-muted-foreground">{inq.phone}</div>
                </TableCell>
                <TableCell className="capitalize">{inq.service_pillar}</TableCell>
                <TableCell className="max-w-[220px] truncate text-sm">
                  {inq.message}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(inq.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  <InquiryStatusSelect id={inq.id} status={inq.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
