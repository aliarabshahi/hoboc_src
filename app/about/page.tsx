import { FaHandsHelping, FaRocket, FaUserGraduate } from "react-icons/fa";

export const metadata = {
  title: "درباره ما | هوبوک",
  description: "با ما بیشتر آشنا شوید – آموزش رایگان مهندسی داده و انجام پروژه‌های تخصصی",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-hoboc dark:text-hoboc">
            درباره <span className="text-hoboc-dark">هوبوک</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            یه جایی برای یاد گرفتن، پیشرفت کردن و ساختن آینده‌ای که با دیتا روشن‌تره
          </p>
        </div>

        {/* "هوبوک چیست؟" */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm text-justify leading-7 text-gray-700 dark:text-gray-200">
          <h2 className="text-xl font-bold mb-4 text-hoboc-dark">هوبوک چیه اصلاً؟</h2>
          <p className="mb-4">
            هوبوک یه پلتفرم خودجوشه که چند تا مهندس با عشق به داده راه انداختن. هدف‌مون ساده‌ست: کمک کنیم هر کسی که به دنیای مهندسی داده علاقه‌منده، بتونه بدون هزینه واردش بشه؛ نه تبلیغ داریم، نه هزینه، فقط یادگیری واقعی.
          </p>
          <p>
            علاوه بر آموزش، پروژه‌ هم انجام می‌دیم؛ از ساخت پایپ‌لاین‌های پیچیده گرفته تا تحلیل دیتاهای بزرگ با ابزارهایی مثل Kafka و Spark و کلی چیز دیگه. خلاصه اینکه هم آموزش داریم، هم عمل!
          </p>
        </div>

        {/* پروژه برای دیگران */}
        <div className="bg-hoboc/5 dark:bg-hoboc/10 p-6 rounded-xl shadow-sm text-justify leading-7 text-gray-700 dark:text-gray-200">
          <h2 className="text-xl font-bold mb-4 text-hoboc-dark">نیاز به تیم دیتایی داری؟</h2>
          <p className="mb-4">
            ما فقط آموزش نمی‌دیم، بلکه یه تیم واقعی از مهندسای داده‌ایم که حاضرن پروژه‌های شما رو هم انجام بدن — از تحلیل داده‌های پیچیده گرفته تا طراحی سیستم‌های داده‌محور، داشبوردهای مدیریتی، پیاده‌سازی Kafka و Spark و حتی مشاوره برای تیم‌هاتون.
          </p>
          <p>
            اگه پروژه‌ای داری که نیاز به تخصص داره، یا دوست داری یه تیم حرفه‌ای همراهت باشه، با ما در تماس باش. با هم بررسیش می‌کنیم و اگر خواستی، برات انجامش می‌دیم.
          </p>
        </div>

        {/* ویژگی‌ها */}
        <div className="grid gap-10 md:grid-cols-3 text-center text-gray-700 dark:text-gray-200">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
            <FaUserGraduate className="mx-auto text-hoboc text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">آموزش رایگان</h3>
            <p className="text-sm leading-6">
              تو هوبوک، یادگیری توی اولویته. آموزش‌هایی با کیفیت، کاملاً رایگان، درباره‌ی دیتا، ابزارهای حرفه‌ای، و تجربه‌هایی که تو هیچ کلاس دیگه‌ای نمی‌شنوی.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
            <FaRocket className="mx-auto text-hoboc text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">پروژه‌های واقعی</h3>
            <p className="text-sm leading-6">
              ما فقط تئوری نمی‌گیم. واقعاً پروژه انجام می‌دیم، از ایده تا اجرا. اگه دوست داری با مسائل واقعی سر و کله بزنی، جای درستی اومدی.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
            <FaHandsHelping className="mx-auto text-hoboc text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">یه جامعه‌ی باحال</h3>
            <p className="text-sm leading-6">
              ما اینجاییم تا یه جمع دوستانه و فعال بسازیم؛ کنار هم رشد کنیم، یاد بگیریم و کلی تجربه به اشتراک بذاریم. تو هم بیا کنارمون :)
            </p>
          </div>
        </div>

      
        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">آماده‌ای شروع کنیم؟</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">    چه بخوای یاد بگیری، چه پروژه داشته باشی، ما کنارتیم!
</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/courses"
              className="bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
            >
              مشاهده دوره‌ها
            </a>
            <a
              href="/contact"
              className="bg-white dark:bg-gray-800 border border-hoboc text-hoboc dark:text-hoboc-dark font-medium py-3 px-6 rounded-lg transition-colors hover:bg-hoboc/5 dark:hover:bg-hoboc/10"
            >
              تماس با ما
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
