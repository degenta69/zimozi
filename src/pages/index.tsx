import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProtectHook } from "@/utils/useProtectHook";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useProtectHook(user);

  const adminRoutes = [
    { path: "/admin/products", label: "Manage Products" },
    { path: "/admin/users", label: "Manage Users" },
    { path: "/admin/orders", label: "Manage Orders" },
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
