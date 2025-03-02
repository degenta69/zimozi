import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "@/client-api-service/user.service";
import { User } from "@/models/User";

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId: any, isAdmin: boolean) => {
    try {
      await updateUserRole(userId, isAdmin);
      setUsers(
        users.map((user) =>
          user.uid === userId ? { ...user, role: isAdmin ? "USER" : "ADMIN" } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.uid} className="p-4 border rounded flex justify-between items-center">
            <span>
              {user.name} ({user.role})
            </span>
            <button
              onClick={() => handleRoleToggle(user.uid, user.role === "ADMIN")}
              className={`px-3 py-1 rounded ${user.role === "ADMIN" ? "bg-red-500" : "bg-green-500"} text-white`}
            >
              {user.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserManagement;
