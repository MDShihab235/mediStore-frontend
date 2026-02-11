"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";

type OrderItem = {
  id: string;
  medicine: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
};

type Order = {
  id: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
};

export default function SellerOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-xl border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders?.map((order) =>
            order.items.map((item) => (
              <TableRow key={item.id}>
                {/* Customer */}
                <TableCell>
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.user.email}
                    </p>
                  </div>
                </TableCell>

                {/* Medicine */}
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={item.medicine.imageUrl || "/medicine.jpg"}
                    alt={item.medicine.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  {item.medicine.name}
                </TableCell>

                {/* Price */}
                <TableCell>${item.medicine.price}</TableCell>

                {/* Quantity */}
                <TableCell>{item.quantity}</TableCell>

                {/* Total */}
                <TableCell>
                  ${(item.medicine.price * item.quantity).toFixed(2)}
                </TableCell>

                {/* Date */}
                <TableCell>
                  {new Date(order.createdAt).toISOString().split("T")[0]}
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
