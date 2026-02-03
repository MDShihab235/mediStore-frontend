"use client";

import { Button } from "@/components/ui/button";
import { userClientService } from "@/services/user.client";
import { User } from "@/types";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function UserActions({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = () => {
    startTransition(async () => {
      await userClientService.updateUserStatus(
        user.id,
        user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
      );
      router.refresh();
    });
  };

  const handleRoleChange = (role: string) => {
    startTransition(async () => {
      await userClientService.updateUserRole(user.id, role);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <select
        value={user.role}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={isPending}
        className="border rounded px-2 py-1"
      >
        <option value="CUSTOMER">Customer</option>
        <option value="SELLER">Seller</option>
        <option value="ADMIN">Admin</option>
      </select>

      <Button
        variant={user.status === "BANNED" ? "default" : "destructive"}
        onClick={handleStatusChange}
        disabled={isPending || user.role === "ADMIN"}
      >
        {user.status === "BANNED" ? "Unban" : "Ban"}
      </Button>
    </div>
  );
}
