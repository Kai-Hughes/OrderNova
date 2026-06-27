import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";


export const viewInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/invoices/fetch/${invoiceId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

