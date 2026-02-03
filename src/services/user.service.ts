import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;
const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  // 👇 ADMIN: GET ALL USERS
  getAllUsers: async function () {
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await res.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Failed to load users" } };
    }
  },
};

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
