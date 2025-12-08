import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/v1/users/login`, { email, password });
        localStorage.setItem(`authToken`, response.data.token)
        return response.data;
    } catch (error) {
        throw error;
    }
};