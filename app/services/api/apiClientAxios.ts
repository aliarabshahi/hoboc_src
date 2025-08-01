// services/api/fetchApiData.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "@/app/types/coursesType"; // ✅ import generic wrapper

const API_BASE_URL = "http://localhost/hoboc/api/";
const API_TOKEN = "4e496e0820b6515d1f62d989f8811d99a6aa451f";

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
