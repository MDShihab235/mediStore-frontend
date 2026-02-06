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
        url: "/Admin-dashboard/create-medicine",
      },
      {
        title: "All Medicines",
        url: "/admin-dashboard/medicines",
      },
    ],
  },
];
