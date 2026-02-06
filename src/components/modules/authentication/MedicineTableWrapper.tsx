"use client";

import { useState } from "react";
import { MedicinesTable } from "./MedicineTable";

interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  expiryDate: string;
  category: { name: string } | null;
}

interface MedicinesTableWrapperProps {
  initialMedicines: Medicine[];
}

export function MedicinesTableWrapper({
  initialMedicines,
}: MedicinesTableWrapperProps) {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);

  const handleMedicinesChange = (updatedMedicines: Medicine[]) => {
    // Called when medicines are updated from child component
    console.log("Medicines updated:", updatedMedicines);
    setMedicines(updatedMedicines); // update local state
  };

  return (
    <MedicinesTable
      medicines={medicines}
      onMedicinesChange={handleMedicinesChange}
    />
  );
}
