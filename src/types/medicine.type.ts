export type Medicine = {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  stock: number;
  image?: string | null;
  expiryDate?: Date;
  searchParams?: string | null | undefined;
  category?: {
    id: string;
    name: string;
  } | null;

  _count?: {
    orderItems: number;
    reviews: number;
  };
};

export type MedicineSearchParams = {
  search?: string;
  category?: string;
  manufacturer?: string;
  authorId?: string;

  minPrice?: string; // URL params are always string
  maxPrice?: string;

  page?: string;
  limit?: string;
  skip?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

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
