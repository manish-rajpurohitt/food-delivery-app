// apiService.js
import axios from 'axios';

// Default base URL
let API_BASE_URL = 'https://api.example.com';

// Function to set the base URL dynamically
export const setBaseUrl = (url) => {
    API_BASE_URL = url;
};

const handleRequestError = (error) => {
    if (error.response) {
        console.error('Response error:', error.response.data);
        return error.response.data;
    } else if (error.request) {
        console.error('Request error:', error.request);
        return { error: 'No response received from the server.' };
    } else {
        console.error('Request setup error:', error.message);
        return { error: 'Error setting up the request.' };
    }
};

const apiService = {
    get: async (url, params = {}, token = null) => {
        try {
            let options = {
                params: params,
            }
            if (token) {
                let token = localStorage.getItem("_token");
                options.headers = {
                    "authorization": "Bearer " + token,
                    "Authorization": "Bearer " + token,
                }
            }

            const response = await axios.get(`${API_BASE_URL}${url}`, { ...options });
            return response.data;
        } catch (error) {
            return handleRequestError(error);
        }
    },

    post: async (url, data, token = null) => {
        try {
            let options = {
                headers: {}
            };
            if (token) {
                let token = localStorage.getItem("_token");
                options.headers = {
                    "authorization": "Bearer " + token,
                    "Authorization": "Bearer " + token,
                }
            }
            const response = await axios.post(`${API_BASE_URL}${url}`, data, options);
            return response.data;
        } catch (error) {
            return handleRequestError(error);
        }
    },

    put: async (url, data, token = null) => {
        try {
            const response = await axios.put(`${API_BASE_URL}${url}`, data);
            return response.data;
        } catch (error) {
            return handleRequestError(error);
        }
    },

    delete: async (url, token = null) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}${url}`);
            return response.data;
        } catch (error) {
            return handleRequestError(error);
        }
    },
};

export default apiService;
