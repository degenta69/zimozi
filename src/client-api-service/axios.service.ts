import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_LIVE,
  headers: { "Content-Type": "application/json" },
});

// **Request Interceptor: Adds Access Token to Headers**
ApiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default ApiService;
