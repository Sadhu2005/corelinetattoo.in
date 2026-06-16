import { format } from "date-fns";
import { getTattooBookings } from "@/lib/data/queries";
import { StatusSelect } from "@/components/admin/status-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminBookingsPage() {
  const bookings = await getTattooBookings();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Tattoo Bookings
      </h1>
      <p className="mt-2 text-muted-foreground">
        {bookings.length} total bookings
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No bookings yet
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-sm">
                    {booking.booking_number}
                  </TableCell>
                  <TableCell>
                    <div>{booking.customer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{format(new Date(booking.preferred_date), "dd MMM yyyy")}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.preferred_time}
                    </div>
                  </TableCell>
                  <TableCell>{booking.body_placement}</TableCell>
                  <TableCell>{booking.style}</TableCell>
                  <TableCell>
                    <StatusSelect
                      id={booking.id}
                      status={booking.status}
                      type="tattoo"
                    />
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
