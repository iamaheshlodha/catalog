import apiClient from '../api/client';
import type { Product, ProductResponse, ProductTypeResponse } from '../api/types/api';
import { createQueryString } from '../utils';

export const productService = {
	// Get all products
	getAllProducts: async (params: Record<string, string | number>): Promise<ProductResponse> => {
		const queryString = createQueryString(params, true);
		const response = await apiClient.get<ProductResponse>(`/products?${queryString}`);
		return response.data;
	},

	// Get product by ID
	getProductById: async (id: string): Promise<{ data: Product }> => {
		const response = await apiClient.get<{ data: Product }>(`/products/${id}`);
		return response.data;
	},

	getAllProductTypes: async (): Promise<ProductTypeResponse> => {
		const response = await apiClient.get<ProductTypeResponse>('/product-types');
		return response.data;
	},
};