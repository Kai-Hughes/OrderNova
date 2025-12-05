import axios from 'axios';

export const signup = async (email, password, name, phone) => {
  try {
    const response = await axios.post('http://localhost:3030/v1/users/signup', { email, password, name, phone });
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error.response?.data || error.message);
    throw error;
  }
};
