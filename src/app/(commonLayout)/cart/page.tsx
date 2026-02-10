"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";

const DISCOUNT_RATE = 0.1;
const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount;
  const router = useRouter();
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/orders/cart/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
          body: JSON.stringify({
            items: items.map((i) => ({
              medicineId: i.medicineId,
              quantity: i.quantity,
            })),
          }),
        },
      );

      if (res.status === 401) {
        toast.error("Please login to continue checkout");
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (!data.valid) {
        toast.error(data.errors?.[0]?.message || "Cart validation failed");
        return;
      }

      // ✅ Redirect to checkout page
      router.push("/checkout");
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (medicineId: string, currentQty: number) => {
    try {
      setLoadingId(medicineId);

      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/orders/${medicineId}/stock`,
      );

      const { stock } = await res.json();

      if (stock === 0) {
        toast.error("Stock is not available");
        return;
      }

      if (currentQty + 1 > stock) {
        toast.error(`Only ${stock} items left in stock`);
        return;
      }

      updateQuantity(medicineId, currentQty + 1);
    } catch {
      toast.error("Failed to check stock");
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {items.map((item) => (
        <Card key={item.medicineId}>
          <CardContent className="flex gap-4 py-4">
            <Image
              src={item.image || "/medicine.jpg"}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">৳{item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateQuantity(item.medicineId, item.quantity - 1)
                  }
                >
                  <Minus size={14} />
                </Button>

                <span>{item.quantity}</span>

                <Button
                  size="icon"
                  variant="outline"
                  disabled={loadingId === item.medicineId}
                  onClick={() => handleIncrease(item.medicineId, item.quantity)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <p className="font-semibold">৳{item.price * item.quantity}</p>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => removeFromCart(item.medicineId)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Separator />

      <div className="max-w-sm ml-auto space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-৳{discount}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>৳{total}</span>
        </div>

        <Button
          className="w-full mt-4"
          disabled={loading}
          onClick={handleCheckout}
        >
          {loading ? "Checking stock..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
}
