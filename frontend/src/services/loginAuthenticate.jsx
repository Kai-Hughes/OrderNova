import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";

export const login = async (email, password) => {
  const url = `${rawBaseUrl}/v1/users/login`;
  console.log("[loginAuthenticate] about to POST to:", url);

  console.log(
    `[API_BASE_URL] using ${import.meta.env.VITE_API_BASE_URL ? 'env var' : 'localhost fallback'}: ${rawBaseUrl}`
  );


  try {
    const response = await axios.post(url, { email, password });
    console.log("[loginAuthenticate] response status:", response.status);
    return response.data;
  } catch (error) {
    console.error("[loginAuthenticate] axios error:", error);
    throw error;
  }
};
