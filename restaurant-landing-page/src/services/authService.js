import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const authService = {
    login: async (credentials) => {
        try {
            console.log('Attempting login with:', credentials); // Debug log
            
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            console.log('Login response:', response.data); // Debug log
            
            if (response.data) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            }
        } catch (error) {
            console.error('Login error details:', error.response?.data); // Debug log
            throw new Error(error.response?.data || 'Login failed');
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}; 