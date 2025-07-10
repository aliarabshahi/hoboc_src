// components/ContactInfo.tsx
"use client";

import { FaPhone, FaEnvelope, FaClock, FaPhoneAlt } from "react-icons/fa";
import { FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { BsTelegram, BsGithub } from "react-icons/bs";

export default function ContactInfo() {
  return (
    <div className="bg-hoboc text-white rounded-lg p-4 space-y-3 w-full lg:max-w-[260px] text-sm">
      <h2 className="text-xl font-semibold mb-2">تماس با ما</h2>

      <div className="flex items-center gap-2 justify-start">
        <FaPhone className="text-base" />
        <span>۰۲۱ ۹۱۰۷ ۰۶۲۹</span>
      </div>

      <div className="flex items-center gap-2 justify-start">
        <FaPhoneAlt className="text-base" />
        <span>بوت‌کمپ: داخلی ۱۰۹</span>
      </div>

      <div className="flex items-center gap-2 justify-start">
        <FaEnvelope className="text-base" />
        <span>contact@yourdomain.com</span>
      </div>

      <div className="flex items-start gap-2 justify-start">
        <FaClock className="text-base mt-1" />
        <div className="space-y-1">
          <p>شنبه تا سه‌شنبه ۹ تا ۱۸</p>
          <p>چهارشنبه ۹ تا ۱۷</p>
        </div>
      </div>

      <div className="flex gap-3 pt-2 justify-start">
        <a href="#" className="hover:opacity-80">
          <FiLinkedin size={18} />
        </a>
        <a href="#" className="hover:opacity-80">
          <FiInstagram size={18} />
        </a>
        <a href="#" className="hover:opacity-80">
          <FiTwitter size={18} />
        </a>
        <a href="#" className="hover:opacity-80">
          <BsTelegram size={18} />
        </a>
        <a href="#" className="hover:opacity-80">
          <BsGithub size={18} />
        </a>
      </div>
    </div>
  );
}
