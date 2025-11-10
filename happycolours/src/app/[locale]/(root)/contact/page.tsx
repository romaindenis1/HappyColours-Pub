"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-800/30 to-pink-900/40"></div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-8 border border-white/10 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {t("titre")}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent block">
                {t("titreNous")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
              {t("sousTitre")}
              <span className="font-semibold text-yellow-300">
                {t("sousTexte")}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            {t("moyensContact")}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
              {t("deContact")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            {t("descriptionContact")}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            {/* Email */}
            <a
              href="mailto:info@happycolours.ch"
              className="block bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("email")}
              </h3>
              <p className="text-gray-600">{t("adresseEmail")}</p>
            </a>

            {/* Téléphone */}
            <a
              href="tel:+41763674477"
              className="block bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("telephone")}
              </h3>
              <p className="text-gray-600">{t("numeroTelephone")}</p>
            </a>

            {/* Adresse */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Zentweg+27,+3006+Bern"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("adresse")}
              </h3>

              <p className="text-gray-600">{t("lieuAdresse")}</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}