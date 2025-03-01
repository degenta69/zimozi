import ApiService from "./axios.service";

export const getCart = async (uid: string) => {
  const { data } = await ApiService.get(`/cart?uid=${uid}`);
  return data;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  const { data } = await ApiService.post("/cart/add", { productId, quantity });
  return data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const { data } = await ApiService.put("/cart/update", { productId, quantity });
  return data;
};

export const removeCartItem = async (productId: string) => {
  const { data } = await ApiService.delete(`/cart/remove/${productId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await ApiService.delete("/cart/clear");
  return data;
};
