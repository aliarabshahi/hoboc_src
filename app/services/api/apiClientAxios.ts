import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "@/app/types/coursesType"; // Generic API response wrapper

const API_BASE_URL = "http://localhost/hoboc/api/";
const API_TOKEN = "1ecdf57453ff0f1ce5ec4fe905ef6c699e0434a3";

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
    // Surface a clear error if the request fails
    throw new Error(err.message || "Failed to fetch data");
  }
};
