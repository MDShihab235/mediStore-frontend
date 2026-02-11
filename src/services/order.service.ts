import { env } from "@/env";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
export async function createOrder(
  items: {
    medicineId: string;
    quantity: number;
  }[],
) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/orders`, {
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

export const getAllOrders = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/orders/seller/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // important for auth session
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
