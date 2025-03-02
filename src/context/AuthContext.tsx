// create a auth context
import {
  getLoggedInUser,
  loginWithGoogle,
  registerUser,
  verifyUserToken,
} from "@/client-api-service/auth.service";
import { updateUser as updateUserApi } from "@/client-api-service/user.service";
import { auth } from "@/firebase-client-config";
import { User } from "@/models/User";
import { UserRoles } from "@/typings/enum";
import {
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  handleLogin: (e: React.FormEvent, email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => void;
  handleGoogleLogin: () => void;
  user: any;
  error: string | null;
  setError: (error: string | null) => void;
  // role: string;
  // setRole: (role: string) => void;
  handleLogout: () => void;
  updateUser: (uid: string, updates: Partial<User>) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleGoogleLogin: async () => {},
  handleLogout: async () => {},
  user: null,
  error: null,
  setError: () => {},
  updateUser: async () => {},
  // role: "user",
  // setRole: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  // const [role, setRole] = useState("user");

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = await getLoggedInUser();
        // const firebaseUser = await auth.getUser(decodedUser.uid);
        // console.log(decodedUser);
        setUser(decodedUser.data);
      } catch (err: any) {
        console.error(err);
      }
    }
  };

  // Email/Password Login
  const handleLogin = async (e: React.FormEvent, email: string, password: string) => {
    e.preventDefault();
    try {
      const some = await signInWithEmailAndPassword(auth, email, password);
      let token = await some.user.getIdToken();
      localStorage.setItem("token", token);
      console.log("User Logged In:", some);
      await getUser();
      nav("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Registration with Role Selection
  const handleRegister = async (email: string, password: string) => {
    try {
      const { data } = await registerUser(email, password, "User", UserRoles.USER);
      const userCredential = await signInWithCustomToken(auth, data.token);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      console.log("User Registered:", data);
      await getUser();
      nav("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const { data } = await loginWithGoogle(idToken);
      localStorage.setItem("token", data.token);
      console.log("Google Login Success:", data);
      await getUser();
      nav("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  const verifyAuth = async () => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      try {
        await verifyUserToken();
        const decodedUser = await getLoggedInUser();
        setUser(decodedUser.data);
        // console.log("User Verified:", result);
      } catch (err: any) {
        localStorage.removeItem("token");
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
    nav("/");
    window.location.reload();
  };

  const updateUser = async (uid: string, updates: Partial<User>) => {
    try {
      const response = await updateUserApi(uid, updates);
      setUser({
        ...user,
        ...response,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await verifyAuth();
    };
    initializeAuth();
    // Listen for auth state changes and refresh tokens automatically
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        let token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }
        const newToken = await user.getIdToken(true); // Force token refresh
        // setToken(newToken);
        localStorage.setItem("token", newToken);
        await getUser();
        // console.log("Token Refreshed:", newToken);
      } else {
        setUser(null);
        // setToken(null);
        localStorage.removeItem("token");
      }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleGoogleLogin,
        handleLogout,
        user,
        updateUser,
        error,
        setError,
        // role,
        // setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
