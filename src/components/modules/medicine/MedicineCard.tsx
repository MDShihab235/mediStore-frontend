import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";

// type Medicine = {
//   id: string;
//   name: string;
//   price: number;
//   manufacturer: string;
//   image?: string;
//   category?: {
//     name: string;
//   };
//   _count?: {
//     orderItems: number;
//     reviews: number;
//   };
// };

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="group overflow-hidden transition hover:shadow-lg">
      <h1>This is medicine card</h1>
      {/* Image */}
      <div className="relative h-40 w-full bg-muted">
        <Image
          src={medicine.image || "/medicine.jpg"}
          alt={medicine.name}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="text-base line-clamp-1">
          {medicine.name}
        </CardTitle>

        {medicine.category && (
          <Badge variant="secondary" className="w-fit text-xs">
            {medicine.category.name}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          Manufacturer:{" "}
          <span className="font-medium">{medicine.manufacturer}</span>
        </p>

        <p className="text-lg font-semibold text-primary">৳ {medicine.price}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <span>🛒 {medicine._count?.orderItems || 0}</span>
        <span>⭐ {medicine._count?.reviews || 0}</span>

        <Button size="sm" className="ml-auto">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
