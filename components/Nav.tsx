"use client";

import Link from "next/link";
import { useState } from "react";

const navList = [
    // { title: "Find a Clean Corp", url: "/companies" },
    { title: "Become Clean Certified", url: "/become-clean-certified" },
    { title: "About Us", url: "/about-us" },
    { title: "Contact Us", url: "/contact-us" },
];

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="sticky top-0 bg-white shadow shadow-gray-200 z-50">
            <div className="mx-auto container px-4 flex justify-between">
                <div className="flex max-w-xl items-center">
                    {/* Logo */}
                    <Link href="/" className="mr-4">
                        <img className="w-auto h-13" src={"/images/branding/Logotipo-Cl3an-12.png"} alt="Clean Corp Logo" />
                    </Link>

                    {/* Navigation and Actions Container */}
                    <div className="flex items-center justify-between flex-1">
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-4">
                            {navList.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.url}
                                    className="py-6 font-bold text-sm hover:text-gray-600 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>

                        {/* Empty div for mobile to push burger menu to the right */}
                        <div className="lg:hidden"></div>

                        {/* Mobile Burger Menu Button */}
                        <button
                            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>
                </div>

                <Link href="/companies" className="mr-4">
                    <div className="flex flex-col">
                        <img className="w-auto h-10" src={"/images/branding/Logotipo-Cl3an-28.png"} alt="Clean Corp Logo" />
                        <span className="ml-3 text-2xl font-semibold">Directory</span>
                    </div>
                </Link>
                {/* Invisible spacer to balance the left side */}
                <div className="w-[10px]"></div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-4 py-4 space-y-2">
                    {navList.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            className="block py-3 font-bold text-sm hover:text-gray-600 transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    );
}