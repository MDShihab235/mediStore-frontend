import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { UserActions } from "./UserActions";

export function UsersTable({ users }: { users: User[] }) {
  // console.log(users);
  return (
    <Table>
      <TableCaption>All Users (Customer, Seller, Admin)</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>

              {/* 👇 Client Component */}
              <TableCell>
                <UserActions user={user} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <p>No users found</p>
        )}
      </TableBody>
    </Table>
  );
}
