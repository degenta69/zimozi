import { Order, OrderStatus } from "@/models/Order";
import { db } from "../config/firebase";

export class OrderService {
  static async createOrder(userId: string, orderData: Omit<Order, "id">) {
    const productsToCheck = orderData.items;

    const availableProducts = await Promise.all(
      productsToCheck.map(async (product) => {
        const productSnapshot = await db.collection("products").doc(product.productId).get();
        const productData = productSnapshot.exists ? productSnapshot.data() : null;
        return {
          ...product,
          available: productData ? productData.stock >= product.quantity : false,
        };
      })
    );

    const unavailableProducts = availableProducts.filter((product) => !product.available);
    if (unavailableProducts.length > 0) {
      throw new Error(
        `The following products are out of stock: ${unavailableProducts
          .map((product) => product.productId)
          .join(", ")}`
      );
    }

    const orderRef = db.collection("orders").doc();
    const newOrder = {
      id: orderRef.id,
      userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
    };
    await orderRef.set(newOrder);
    return newOrder;
  }

  // Extracted function to enrich orders with user & product details
  private static async enrichOrders(orders: Order[]) {
    return await Promise.all(
      orders.map(async (order) => {
        // Fetch user details
        const userSnapshot = await db.collection("users").doc(order.userId).get();
        const userData = userSnapshot.exists ? userSnapshot.data() : null;

        // Fetch product details for each item in the order
        const itemsWithProductDetails = await Promise.all(
          order.items.map(async (item) => {
            const productSnapshot = await db.collection("products").doc(item.productId).get();
            const productData = productSnapshot.exists ? productSnapshot.data() : null;
            return { ...item, product: productData }; // Attach product details
          })
        );

        return { ...order, user: userData, items: itemsWithProductDetails };
      })
    );
  }

  static async getAllOrders() {
    const ordersSnapshot = await db.collection("orders").get();
    const orders = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
    return this.enrichOrders(orders);
  }

  static async getUserOrders(userId: string) {
    const snapshot = await db.collection("orders").where("userId", "==", userId).get();
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
    return this.enrichOrders(orders);
  }
}
