import { medicineService } from "@/services/medicine.service";
import { MedicineCard } from "@/components/modules/medicine/MedicineCard";
import { FilterMedicine } from "@/components/modules/medicine/FilterMedicine";
import { Pagination } from "@/components/modules/medicine/Pagination";
import { Medicine, MedicineSearchParams } from "@/types";
import { parseMedicineSearchParams } from "@/utils/parseMedicineSearchParams";
import { authClient } from "@/lib/auth-client";

type HomeProps = {
  searchParams: Promise<MedicineSearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const parsedParams = await parseMedicineSearchParams(searchParams);

  const result = await medicineService.getAllMedicines(parsedParams);
  const medicines = result?.data ?? [];
  const pagination = result?.pagination ?? { totalPage: 0 };

  const session = await authClient.getSession();
  console.log(session);
  return (
    <div className="container mx-auto py-10 grid grid-rows gap-6">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3">
        <FilterMedicine />
      </aside>

      {/* Medicines */}
      <section className="col-span-12 md:col-span-9">
        {medicines.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            No medicines found
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.map((medicine: Medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}

        {pagination.totalPage > 1 && (
          <Pagination totalPage={result.pagination.totalPage} />
        )}
      </section>
    </div>
  );
}
