"use client";
import { useState } from "react";
import NavbarRight from "./NavbarRight";
import NavbarCenter from "./NavbarCenter";
import NavbarLeft from "./NavbarLeft";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full border-b bg-white text-sm shadow-sm">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:px-14"
        dir="rtl"
      >
        {/* Mobile hamburger (right side) */}
        <div className="block md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo and Menu Container */}
        <div className="flex items-center md:gap-4 flex-1 md:flex-none justify-center md:justify-start">
          {/* HOBOC Logo */}
          <div className="md:mr-4">
            <NavbarRight />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <NavbarCenter />
          </div>
        </div>

        {/* Desktop buttons (shrink = false) */}
        <div className="hidden lg:flex">
          <NavbarLeft shrink={false} />
        </div>

        {/* Mobile & mid-width login (shrink = true) */}
        <div className="block lg:hidden">
          <NavbarLeft shrink={true} />
        </div>
      </div>

      {/* Mobile Menu content */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4" dir="rtl">
          <NavbarCenter />
        </div>
      )}
    </div>
  );
}
