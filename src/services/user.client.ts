import { env } from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export const userClientService = {
  updateUserStatus: async (userId: string, status: "ACTIVE" | "BANNED") => {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );

    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) throw new Error("Failed to update role");
    return res.json();
  },
};
