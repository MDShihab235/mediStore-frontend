import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, BadgeCheck, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Medicines",
    description:
      "All medicines are verified and sourced from trusted, licensed suppliers.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed Sellers",
    description:
      "Every seller on MediStore is verified to ensure safety and quality.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Quick doorstep delivery with real-time order tracking.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Your payments are protected with industry-standard security.",
  },
];

export function WhyChooseMediStore() {
  return (
    <section className="bg-muted/40 py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Why Choose MediStore?</h2>
          <p className="mt-3 text-muted-foreground">
            Your health is our priority. Here’s why thousands trust us.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
