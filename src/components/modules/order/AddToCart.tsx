"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Medicine } from "@/types";

export function AddToCartButton({ medicine }: { medicine: Medicine }) {
  const { addToCart } = useCart();

  return (
    <Button
      onClick={() =>
        addToCart({
          medicineId: medicine.id,
          name: medicine.name,
          price: medicine.price,
          image: medicine.image ?? undefined,
          quantity: 1,
        })
      }
    >
      Add to Cart
    </Button>
  );
}
