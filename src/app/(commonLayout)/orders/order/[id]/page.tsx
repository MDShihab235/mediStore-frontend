"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  status: OrderStatus;
  items: {
    id: string;
    quantity: number;
    price: number;
    medicine: {
      id: string;
      name: string;
      price: number;
      imageUrl?: string;
    };
  }[];
};

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/order/${id}`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error();

        const result = await res.json();

        console.log("Get order use id: ", result.data);

        // ✅ VERY IMPORTANT
        setOrder(result.data);
      } catch {
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/order/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error();

      toast.success("Order cancelled successfully");
      router.refresh();
    } catch {
      toast.error("Unable to cancel order");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading order...</p>;
  }

  if (!order) {
    return <p className="text-center py-10">Order not found</p>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order #{order.id}</h2>

        <Badge
          variant={
            order.status === "PENDING"
              ? "secondary"
              : order.status === "CANCELLED"
                ? "destructive"
                : "default"
          }
        >
          {order.status}
        </Badge>
      </div>

      <div className="space-y-4">
        {order.items?.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex gap-4 py-4">
              {item.medicine.imageUrl && (
                <Image
                  src={item.medicine.imageUrl}
                  alt={item.medicine.name}
                  width={80}
                  height={80}
                  className="rounded-md border"
                />
              )}

              <div className="flex-1">
                <h3 className="font-semibold">{item.medicine.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
                <p className="font-medium">
                  ৳ {Number(item.price) * item.quantity}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {order.status === "PENDING" && (
        <Button variant="destructive" onClick={handleCancelOrder}>
          Cancel Order
        </Button>
      )}
    </div>
  );
}
