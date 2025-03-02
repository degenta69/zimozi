import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../typings/enum";

export const useProtectHook = (user: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user.role !== UserRoles.ADMIN) {
      navigate("/profile");
    }
  }, [user, navigate]);
};
