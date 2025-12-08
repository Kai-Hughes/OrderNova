import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const createInvoice = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/invoices/create`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

