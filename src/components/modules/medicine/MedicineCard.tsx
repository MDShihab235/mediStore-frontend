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
import { ShoppingCart, Star, Eye } from "lucide-react"; // Added for better icons
import Link from "next/link";
import { env } from "@/env";

const FRONTEND_URL = env.FRONTEND_URL;

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="group relative overflow-hidden border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 dark:bg-zinc-900/50 dark:hover:shadow-primary/10">
      {/* Visual Accent - Top Gradient Bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={medicine.image || "/medicine.jpg"}
          alt={medicine.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Overlay */}
        {medicine.category && (
          <div className="absolute left-2 top-2">
            <Badge className="border-none bg-white/90 text-[10px] font-bold text-black shadow-sm backdrop-blur-md hover:bg-white dark:bg-zinc-100/90 dark:text-zinc-900">
              {medicine.category.name.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
          {medicine.name}
        </CardTitle>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {medicine.manufacturer}
        </p>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-primary">
            ৳{medicine.price}
          </span>
          <span className="text-xs text-muted-foreground line-through opacity-50">
            ৳{medicine.price + 50}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 p-3 dark:bg-zinc-800/30">
        <div className="flex gap-3 text-muted-foreground">
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <ShoppingCart className="h-3 w-3 text-primary" />
            {medicine._count?.orderItems || 0}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            {medicine._count?.reviews || 0}
          </div>
        </div>

        <Link href={`${FRONTEND_URL}/medicine/${medicine.id}`}>
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-full px-4 shadow-lg shadow-primary/20 transition-all hover:shadow-none"
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
