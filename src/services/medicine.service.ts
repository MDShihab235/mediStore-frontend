import { env } from "@/env";
import { ApiResponse, CategoryWithCount } from "@/types";
import { Medicine } from "@/types";

const API_URL = env.API_URL;
const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
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
  getAllCategories: async function (): Promise<
    ApiResponse<CategoryWithCount[]>
  > {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/medicines/categories/all`,
      {
        cache: "no-store", // always fresh
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const json = await res.json();

    return json;
  },
  getMedicineById: async function (id: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicines/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.result;
  },
};
