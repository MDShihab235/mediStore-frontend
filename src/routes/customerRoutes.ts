import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "See orders",
        url: "/customer-dashboard/orders",
      },
    ],
  },
];
