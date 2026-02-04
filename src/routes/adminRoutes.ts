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
    ],
  },
];
