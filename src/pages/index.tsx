import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRoles } from "@/typings/enum";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== UserRoles.ADMIN) {
      console.log("User is not admin", user);
      navigate("/profile");
    }
  }, [user, navigate]);

  const adminRoutes = [
    // { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Manage Products" },
    // { path: "/admin/products/add", label: "Add Product" },
    { path: "/admin/users", label: "Manage Users" },
    // { path: "/admin/users/:id", label: "User Details" },
    // { path: "/admin/users/:id/edit", label: "Edit User" },
    // { path: "/admin/users/:id/promote", label: "Promote User to Admin" },
    { path: "/admin/orders", label: "Manage Orders" },
    // { path: "/admin/orders/:id", label: "Order Details" },
    // { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-3">
        {adminRoutes.map((route) => (
          <li key={route.path}>
            <button
              className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => navigate(route.path)}
            >
              {route.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
