import { db } from "../config/firebase";
import { Cart, CartItem } from "../../../models/Cart";

const cartCollection = db.collection("carts");

export class CartService {
  // Get user's cart
  static async getCart(userId: string): Promise<Cart | null> {
    const doc = await cartCollection.doc(userId).get();
    return doc.exists ? (doc.data() as Cart) : null;
  }

  // Add product to cart
  static async addToCart(userId: string, product: CartItem): Promise<Cart> {
    const cartDoc = cartCollection.doc(userId);
    const cart = await cartDoc.get();
    let updatedCart: Cart;

    if (cart.exists) {
      const existingCart = cart.data() as Cart;
      const existingItem = existingCart.items.find((item) => item.productId === product.productId);

      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        existingCart.items.push(product);
      }
      existingCart.updatedAt = new Date().toISOString();
      updatedCart = existingCart;
    } else {
      updatedCart = { uid: userId, items: [product], updatedAt: new Date().toISOString() };
    }

    await cartDoc.set(updatedCart);
    return updatedCart;
  }

  // Update product quantity
  static async updateCartItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Cart | null> {
    const cartDoc = cartCollection.doc(userId);
    const cart = await cartDoc.get();

    if (!cart.exists) return null;

    const existingCart = cart.data() as Cart;
    const item = existingCart.items.find((item) => item.productId === productId);
    if (!item) return null;

    item.quantity = quantity;
    existingCart.updatedAt = new Date().toISOString();

    await cartDoc.set(existingCart);
    return existingCart;
  }

  // Remove product from cart
  static async removeFromCart(userId: string, productId: string): Promise<Cart | null> {
    const cartDoc = cartCollection.doc(userId);
    const cart = await cartDoc.get();

    if (!cart.exists) return null;

    const existingCart = cart.data() as Cart;
    existingCart.items = existingCart.items.filter((item) => item.productId !== productId);
    existingCart.updatedAt = new Date().toISOString();

    await cartDoc.set(existingCart);
    return existingCart;
  }

  // Clear cart
  static async clearCart(userId: string): Promise<boolean> {
    await cartCollection.doc(userId).delete();
    return true;
  }
}
