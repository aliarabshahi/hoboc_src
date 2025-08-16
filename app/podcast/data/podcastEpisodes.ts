import { type Episode } from "../lib/episodes"

export const podcastEpisodes: Episode[] = [
  {
    id: 1,
    title: "مصاحبه با معمار داده",
    published: new Date("2022-02-24"),
    description:
      "گفتگو درباره طراحی معماری داده‌های مقیاس‌پذیر و چالش‌های مدیریت پایپ‌لاین‌ها.",
    content: `
      <p>در این قسمت با یک معمار داده با تجربه صحبت می‌کنیم که در مورد اصول طراحی معماری داده، 
      بهینه‌سازی پردازش‌ها، و چگونگی ایجاد زیرساختی پایدار برای تحلیل‌های حجیم توضیح می‌دهد.</p>
    `,
    audio: {
      src: "http://localhost/hoboc/media/yanni_blue.mp3", // فایل mp3 را در مسیر /public/episodes/ قرار دهید
      type: "audio/mpeg",
    },
  },
  {
    id: 2,
    title: "مهندس پایپ‌لاین داده",
    published: new Date("2022-02-17"),
    description:
      "بررسی بهترین روش‌ها برای ساخت و نگهداری پایپ‌لاین‌های داده در محیط‌های تولیدی.",
    content: `
      <p>در این قسمت درباره ابزارها، فریم‌ورک‌ها، و تکنیک‌های نگهداری پایپ‌لاین‌های داده صحبت می‌کنیم، 
      از Airflow و Spark گرفته تا استراتژی‌های مانیتورینگ و بازیابی.</p>
    `,
    audio: {
      src: "http://localhost/hoboc/media/yanni_blue.mp3",
      type: "audio/mpeg",
    },
  },
  {
    id: 3,
    title: "تحلیلگر داده و کشف بینش‌ها",
    published: new Date("2022-02-10"),
    description:
      "راهکارهای عملی برای استخراج بینش‌های ارزشمند از داده‌های خام.",
    content: `
      <p>با یک تحلیلگر داده گفتگو می‌کنیم درباره روش‌های آماده‌سازی داده، 
      تکنیک‌های مدل‌سازی آماری، و استفاده از مصورسازی داده برای به‌دست آوردن 
      تصمیمات بهتر در کسب‌وکار.</p>
    `,
    audio: {
      src: "http://localhost/hoboc/media/yanni_blue.mp3",
      type: "audio/mpeg",
    },
  },
]
