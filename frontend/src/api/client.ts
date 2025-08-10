import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	// timeout: 10000
});

apiClient.interceptors.request.use(
	(config) => {
		const token: string | null = localStorage.getItem('authToken');
		if (token) {
			config.headers = config.headers || {};
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		// ✅ Automatically set Content-Type based on data type
		if (config.data instanceof FormData) {
			config.headers['Content-Type'] = 'multipart/form-data';
		} else {
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	(error: unknown) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return {
			...response,
		};
	},
	(error: AxiosError) => {
		let errorMessage: string;
		const data = error.response?.data as { message?: string } | string | undefined;

		if (typeof data === 'string') {
			errorMessage = data;
		} else if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
			errorMessage = data.message;
		} else {
			errorMessage = error.message || 'Server error occurred';
		}

		// Show toast error
		console.error('API Error:', errorMessage);

		return Promise.resolve({
			data: null,
			success: false,
			error: errorMessage,
			status: error.response?.status || 500,
			statusText: error.response?.statusText || 'Error'
		});
	}
);

export default apiClient;