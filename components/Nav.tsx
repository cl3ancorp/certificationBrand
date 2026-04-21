"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about-us", label: "About Us", hasLogo: false },
    { href: "/figures", label: "Figures", hasLogo: true },
    { href: "/directory", label: "Sources", hasLogo: true },
    { href: "/become-clean-certified", label: "Pathway", hasLogo: true },
  ];

  const isActive = (href: string): boolean => pathname === href;

  return (
    <nav className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN BAR, justify-between */}
        <div className="flex items-center h-20 justify-between md:justify-start gap-4 md:gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/branding/cl3an_home_logo.png"
              alt="CL3AN Logo"
              className="h-30 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive(link.href)
                    ? "text-[#2d5f5d]"
                    : "text-gray-900 hover:text-[#2d5f5d]"
                }`}
              >
                {link.hasLogo && (
                  <img
                    src="/images/branding/Logotipo-Cl3an-28.png"
                    alt="CL3AN"
                    className="h-4"
                  />
                )}
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-900"
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 py-6 border-t border-gray-100">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-[#2d5f5d]"
                    : "text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      </div>
    </nav>
  );
}
