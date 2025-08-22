const navbarLinks = [
  { label: "کالج", href: "/courses/" },
  { label: "بلاگ", href: "/blog/" },
  { label: "استخدام", href: "/join-us/" },
  { label: "سفارش پروژه", href: "/project-order/" },
  { label: "پادکست", href: "/podcast/" },
  { label: "درباره ما", href: "/about/" },

];

export default function NavbarMenu() {
  return (
    <ul className="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-600">
      {navbarLinks.map((item, index) => (
        <li key={index}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}
