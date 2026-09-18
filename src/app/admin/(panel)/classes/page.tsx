import { format } from "date-fns";
import { getClassBookings } from "@/lib/data/queries";
import { StatusSelect } from "@/components/admin/status-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminClassesPage() {
  const bookings = await getClassBookings();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Class Bookings
      </h1>
      <p className="mt-2 text-muted-foreground">{bookings.length} total</p>
      <div className="mt-8 overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>When</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No class bookings yet
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-sm">{b.booking_number}</TableCell>
                  <TableCell>
                    <div>{b.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{b.phone}</div>
                  </TableCell>
                  <TableCell>{b.class_type}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(b.preferred_date), "dd MMM yyyy")} · {b.preferred_time}
                  </TableCell>
                  <TableCell>
                    <StatusSelect id={b.id} status={b.status} type="class" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
