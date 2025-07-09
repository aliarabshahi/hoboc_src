import { FaHandsHelping, FaRocket, FaUserGraduate } from "react-icons/fa";

export default function Features() {
  return (
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
  );
}
