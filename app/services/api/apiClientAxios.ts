import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "@/app/types/coursesType";
import { API_BASE_URL, API_TOKEN } from "@/app/services/config/config";

/** Generic GET request helper for typed API responses */
export const fetchApiData = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(
      `${API_BASE_URL}${endpoint}/`,
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
    throw new Error(err.message || "Failed to fetch data");
  }
};
