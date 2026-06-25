import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // to stop from infinte loop of refresh request if backend dont refresh properly
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url === "/api/auth/refresh-token") {
        return Promise.reject(error);
      }

      await api.post("/api/auth/refresh-token");

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
