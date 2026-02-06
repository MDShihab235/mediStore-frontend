"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  expiryDate: string; // ISO string
  category: { name: string } | null;
}

interface MedicinesTableProps {
  medicines: Medicine[];
  onMedicinesChange: (updatedMedicines: Medicine[]) => void;
}

export function MedicinesTable({
  medicines,
  onMedicinesChange,
}: MedicinesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Update medicine in the list after successful edit
  const updateMedicineInList = (updated: Medicine) => {
    onMedicinesChange(
      medicines.map((m) => (m.id === updated.id ? updated : m)),
    );
    setEditingId(null);
  };

  // Remove medicine from the list after successful delete
  const deleteMedicineFromList = (id: string) => {
    onMedicinesChange(medicines.filter((m) => m.id !== id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicines.map((medicine) => (
          <EditableRow
            key={medicine.id}
            medicine={medicine}
            isEditing={editingId === medicine.id}
            setEditingId={setEditingId}
            onUpdate={updateMedicineInList}
            onDelete={() => {
              if (confirm("Are you sure you want to delete this medicine?")) {
                fetch(`${API_URL}/api/medicines/${medicine.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (res.ok) {
                    deleteMedicineFromList(medicine.id);
                  } else {
                    alert("Failed to delete medicine");
                  }
                });
              }
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
}

interface EditableRowProps {
  medicine: Medicine;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
  onUpdate: (updated: Medicine) => void;
  onDelete: () => void;
}

function EditableRow({
  medicine,
  isEditing,
  setEditingId,
  onUpdate,
  onDelete,
}: EditableRowProps) {
  // Initialize form state with medicine data; slice to keep date part only (YYYY-MM-DD)
  const [formState, setFormState] = useState({
    name: medicine.name,
    price: medicine.price,
    stock: medicine.stock,
    expiryDate: medicine.expiryDate.slice(0, 10),
    category: medicine.category?.name ?? "",
  });

  const handleChange = (
    field: keyof typeof formState,
    value: string | number,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${medicine.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          // Convert expiryDate back to ISO string (full timestamp)
          expiryDate: new Date(formState.expiryDate).toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to update medicine");
        return;
      }

      const updatedMedicine = await res.json();
      onUpdate(updatedMedicine);
      setEditingId(null);
    } catch {
      alert("Something went wrong");
    }
  };

  const handleCancel = () => {
    setFormState({
      name: medicine.name,
      price: medicine.price,
      stock: medicine.stock,
      expiryDate: medicine.expiryDate.slice(0, 10),
      category: medicine.category?.name ?? "",
    });
    setEditingId(null);
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            value={formState.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={formState.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
        </TableCell>
        <TableCell>
          <Input
            type="number"
            value={formState.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
          />
        </TableCell>
        <TableCell>
          <Input
            type="date"
            value={formState.expiryDate}
            onChange={(e) => handleChange("expiryDate", e.target.value)}
          />
        </TableCell>
        <TableCell className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{medicine.name}</TableCell>
      <TableCell>{medicine.category?.name}</TableCell>
      <TableCell>৳ {medicine.price}</TableCell>
      <TableCell>{medicine.stock}</TableCell>
      <TableCell>{medicine.expiryDate.slice(0, 10)}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditingId(medicine.id)}
          >
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
