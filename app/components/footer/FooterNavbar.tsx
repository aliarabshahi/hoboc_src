// app/components/footer/FooterNavbar.tsx
import Link from "next/link";

/** Navigation groups and their Persian labels/links */
const navItems = [
  {
    title: "شرکت",
    links: [
      { text: "درباره ما", href: "/about" },
      { text: "تماس با ما", href: "/contact" },
      { text: "فرصت‌های شغلی", href: "/jobs" },
      { text: "پرسش‌های متداول", href: "/faq" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { text: "برندینگ", href: "/branding" },
      { text: "طراحی", href: "/design" },
      { text: "مارکتینگ", href: "/marketing" },
      { text: "تبلیغات", href: "/advertisement" },
    ],
  },
];

/** Footer navigation section with grouped Persian menu links */
export default function FooterNavbar() {
  return (
    <div className="flex justify-between gap-8">
      {navItems.map((item, index) => (
        <nav key={index} className="flex-1 space-y-2">
          <h6 className="text-lg font-bold text-black whitespace-nowrap">
            {item.title}
          </h6>
          <div className="flex flex-col space-y-1">
            {item.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors whitespace-nowrap"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      ))}
    </div>
  );
}
