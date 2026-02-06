import { env } from "@/env";

export async function createOrder(
  items: {
    medicineId: string;
    quantity: number;
  }[],
) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/orders`, {
    method: "POST",
    credentials: "include", // VERY IMPORTANT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return res.json();
}
