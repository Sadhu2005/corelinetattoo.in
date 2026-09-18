"use client";

import Link from "next/link";
import { zumbaClasses, zumbaWeeklySchedule } from "@/lib/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ZumbaClassCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {zumbaClasses.map((cls) => (
        <Card key={cls.id} className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{cls.name}</CardTitle>
              <Badge variant="secondary">{cls.level}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{cls.schedule}</p>
            <p>Duration: {cls.duration}</p>
            <p className="text-primary">{cls.feeNote}</p>
            <ButtonLink
              href={`/zumba/book?class=${encodeURIComponent(cls.name)}`}
              size="sm"
              className="mt-3 w-full"
            >
              Book this class
            </ButtonLink>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ZumbaScheduleTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Day</th>
            <th className="px-4 py-3 font-medium">Classes</th>
          </tr>
        </thead>
        <tbody>
          {zumbaWeeklySchedule.map((row) => (
            <tr key={row.day} className="border-t border-border">
              <td className="px-4 py-3 font-medium text-foreground">{row.day}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.slots.join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-border bg-card/50 px-4 py-3 text-xs text-muted-foreground">
        Fees & seat confirmation on{" "}
        <Link href="/zumba/book" className="text-primary hover:underline">
          WhatsApp after booking
        </Link>
        . No online payment.
      </div>
    </div>
  );
}
