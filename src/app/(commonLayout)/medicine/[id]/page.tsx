import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/types";
import { AddToCartButton } from "@/components/modules/order/AddToCart";
import { medicineService } from "@/services/medicine.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MedicineDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const medicine = await medicineService.getMedicineById(resolvedParams.id);

  if (!medicine) notFound();

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Card className="grid gap-8 p-6 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={medicine.image || "/medicine.jpg"}
            alt={medicine.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{medicine.name}</h1>

          <p className="text-sm text-muted-foreground">
            Manufacturer: {medicine.manufacturer}
          </p>

          {medicine.category && (
            <Badge className="w-fit">{medicine.category.name}</Badge>
          )}

          <p className="text-2xl font-black text-primary">৳{medicine.price}</p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Orders: {medicine._count.orderItems}</span>
            <span>Reviews: {medicine._count.reviews}</span>
          </div>

          <p className="pt-3 text-sm leading-relaxed">
            {medicine.description || "No description available."}
          </p>
        </div>
      </Card>

      {/* Reviews */}
      {medicine.reviews.length > 0 && (
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-bold">Customer Reviews</h2>

          {medicine.reviews.map((review: Review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-center gap-3">
                <Image
                  src={review.user.image || "/user.png"}
                  alt={review.user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{review.user.name}</p>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {review.comment}
              </p>
            </Card>
          ))}
        </div>
      )}
      <AddToCartButton medicine={medicine} />
    </div>
  );
}
