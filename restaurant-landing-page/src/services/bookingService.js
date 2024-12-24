import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bookings';

export const bookingService = {
    createBooking: async (bookingData) => {
        try {
            // Format the data to match the backend expectations
            const formattedData = {
                ...bookingData,
                date: bookingData.date, // Already in YYYY-MM-DD format
                time: bookingData.time, // Already in HH:mm format
            };

            console.log('Sending formatted booking data:', formattedData);
            
            const response = await axios.post(API_URL, formattedData);
            return response.data;
        } catch (error) {
            console.error('Booking error:', error);
            throw error.response?.data || 'Failed to create booking';
        }
    }
}; 