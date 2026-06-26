import api from "../../services/axios";

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    console.log("Response:", response);
    console.log("Response data:", response.data);
    return response.data;

  } catch (err) {
    console.log(err);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function profile() {
  try {
    const response = await api.get("/api/auth/profile");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function refreshAccessToken(){
  try {
    const response = await api.post("/api/auth/refresh-token");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


