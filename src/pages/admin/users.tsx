import { useAuth } from "@/context/AuthContext";
import UserManagement from "@/components/user/UserManagement";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      nav("/");
    }
  }, [user, window.location.pathname]);

  return <UserManagement />;
}
