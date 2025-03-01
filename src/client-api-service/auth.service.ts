import axios from "axios";
import ApiService from "./axios.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_LOCAL; // Change based on your backend URL

export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  role: string
) => {
  return axios.post(`${API_BASE_URL}/auth/register`, { email, password, displayName, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const loginWithGoogle = async (idToken: string) => {
  return axios.post(`${API_BASE_URL}/auth/google-login`, { idToken });
};

export const getLoggedInUser = async () => {
  return ApiService.get(`${API_BASE_URL}/auth/me`);
};

export const verifyUserToken = async () => {
  return ApiService.get(`${API_BASE_URL}/auth/verify`);
};
