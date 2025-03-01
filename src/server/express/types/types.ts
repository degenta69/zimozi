import { Request } from "express";
import { UserRoles } from "./enum";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: UserRoles;
  };
}
