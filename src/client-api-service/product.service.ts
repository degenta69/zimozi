import { Product } from "@/models/Product";
import ApiService from "./axios.service";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_LIVE; // Change based on your backend URL

export const getAllProducts = async (
  cursor?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  let url = `/product?limit=10`;
  if (cursor) url += `&cursor=${cursor}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (minPrice !== undefined) url += `&minPrice=${minPrice}`;
  if (maxPrice !== undefined) url += `&maxPrice=${maxPrice}`;

  const { data } = await axios.get(API_BASE_URL + url);
  return data;
};

export const createProduct = async (product: Omit<Product, "uid">) => {
  const { data } = await ApiService.post("/product", product);
  return data;
};

export const getProductById = async (uid: string) => {
  const { data } = await ApiService.get(`/product/${uid}`);
  return data;
};

export const getProductsByIds = async (productIds: string[]) => {
  const { data } = await ApiService.post(`/product/by-ids`, { productIds });
  return data;
};

export const updateProduct = async (uid: string, updates: Partial<Product>) => {
  const { data } = await ApiService.put(`/product/${uid}`, updates);
  return data;
};

export const deleteProduct = async (uid: string) => {
  const { data } = await ApiService.delete(`/product/${uid}`);
  return data;
};
