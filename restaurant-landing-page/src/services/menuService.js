import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const menuService = {
    getAllMenuItems: async () => {
        try {
            console.log('Making request to:', `${API_URL}/menu`);
            const response = await axios.get(`${API_URL}/menu`);
            console.log('Response received:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    createOrder: async (orderData) => {
        try {
            const response = await axios.post(`${API_URL}/orders`, orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
};