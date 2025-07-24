// app/notifications/components/NotificationImage.tsx
"use client";
import Image from "next/image";

export default function NotificationImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/forms_images/notification.svg" // You'll need to add this image
        alt="اطلاع‌رسانی‌ها"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}