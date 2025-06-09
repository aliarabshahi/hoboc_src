// components/footer/Footer.tsx
import FooterNavbar from "./FooterNavbar";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="footer bg-base-300 text-base-content py-10 px-60 border-t border-gray-300 bg-white" dir="rtl">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <FooterSocial />
          <FooterNavbar />
        </div>
      </div>
    </footer>
  );
}