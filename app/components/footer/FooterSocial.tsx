import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    name: "لینکدین",
    href: "https://linkedin.com",
    icon: <FaLinkedin size={24} color="#0A66C2" />,  // رنگ رسمی لینکدین (آبی)
  },
  {
    name: "یوتیوب",
    href: "https://youtube.com",
    icon: <FaYoutube size={24} color="#FF0000" />,  // قرمز یوتیوب
  },
  {
    name: "اینستاگرام",
    href: "https://instagram.com",
    icon: <FaInstagram size={24} color="#E4405F" />,  // رنگ رسمی اینستا
  },
  {
    name: "تلگرام",
    href: "https://t.me/yourtelegram",
    icon: <FaTelegramPlane size={24} color="#0088cc" />,  // آبی تلگرام
  },
];

export default function FooterSocial() {
  return (
    <nav className="flex flex-col items-center space-y-4">
      <div className="pb-1">
        <Image
          src="/real-logo.png"
          alt="لوگو"
          width={100}
          height={100}
          priority
        />
      </div>

      <h6 className="footer-title text-lg font-bold">شبکه‌های اجتماعی</h6>

      <div className="flex flex-row justify-center gap-x-6">
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}
