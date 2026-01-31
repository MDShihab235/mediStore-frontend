import { AppSidebar } from "@/components/layout/app-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  customer,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  customer: React.ReactNode;
  seller: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb></Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin
            ? admin
            : userInfo.role === Roles.seller
              ? seller
              : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
