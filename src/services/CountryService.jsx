import axios from 'axios';

const COUNTRIES_API_URL = 'http://localhost:8080/countries';

export const getAllCountries = async () => {
    try {
        const response = await axios.get(COUNTRIES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};