// models/Cart.ts
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  uid: string; // User ID
  items: CartItem[];
  updatedAt: string;
}
