"use client";

import { Facebook, Instagram } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerSections = [
    {
      title: t("pratique"),
      links: [
        { label: t("faq"), href: "/FAQ" },
        { label: t("seConnecter"), href: "/login" },
        { label: t("sInscrire"), href: "/register" },
      ],
    },
    {
      title: t("nosFormules"),
      links: [
        { label: t("coloreEmotions"), href: "/formules" },
        { label: t("coloreFamille"), href: "/formules" },
        { label: t("coloreFete"), href: "/formules" },
        { label: t("teamBuilding"), href: "/formules" },
        { label: t("anniversaire"), href: "/formules" },
        { label: t("coloreFluo"), href: "/formules" },
      ],
    },
    {
      title: t("contactInfos"),
      links: [
        { label: t("nousContacter"), href: "/contact" },
        { label: t("conditionsGenerales"), href: "#cgu" },
        { label: t("politiqueConfidentialite"), href: "#privacy" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: t("instagram"),
      href: "https://www.instagram.com/happycolours.ch/",
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      name: t("facebook"),
      href: "https://www.facebook.com/people/Happycoloursch/61579720861538/",
      icon: <Facebook className="w-6 h-6" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Happy Colours
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">{t("tagline")}</p>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                {t("localisation")}
              </p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:info@happycolours.com"
                  className="hover:underline"
                >
                  {t("email")}
                </a>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+41763672727" className="hover:underline">
                  {t("telephone")}
                </a>
              </p>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-6 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 transform inline-block hover:translate-x-1 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">{t("suisNous")}</span>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-2xl hover:scale-125 transition-transform duration-300"
                  title={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-right">
              <p>{t("copyright")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
