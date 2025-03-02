import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "@/client-api-service/user.service";
import { User } from "@/models/User";
import { UserRoles } from "@/typings/enum";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/ui/Header";
import { useProtectHook } from "@/utils/useProtectHook";

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useAuth();
  useProtectHook(currentUser);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log("Users fetched:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId: any, isAdmin: boolean) => {
    try {
      await updateUserRole(userId, isAdmin);
      setUsers(
        users.map((user) =>
          user.uid === userId ? { ...user, role: isAdmin ? UserRoles.USER : UserRoles.ADMIN } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // if (loading) return <p>Loading users...</p>;

  return (
    <>
      <Header title="Admin - User Management" />
      <div className="p-4 max-w-xl mx-auto">
        <ul className="space-y-4">
          {users.map(
            (user) =>
              user.uid !== currentUser?.uid && (
                <li
                  key={user.uid}
                  className="flex items-center justify-between px-4 py-2 border rounded"
                >
                  <span className="font-semibold">
                    {user.name} ({user.role})
                    <span className="block text-gray-500 text-xs">{user.email}</span>
                  </span>
                  <button
                    onClick={() => handleRoleToggle(user.uid, user.role === UserRoles.ADMIN)}
                    className={`py-1 px-2 rounded ${user.role === UserRoles.ADMIN ? "bg-red-500" : "bg-green-500"} text-white`}
                  >
                    {user.role === UserRoles.ADMIN ? "Remove Admin" : "Make Admin"}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default AdminUserManagement;
