// get user by uid and use authenticated axios instance

import { User } from "@/models/User";
import ApiService from "./axios.service";
import { UserRoles } from "@/typings/enum";

export const getUserById = async (uid: string) => {
  const { data } = await ApiService.get(`/user/${uid}`);
  return data;
};

export const updateUser = async (uid: string, updates: Partial<User>) => {
  const { data } = await ApiService.put(`/user/${uid}`, updates);
  return data;
};
export const getUsers = async () => {
  const response = await ApiService.get(`/user`);
  return response.data;
};

export const updateUserRole = async (userId: any, isAdmin: any) => {
  const response = await ApiService.put(
    `/user/${userId}`,
    { role: isAdmin ? UserRoles.USER : UserRoles.ADMIN },
    { withCredentials: true }
  );
  return response.data;
};
