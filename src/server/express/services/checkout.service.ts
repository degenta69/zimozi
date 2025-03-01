import { Order } from "@/models/Order";
import { OrderService } from "./order.service";

export class CheckoutService {
  static async processCheckout(userId: string, orderData: Omit<Order, "id">) {
    try {
      const order = await OrderService.createOrder(userId, orderData);
      return order;
    } catch (error: any | Error) {
      throw new Error("Checkout failed: " + error.message);
    }
  }
}
