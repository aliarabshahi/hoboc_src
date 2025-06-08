// services/api/fetchApiData.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "@/app/types/coursesType"; // ✅ import generic wrapper

const API_BASE_URL = "http://localhost/hoboc/api/";
const API_TOKEN = "fb65966b2be41961bf8d41278c85782e3c0ee4a7";

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
