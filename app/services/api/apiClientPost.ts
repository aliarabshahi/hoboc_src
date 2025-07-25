// app/services/api/postData.ts

export const postApiData = async <T>(
  endpoint: string,
  body: Record<string, any>
): Promise<{ data: T | null; error?: string }> => {
  const baseUrl = 'http://localhost/hoboc/api';
  const token = '4e496e0820b6515d1f62d989f8811d99a6aa451f';

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 400) {
        const errorData = await res.json();
        const errorMsg = Object.values(errorData)
          .flat()
          .join(' | ');
        throw new Error(`درخواست نامعتبر: ${errorMsg}`);
      } else if (res.status === 401) {
        throw new Error('عدم دسترسی: لطفا وارد شوید');
      } else if (res.status === 403) {
        throw new Error('شما مجوز ندارید');
      } else if (res.status === 404) {
        throw new Error('آدرس ای‌پی‌آی اشتباه است');
      } else if (res.status >= 500) {
        throw new Error('خطای سرور. لطفا بعداً تلاش کنید');
      } else {
        throw new Error(`خطای ${res.status}`);
      }
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : 'مشکلی در ارسال داده‌ها رخ داده است';

    return {
      data: null,
      error: msg,
    };
  }
};
