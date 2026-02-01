import { MedicineSearchParams } from "@/types";

export async function parseMedicineSearchParams(
  params: Promise<MedicineSearchParams>,
) {
  const resolvedParams = await params;

  return {
    search: resolvedParams.search ?? "",
    category: resolvedParams.category ?? "",
    manufacturer: resolvedParams.manufacturer ?? "",
    authorId: resolvedParams.authorId ?? "",

    page: Number(resolvedParams.page ?? 1),
    limit: Number(resolvedParams.limit ?? 8),
    skip: resolvedParams.skip ? Number(resolvedParams.skip) : undefined,

    minPrice: resolvedParams.minPrice
      ? Number(resolvedParams.minPrice)
      : undefined,
    maxPrice: resolvedParams.maxPrice
      ? Number(resolvedParams.maxPrice)
      : undefined,

    sortBy: resolvedParams.sortBy ?? "createdAt",
    sortOrder: resolvedParams.sortOrder ?? "desc",
  };
}
