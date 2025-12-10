import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";


export const updateInvoice = async (invoiceId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/v1/invoices/update/${invoiceId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

