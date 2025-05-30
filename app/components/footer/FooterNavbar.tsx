// components/footer/FooterNavbar.tsx
import Link from "next/link";

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

export default function FooterNavbar() {
  return (
    <div className="flex justify-between gap-8">
      {navItems.map((item, index) => (
        <nav key={index} className="flex-1 space-y-2">
          <h6 className="footer-title text-lg font-bold whitespace-nowrap">{item.title}</h6>
          <div className="flex flex-col space-y-1">
            {item.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.href}
                className="text-sm transition-colors whitespace-nowrap hover:no-underline"
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