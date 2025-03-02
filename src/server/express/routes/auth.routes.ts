import express, { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { getUserById, createUser } from "../services/user.service";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Register User and Store in Firestore
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, displayName, role } = req.body;
    if (!email || !password || !displayName || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await AuthService.registerUser(email, password, displayName, role);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Login User
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const user = await AuthService.loginUser(email);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Google Login and Store User in Firestore
router.post("/google-login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Google ID token is required." });
    }
    const user = await AuthService.loginWithGoogle(idToken);
    const doesUserExist = await getUserById(user.user.uid);
    console.log(user);
    if (!doesUserExist) {
      await createUser({
        email: user.user.email!,
        name: user.user.displayName!,
      });
      // await CreateUserController({ ...req, ...user.user }, res);
    }
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Get Authenticated User Details
router.get("/me", authenticate, async (req: any, res) => {
  try {
    const user = await getUserById(req.user.uid);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/verify", async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token is required." });
    }
    const user = await AuthService.verifyToken(token);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
