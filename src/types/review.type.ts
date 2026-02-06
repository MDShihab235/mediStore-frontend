export type Review = {
  id: string;
  rating: number; // 1–5
  comment?: string | null;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  userId: string;
  medicineId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
