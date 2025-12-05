import axios from 'axios';

export const updateInvoice = async (invoiceId, formData) => {
  try {
    const response = await axios.put(`http://localhost:3030/v1/invoices/update/${invoiceId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

