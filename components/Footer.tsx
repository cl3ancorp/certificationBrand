import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-12 mb-8">

          {/* Logo */}
          <div className="w-32 h-32 shrink-0">
            <Link href="/" className="mr-4">
              <img
                className="w-auto"
                src="/images/branding/Logotipo-Cl3an-03.png"
                alt="Clean Corp Logo"
              />
            </Link>
          </div>

          {/* Links Columns (pushed right, constrained width) */}
          <div className="ml-auto">
            <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-md">
              
              {/* FAQs Column */}
              <div>
                <h3 className="text-gray-900 mb-4 font-bold text-base">
                  FAQs
                </h3>
                <ul className="space-y-2">
                  {['Who?', 'When?', 'Where?', 'What?'].map((item) => (
                    <li key={item}>
                      <Link href="/about-us" className="text-gray-600 hover:text-[#16464C] text-sm transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Become Certified Column */}
              <div>
                <h3 className="text-gray-900 mb-4 font-bold text-base">
                  Become Certified
                </h3>
                <ul className="space-y-2">
                  {['Process', 'Benefits', 'Get started'].map((item) => (
                    <li key={item}>
                      <Link
                        href="/become-clean-certified"
                        className="text-gray-600 hover:text-[#16464C] text-sm transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="text-gray-900 mb-4 font-bold text-base">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about-us" className="text-gray-600 hover:text-[#16464C] text-sm transition-colors">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-gray-600 hover:text-[#16464C] text-sm transition-colors">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="text-gray-600 hover:text-[#16464C] text-sm transition-colors">
                      History
                    </Link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © CL3AN, Inc. 2025
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-[#16464C] flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
