import axios from 'axios';

export const createInvoice = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3030/v1/invoices/create', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

