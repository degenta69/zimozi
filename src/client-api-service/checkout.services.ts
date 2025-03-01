import { Order } from "@/models/Order";
import ApiService from "./axios.service";

export const checkout = async (orderData: Pick<Order, "items" | "totalAmount">) => {
  const { data } = await ApiService.post("/checkout", orderData);
  return data;
};
