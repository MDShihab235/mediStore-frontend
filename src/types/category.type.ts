import { Medicine } from "./medicine.type";

/** Base Category */
export type Category = {
  id: string;
  name: string;
  description?: string | null;
};

/** Category with medicine count (your current API) */
export type CategoryWithCount = Category & {
  _count: {
    medicines: number;
  };
};

/** Category with full medicines (DETAIL page only) */
export type CategoryWithMedicines = Category & {
  medicines: Medicine[];
};
