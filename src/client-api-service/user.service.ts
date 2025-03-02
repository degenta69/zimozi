// get user by uid and use authenticated axios instance

import { User } from "@/models/User";
import ApiService from "./axios.service";

export const getUserById = async (uid: string) => {
  const { data } = await ApiService.get(`/user/${uid}`);
  return data;
};

export const updateUser = async (uid: string, updates: Partial<User>) => {
  const { data } = await ApiService.put(`/user/${uid}`, updates);
  return data;
};
