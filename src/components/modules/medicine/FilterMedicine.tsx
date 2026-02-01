"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FilterMedicine() {
  const router = useRouter();
  const params = useSearchParams();

  function applyFilter(formData: FormData) {
    const query = new URLSearchParams(params.toString());

    ["category", "manufacturer", "minPrice", "maxPrice"].forEach((key) => {
      const value = formData.get(key)?.toString();
      value ? query.set(key, value) : query.delete(key);
    });

    query.set("page", "1"); // reset pagination
    router.push(`/?${query.toString()}`);
  }

  return (
    <form
      action={applyFilter}
      className="grid grid-flow-col-dense space-x-10 gap-4"
    >
      <Input name="category" placeholder="Category" />
      <Input name="manufacturer" placeholder="Manufacturer" />
      <Input name="minPrice" placeholder="Min price" type="number" />
      <Input name="maxPrice" placeholder="Max price" type="number" />
      <Button className="w-full">Apply Filters</Button>
    </form>
  );
}
