import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      if (originalRequest.url === "/api/auth/refresh-token") {
        return Promise.reject(error);
      }

      try {

        await api.post("/api/auth/refresh-token");

        return api(originalRequest);

      } catch (refreshError) {

        return Promise.reject(refreshError);

      }

    }

    return Promise.reject(error);

  }
);

export default api;
