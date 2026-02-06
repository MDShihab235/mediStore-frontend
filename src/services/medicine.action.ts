"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export async function createMedicineAction(formData: FormData) {
  // 1️⃣ Read cookies from Next.js
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // 2️⃣ Build payload (Prisma DateTime compatible)
  const payload = {
    name: String(formData.get("name") ?? ""),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    expiryDate: new Date(String(formData.get("expiryDate"))).toISOString(),
    category: String(formData.get("category") ?? ""),
    manufacturer: String(formData.get("manufacturer") ?? ""),
    description: String(formData.get("description") ?? ""),
  };

  // 3️⃣ Call backend WITH auth cookies
  const res = await fetch(`${API_URL}/api/medicines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // 🔑 THIS is the fix
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  // 4️⃣ Read response safely
  const rawText = await res.text();
  let data: unknown = {};

  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = {};
  }

  // 5️⃣ Auth-aware error handling
  if (!res.ok) {
    console.error("❌ Create medicine failed");
    console.error("STATUS:", res.status);
    console.error("RESPONSE:", data);

    // Match your Express auth responses
    return {
      error: {
        message: (typeof data === "object" && data !== null && "message" in data ? (data as { message?: string }).message : undefined) || "You are not authorized to create medicine",
        status: res.status,
      },
    };
  }

  // 6️⃣ Success
  return data;
}
