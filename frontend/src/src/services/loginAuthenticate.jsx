import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/users/login`, {
      email,
      password,
    });

    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
