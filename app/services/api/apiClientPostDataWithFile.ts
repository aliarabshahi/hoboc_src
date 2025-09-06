import { API_BASE_URL, API_TOKEN } from "@/app/services/config/config";

/** Sends multipart/form-data POST requests (with file uploads) to API and returns typed data or error message */
export const postApiDataWithFile = async <T>(
  endpoint: string,
  formData: FormData
): Promise<{ data: T | null; error?: string }> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 400) {
        const errorData = await res.json();
        const errorMsg = Object.values(errorData).flat().join(" | ");
        throw new Error(`درخواست نامعتبر: ${errorMsg}`);
      } else if (res.status === 401) {
        throw new Error("عدم دسترسی: لطفا وارد شوید");
      } else if (res.status === 403) {
        throw new Error("شما مجوز ندارید");
      } else if (res.status === 404) {
        throw new Error("آدرس ای‌پی‌آی اشتباه است");
      } else if (res.status >= 500) {
        throw new Error("خطای سرور. لطفا بعداً تلاش کنید");
      } else {
        throw new Error(`خطای ${res.status}`);
      }
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "مشکلی در ارسال داده‌ها رخ داده است";

    return {
      data: null,
      error: msg,
    };
  }
};
