import { Product } from "./Product";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface EnrichOrder extends Order {
  user: {
    name: string;
    email: string;
  };
  items: {
    productId: string;
    quantity: number;
    product: Product;
  }[];
}
