"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Nav() {

  const navLinks = [
    { href: '/about-us', label: 'About Us' },
    { href: '/beacons', label: 'Beacons' },
    { href: '/become-clean-certified', label: 'Become Clean Certified' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/directory', label: 'CL3AN Directory' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        
          <div className="flex">
            <Link href="/" className="mr-2">
                <img className="w-auto h-10" src={"/images/branding/Logotipo-Cl3an-12.png"} alt="Clean Corp Logo" />
            </Link>
            {/* Hamburger Menu Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="w-6 h-6 text-gray-700" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>
                        <div
                        className={`w-full cursor-pointer 'text-gray-700'`}
                        style={{ fontSize: '15px', fontWeight: 500 }}
                        >
                        {link.label}
                        </div>
                    </Link>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-center gap-0.5">
              <Link href="/directory" className="block">
                <img
                  className="h-10 w-auto block"
                  src="/images/branding/Logotipo-Cl3an-28.png"
                  alt="Clean Corp Logo"
                />
              </Link>

              <Link
                href="/directory"
                className="text-gray-600 text-sm leading-tight hover:text-[#16464C] transition-colors"
              >
                [ Directory ]
              </Link>
            </div>
          </div>

          {/* Log In Button, TBD */}
          <button
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
}
