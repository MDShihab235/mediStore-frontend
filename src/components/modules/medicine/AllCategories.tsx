"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryWithCount, Medicine } from "@/types";
export type Category = {
  id: string;
  name: string;
  description?: string | null;
  _count: {
    medicines: number;
  };
  medicines: Medicine[];
};

type AllCategoriesProps = {
  category: CategoryWithCount[];
};

export default function AllCategories({ category }: AllCategoriesProps) {
  console.log("From all categories: ", category);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">All Categories</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead className="text-right">Medicines Count</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {category?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            category?.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right">
                  {category._count.medicines}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
