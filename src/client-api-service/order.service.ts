import ApiService from "./axios.service";

export const getMyOrders = async () => {
  const { data } = await ApiService.get("/order/my-orders");
  return data;
};

export const getAllOrders = async () => {
  const { data } = await ApiService.get("/order");
  return data;
};
