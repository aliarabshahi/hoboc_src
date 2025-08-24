/** Generic GET request helper with error handling and fallback messages */
export const getApiData = async (endpoint: string) => {
  const baseUrl = "http://localhost/hoboc/api";

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        Authorization: "Token 1ecdf57453ff0f1ce5ec4fe905ef6c699e0434a3",
      },
      cache: "no-cache",
      // next: { revalidate: 3600 }, // Optional: revalidation hint for Next.js
    });

    // Map HTTP status codes to Persian user-facing messages
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("عدم دسترسی: لطفا وارد سیستم شوید");
      } else if (res.status === 403) {
        throw new Error("شما مجوز دسترسی به این منبع را ندارید");
      } else if (res.status === 404) {
        throw new Error("منبع مورد نظر یافت نشد. آدرس ای پی آی اشتباهه داداش");
      } else if (res.status >= 500) {
        throw new Error("خطای سرور: لطفا بعدا تلاش کنید");
      } else {
        throw new Error(`خطای ${res.status}: مشکلی در ارتباط با سرور پیش آمده`);
      }
    }

    const data = await res.json();

    // Handle cases where results array or nested data array is empty
    if (Array.isArray(data.results) && data.results.length === 0) {
      return { data: [], message: "داده‌ای برای نمایش وجود ندارد" };
    }
    if (data.results?.data && data.results.data.length === 0) {
      return { data: [], message: "داده‌ای برای نمایش وجود ندارد" };
    }

    // Normalize common API response shapes
    if (Array.isArray(data.results)) return { data: data.results };
    if (data.results?.data) return { data: data.results.data };

    return { data };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";

    // Handle network-level errors
    if (
      msg.includes("fetch failed") ||
      msg.includes("Failed to fetch") ||
      msg.includes("NetworkError") ||
      msg.includes("ECONNREFUSED") ||
      msg.includes("ENOTFOUND")
    ) {
      return {
        data: null,
        error: "سرور بک‌اند در دسترس نیست. لطفاً بعداً تلاش کنید.",
      };
    }

    return {
      data: null,
      error: msg || "متاسفانه مشکلی در ارتباط با سرور رخ داده است",
    };
  }
};
