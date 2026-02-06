import { MedicinesTableWrapper } from "@/components/modules/authentication/MedicineTableWrapper";
import { medicineService } from "@/services/medicine.service";
export const dynamic = "force-dynamic";

export default async function MedicinesPage() {
  const { data: medicines } = await medicineService.getAllMedicines({
    page: 1,
    limit: 100,
    skip: 0,
    sortBy: "name",
    sortOrder: "asc",
  });

  const transformedMedicines = medicines.map((medicine) => ({
    ...medicine,
    expiryDate:
      medicine.expiryDate instanceof Date
        ? medicine.expiryDate.toISOString().split("T")[0]
        : medicine.expiryDate || "",
    category: medicine.category ? { name: medicine.category.name } : null,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Medicines</h1>
      <MedicinesTableWrapper initialMedicines={transformedMedicines} />
    </div>
  );
}
