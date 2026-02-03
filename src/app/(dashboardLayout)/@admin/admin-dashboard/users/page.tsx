import { UsersTable } from "@/components/modules/authentication/UsersTable";
import { userService } from "@/services/user.service";

export default async function Users() {
  const { data } = await userService.getAllUsers();
  return (
    <div>
      <h1>All users</h1>
      <UsersTable users={data} />
    </div>
  );
}
