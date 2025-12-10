// loginAuthenticate.ts / signupAuthenticate.ts, etc.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";

console.log("API_BASE_URL (built app):", API_BASE_URL);

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(
      "Login network error:",
      error.response?.data || error.message || error
    );
    throw error;
  }
};
