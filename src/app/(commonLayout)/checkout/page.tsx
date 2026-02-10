"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Shipping address is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: items.map((i) => ({
            medicineId: i.medicineId,
            quantity: i.quantity,
          })),
          shippingAddress: address,
        }),
      });

      if (!res.ok) throw new Error();

      const order = await res.json();

      toast.success("Order placed successfully 🚚");
      clearCart();

      // 🔀 Redirect to order page
      router.push(`orders/order/${order.id}`);
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Cash on Delivery</h2>

          <Textarea
            placeholder="Enter your full shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button
            className="w-full"
            disabled={loading}
            onClick={handlePlaceOrder}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
