import { env } from "@/env";
import { ApiResponse } from "@/types";
import { Medicine } from "@/types";

const API_URL = env.API_URL;

export const medicineService = {
  getAllMedicines: async function (
    params: Record<string, string | number | undefined>,
  ): Promise<ApiResponse<Medicine[]>> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) query.append(k, String(v));
    });

    const res = await fetch(`${API_URL}/api/medicines?${query}`, {
      cache: "no-store",
    });

    // if (!res.ok) throw new Error("Failed to fetch medicines");

    return res.json();
  },
};
