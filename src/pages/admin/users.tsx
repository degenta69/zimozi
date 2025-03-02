import UserManagement from "@/components/user/UserManagement";

import Header from "@/components/ui/Header";

export default function AdminUsersPage() {
  return (
    <>
      <Header title="Admin - User Management" />
      <UserManagement />
    </>
  );
}
