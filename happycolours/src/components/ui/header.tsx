"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const menuItems = [
    { label: t("formules"), href: "/formules" },
    { label: t("commentCaMarche"), href: "/FAQ" },
    { label: t("lieu"), href: "/lieu" },
    { label: t("contact"), href: "/contact" },
  ];

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

    const params = new URLSearchParams(searchParams.toString());

    const newUrl = params.toString()
      ? `${newPathname}?${params.toString()}`
      : newPathname;
    router.push(newUrl);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 shadow-2xl border-b border-gray-200/50">
      <nav className="container mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo / Lien vers accueil */}
        <Link href="/" className="block" aria-label={t("accueilAria")}>
          <Image
            src="/logo.png"
            alt="Happy Colours logo"
            width={300}
            height={80}
            className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300"
          />{" "}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="font-semibold transition-all duration-300 relative px-4 py-2 rounded-lg group text-gray-800 hover:text-indigo-600 hover:bg-gray-50"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}

          <Link
            href="/register"
            className="font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-gray-800 hover:text-indigo-600 hover:bg-gray-50"
          >
            {t("connexion")}
          </Link>

          <div>
            <Select onValueChange={changeLanguage} defaultValue={locale}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Laguage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">Deutch</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Link
            href="/formules"
            className="font-bold px-8 py-3 rounded-full transition-all duration-300 cursor-pointer
             bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg
             hover:scale-105 transform
             hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:shadow-indigo-500/25"
          >
            {t("reserver")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={t("menuToggleAria")}
          className="lg:hidden p-2 rounded-lg transition-colors text-gray-800 hover:text-indigo-600 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl transition-all duration-300 border-b border-gray-200/50 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="container mx-auto px-6 py-8 space-y-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-gray-800 hover:text-indigo-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 border-l-4 border-transparent hover:border-indigo-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="block text-gray-800 hover:text-indigo-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 border-l-4 border-transparent hover:border-indigo-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("connexion")}
            </Link>

            {/* CTA mobile */}
            <Link
              href="/formules"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex justify-center font-bold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer
               bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg
               hover:scale-105 transform
               hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:shadow-indigo-500/25"
            >
              {t("reserver")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
