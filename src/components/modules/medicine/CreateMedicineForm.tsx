// "use client";

import { useTransition } from "react";
import { createMedicineAction } from "@/services/medicine.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function CreateMedicineForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createMedicineAction(formData);
      toast.success("Medicine created successfully");
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Medicine</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name">Medicine Name</Label>
            <Input id="name" name="name" placeholder="Paracetamol" required />
          </div>

          {/* Price */}
          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="50"
              required
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <Label htmlFor="stock">Quantity</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              placeholder="100"
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-1">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" name="expiryDate" type="date" required />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Painkiller"
              required
            />
          </div>
          {/* Manufacturer */}
          <div className="space-y-1">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              name="manufacturer"
              placeholder="Baximco"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Medicine description..."
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Medicine"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
