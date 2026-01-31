// app/page.tsx

import { getAllMedicines } from "@/services/medicine.service";
import { MedicineCard } from "@/components/modules/medicine/MedicineCard";
import { FilterMedicine } from "@/components/modules/medicine/FilterMedicine";
import { Pagination } from "@/components/modules/medicine/Pagination";
import { Medicine, MedicineSearchParams } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: MedicineSearchParams;
}) {
  const page = await Number(searchParams?.page || 1);
  const limit = 8;

  const result = await getAllMedicines({
    ...searchParams,
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="container mx-auto py-10 grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3">
        <FilterMedicine />
      </aside>

      {/* Medicines */}
      <section className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {result?.data?.map((medicine: Medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>

        <Pagination totalPage={result?.pagination?.totalPage} />
      </section>
    </div>
  );
}
