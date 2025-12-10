import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";
// strip trailing slashes just in case
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

console.log("[loginAuthenticate] API_BASE_URL:", API_BASE_URL);

export const login = async (email, password) => {
  // ✅ NOTE THE SLASH AFTER API_BASE_URL
  const url = `${API_BASE_URL}/v1/users/login`;
  console.log("[loginAuthenticate] about to POST to:", url);

  try {
    const response = await axios.post(url, { email, password });
    console.log("[loginAuthenticate] response status:", response.status);
    return response.data;
  } catch (error) {
    console.error("[loginAuthenticate] axios error:", error);
    throw error;
  }
};
