import { auth, db } from "../config/firebase";
import { UserRoles } from "../types/enum";

export class AuthService {
  // Register User with Email & Password
  static async registerUser(
    email: string,
    password: string,
    displayName?: string,
    role?: UserRoles
  ) {
    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
        // role,
      });

      // Assign role to user
      await auth.setCustomUserClaims(userRecord.uid, { role });

      // Send verification email
      const idToken = await auth.createCustomToken(userRecord.uid);

      db.collection("users").doc(userRecord.uid).set({
        email: userRecord.email,
        name: userRecord.displayName,
        role,
      });

      return {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        token: idToken,
      };
    } catch (error) {
      throw new Error("Registration failed");
    }
  }

  // Verify Firebase ID Token
  static async verifyToken(idToken: string) {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  // Get user details
  static async getUser(uid: string) {
    try {
      const userRecord = await auth.getUser(uid);
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: (userRecord.customClaims?.role as UserRoles) || UserRoles.USER,
      };
    } catch (error) {
      throw new Error("User not found");
    }
  }

  // Assign Role (RBAC)
  static async assignRole(uid: string, role: UserRoles) {
    try {
      await auth.setCustomUserClaims(uid, { role });
      return { message: "Role assigned successfully" };
    } catch (error) {
      throw new Error("Failed to assign role");
    }
  }

  // User Login with Email & Password
  static async loginUser(email: string) {
    try {
      const user = await auth.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      // Generate Firebase custom token (since Firebase Admin SDK doesn't support direct password login)
      const token = await auth.createCustomToken(user.uid);
      return { token, message: "Login successful" };
    } catch (error: any) {
      throw new Error("Login failed: " + error.message);
    }
  }

  // Login with Google (Assumes frontend handles OAuth and sends ID Token)
  static async loginWithGoogle(idToken: string) {
    try {
      const decodedUser = await auth.verifyIdToken(idToken);
      const user = await auth.getUser(decodedUser.uid);

      return { user, message: "Google login successful", token: idToken };
    } catch (error: any) {
      throw new Error("Google login failed: " + error.message);
    }
  }
}
