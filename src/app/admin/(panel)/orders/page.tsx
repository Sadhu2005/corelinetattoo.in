import { format } from "date-fns";
import { getPortraitOrders } from "@/lib/data/queries";
import { StatusSelect } from "@/components/admin/status-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminOrdersPage() {
  const orders = await getPortraitOrders();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Portrait Orders
      </h1>
      <p className="mt-2 text-muted-foreground">
        {orders.length} total orders
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No orders yet
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.order_number}
                  </TableCell>
                  <TableCell>
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.phone}
                    </div>
                  </TableCell>
                  <TableCell>{order.style}</TableCell>
                  <TableCell>{order.size}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(order.created_at), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <StatusSelect
                      id={order.id}
                      status={order.status}
                      type="portrait"
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
