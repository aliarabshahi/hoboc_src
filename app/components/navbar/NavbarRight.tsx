import Image from "next/image";

export default function NavbarRight() {
  return (
    // <div>
    //   <Image
    //     src="/logo.png"
    //     alt="Hoboc Logo"
    //     width={32}  // عرض مورد نظر
    //     height={32} // ارتفاع مورد نظر
    //     className="h-8 w-auto"
    //     priority // برای تصاویر مهم در بالای صفحه
    //   />
    // </div>
    <div className="text-lg md:text-2xl font-bold text-hoboc">HOBOC</div>
  );
}
