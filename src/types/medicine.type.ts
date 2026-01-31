export type Medicine = {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  image?: string | null;
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
