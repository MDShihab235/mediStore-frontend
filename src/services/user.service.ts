import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        credentials: "include",
        cache: "no-store",
        headers: {
          cookie: cookieStore.toString(),
        },
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
