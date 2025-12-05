import axios from 'axios';

export const viewInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`http://localhost:3030/v1/invoices/fetch/${invoiceId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

