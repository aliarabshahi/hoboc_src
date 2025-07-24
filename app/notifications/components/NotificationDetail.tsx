// app/notifications/components/NotificationDetail.tsx
"use client";
import { FaBell, FaMobileAlt, FaQuestionCircle } from "react-icons/fa";

export default function NotificationDetail() {
  return (
    <div className="w-full bg-hoboc rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-xl font-bold text-white mb-8 text-center">
        درباره سیستم اطلاع‌رسانی
      </h3>
      
      <div className="space-y-6 text-white" dir="rtl">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <FaBell className="text-xl text-white" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">چگونه کار می‌کند؟</h4>
            <p className="text-sm text-white/90">
              با ثبت شماره موبایل و علاقه‌مندی‌ها، آخرین مطالب مرتبط را از طریق پیامک دریافت خواهید کرد.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <FaMobileAlt className="text-xl text-white" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">اطلاعات شما</h4>
            <p className="text-sm text-white/90">
              شماره موبایل شما فقط برای ارسال اطلاع‌رسانی‌های مورد علاقه شما استفاده می‌شود.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <FaQuestionCircle className="text-xl text-white" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">سوالات متداول</h4>
            <p className="text-sm text-white/90">
              برای لغو اشتراک می‌توانید در پاسخ هر پیامک کلمه "لغو" را ارسال کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}