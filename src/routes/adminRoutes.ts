import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "All Management for Admin",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "All Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Create Medicine",
        url: "/admin-dashboard/create-medicine",
      },
      {
        title: "All Medicines",
        url: "/admin-dashboard/medicines",
      },
      {
        title: "All Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/orders",
      },
    ],
  },
];
