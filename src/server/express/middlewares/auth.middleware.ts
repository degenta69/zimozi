import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { UserRoles } from "../types/enum";
import { auth } from "../config/firebase";

// Extend Express Request to include `user`
interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: UserRoles;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // console.log("Running middleware: authenticate");
  // console.log("Request headers:", req.headers);
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    // console.log("No token found");
    res.status(401).json({ message: "Unauthorized not authenticated" });
    return;
  }

  // console.log("Verifying token...");
  try {
    const decodedUser = await AuthService.verifyToken(token);
    // console.log("Decoded user:", decodedUser);

    // Fetch custom claims to get role (Firebase Admin SDK should set these)
    // console.log("Fetching user record...");
    const userRecord = await AuthService.getUser(decodedUser.uid);
    // console.log("User record:", userRecord);

    AuthService.assignRole(decodedUser.uid, userRecord.role || UserRoles.USER);
    req.user = {
      uid: decodedUser.uid,
      email: decodedUser.email,
      role: userRecord.role || UserRoles.USER, // Default role is 'USER'
    };

    // console.log("User authenticated:", req.user);
    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize =
  (allowedRoles: UserRoles[]) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction): Promise<any> => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    try {
      const user = await auth.getUser(req.user.uid);
      const role = user.customClaims?.role || UserRoles.USER; // Default to 'user'

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

// user should only access their own resources, this middleware will help in that validation
export const authorizeForSelfOnly = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized not authorized" });
  let userid = req.user.uid;

  // console.log("User id:", userid, "Request user id:", req.user.uid);
  if (!userid) return res.status(400).json({ message: "User id is required" });
  if (userid && req.user.uid !== userid) return res.status(403).json({ message: "Forbidden" });
  next();
};
