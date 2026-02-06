"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { createOrder } from "@/services/order.service";

export function CheckoutButton() {
  const { items, clearCart } = useCart();

  const handleCheckout = async () => {
    await createOrder(
      items.map((i) => ({
        medicineId: i.medicineId,
        quantity: i.quantity,
      })),
    );
    clearCart();
    alert("Order placed successfully 🎉");
  };

  return (
    <Button onClick={handleCheckout} disabled={!items.length}>
      Place Order
    </Button>
  );
}
