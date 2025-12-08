import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (email, password, name, phone) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/users/signup`, { email, password, name, phone });
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error.response?.data || error.message);
    throw error;
  }
};
