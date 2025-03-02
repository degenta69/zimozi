import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRoles } from "@/typings/enum";

export default function ProtectedRoute() {
  const { user } = useAuth();

  // if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== UserRoles.ADMIN) {
    return <Navigate to="/profile" replace />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
