import { MedicineSearchParams } from "@/types";

export function parseMedicineSearchParams(params: MedicineSearchParams) {
  return {
    search: params.search,
    category: params.category,
    manufacturer: params.manufacturer,
    authorId: params.authorId,

    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 8),
    skip: params.skip ? Number(params.skip) : undefined,

    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,

    sortBy: params.sortBy ?? "createdAt",
    sortOrder: params.sortOrder ?? "desc",
  };
}
