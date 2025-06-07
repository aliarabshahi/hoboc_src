import axios, { AxiosResponse, AxiosError } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost/hoboc/api/';
const API_TOKEN = 'fb65966b2be41961bf8d41278c85782e3c0ee4a7'; // Replace with your token

// Define API response structure
interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Generic API client function
export const fetchApiData = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean> // Optional query params
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(
      `${API_BASE_URL}${endpoint}/`, // Ensure trailing slash (Django convention)
      {
        params,
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.message || 'Failed to fetch data');
  }
};