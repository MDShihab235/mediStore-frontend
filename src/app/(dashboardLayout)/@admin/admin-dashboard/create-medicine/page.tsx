"use client";
import CreateMedicineForm from "@/components/modules/medicine/CreateMedicineForm";

export default function CreateMedicine() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Create Medicine</h1>

      <CreateMedicineForm />
    </div>
  );
}
