import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-hoboc/10 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* تصویر */}
        <div className="w-full max-w-md mx-auto mb-8">
          <Image
            src="/hero_images/404_not_found2.svg"
            alt="تصویر صفحه پیدا نشد"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* محتوا */}
        <h1 className="text-5xl font-bold text-hoboc-dark mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">گم شدی دوست من؟</h2>
        <p className="text-lg text-gray-600 mb-8">
          به نظر میاد صفحه‌ای که دنبالشی یا وجود نداره یا یه جای دیگه رفته!<br />
          نگران نباش، می‌تونیم کمکت کنیم که برگردی به مسیر درست.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-hoboc text-white font-medium rounded-lg shadow-md hover:bg-hoboc-dark transition-colors duration-300"
          >
            صفحه اصلی 
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-hoboc text-hoboc font-medium rounded-lg hover:bg-hoboc/10 transition-colors duration-300"
          >
            تماس با پشتیبانی 
          </Link>
        </div>

        {/* متن پایینی */}
        <div className="mt-10 text-sm text-gray-500">
          <p>اگه فکر می‌کنی اینجا باید صفحه‌ای باشه، بهمون خبر بده!</p>
        </div>
      </div>
    </div>
  )
}