import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3030/v1/users/login', { email, password });
        localStorage.setItem(`authToken`, response.data.token)
        return response.data;
    } catch (error) {
        throw error;
    }
};