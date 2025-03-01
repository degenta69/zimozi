// get user by uid and use authenticated axios instance

import ApiService from "./axios.service";

export const getUserById = async (uid: string) => {
  const { data } = await ApiService.get(`/user/${uid}`);
  return data;
};
