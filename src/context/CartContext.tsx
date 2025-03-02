import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/client-api-service/cart.service";
import { CartItem } from "@/models/Cart";
import { useLoading } from "./LodingContext";

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await getCart(user.uid);
          setCart(response?.items || []);
        } catch (error) {
          console.error("Failed to fetch cart from DB:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
        } catch (error) {
          console.error("Failed to load cart from local storage:", error);
          setCart([]);
        }
      }
    };
    loadCart();
  }, [user?.uid]);

  useEffect(() => {
    if (!user && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCartHandler = async (productId: string, quantity: number) => {
    if (user) {
      try {
        setLoading(true);
        await addToCart(productId, quantity);
        const response = await getCart(user.uid);
        setCart(response?.items || []);
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.productId === productId);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevCart, { productId, quantity }];
      });
    }
  };

  const removeFromCartHandler = async (productId: string) => {
    if (user) {
      try {
        setLoading(true);
        await removeCartItem(productId);
        const response = await getCart(user.uid);
        setCart(response?.items || []);
      } catch (error) {
        console.error("Error removing from cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    }
  };

  const updateQuantityHandler = async (productId: string, quantity: number) => {
    if (user) {
      try {
        setLoading(true);
        await updateCartItem(productId, quantity);
        const response = await getCart(user.uid);
        setCart(response?.items || []);
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCartHandler = async () => {
    if (user) {
      try {
        setLoading(true);
        await clearCart();
        setCart([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        updateQuantity: updateQuantityHandler,
        clearCart: clearCartHandler,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
