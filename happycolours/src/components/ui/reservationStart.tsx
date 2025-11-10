"use client";

import React, { useState, useEffect } from "react";
import Tarif from "@/components/ui/tarif";
import { formules } from "@/generated/prisma";
import {
  Calendar,
  Users,
  Palette,
  ArrowRight,
  Clock,
  Loader2,
} from "lucide-react";
import Chargement from "@/components/ui/chargement";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function ReservationStartComponent({
  id,
  handleReserver,
  isLoading,
}: {
  id: number;
  handleReserver: (personne: number, price: number) => void;
  isLoading: boolean;
}) {
  const t = useTranslations("ReservationStart");
  const [formule, setFormule] = useState<formules | null>(null);
  const [prixTotal, setPrixTotal] = useState(0);
  const [personne, setPersonne] = useState(0);
  const [prix, setPrix] = useState([]);

  const handlechangePrice = (newPrix: number) => {
    setPrixTotal(newPrix);
  };

  const handleChangePerson = (personne: number) => {
    setPersonne(personne);
  };

  const locale = useLocale();

  useEffect(() => {
    if (!id) return;
    async function fetchFormule() {
      const res = await fetch(`/api/formule/${id}`);
      const data = await res.json();

      setFormule(data.formule);
      setPrix(data.prix);
    }
    fetchFormule();
  }, [id]);

  // Loading state avec style Happy Colours
  if (!formule || !locale) {
    return <Chargement messageKey="defaut" />;
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {t("parametreIdManquant")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-300/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200/15 to-blue-300/15 rounded-full animate-pulse"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              {t("titre")}
              {locale == "fr" ? (
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block py-2">
                  {formule.titleFR}
                </span>
              ) : locale == "de" ? (
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block py-2">
                  {formule.titleDE}
                </span>
              ) : (
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block py-2">
                  {formule.titleEN}
                </span>
              )}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("sousTitre")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Description */}
            <div className="space-y-8">
              {/* Image */}
              {formule.image ? (
                <div className="relative group">
                  {locale == "fr" ? (
                    <Image
                      src={"/" + formule.image}
                      alt={formule.titleFR}
                      width={900}
                      height={900}
                      className="w-full h-80 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : locale == "de" ? (
                    <Image
                      src={"/" + formule.image}
                      alt={formule.titleDE}
                      width={900}
                      height={900}
                      className="w-full h-80 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={"/" + formule.image}
                      alt={formule.titleEN}
                      width={900}
                      height={900}
                      className="w-full h-80 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      {locale == "fr" ? (
                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          {formule.titleFR}
                        </span>
                      ) : locale == "de" ? (
                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          {formule.titleDE}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          {formule.titleEN}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      {t("imageBientot")}
                    </p>
                  </div>
                </div>
              )}

              {/* Description Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  {t("descriptionExperience")}
                </h3>
                {locale == "fr" ? (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {formule.descriptionFR}
                  </p>
                ) : locale == "de" ? (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {formule.descriptionDE}
                  </p>
                ) : (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {formule.descriptionEN}
                  </p>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">
                      {t("duree")}
                    </span>
                  </div>
                  <p className="text-green-700">{t("dureTexte")}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border border-yellow-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-6 h-6 text-orange-600" />
                    <span className="font-bold text-orange-800">
                      {t("materiel")}
                    </span>
                  </div>
                  <p className="text-orange-700">{t("materialTexte")}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="space-y-8">
              {/* Selection Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  {t("votreSelection")}
                </h3>

                {/* Selected persons */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-blue-800">
                        {t("participants")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-blue-600">
                        {personne || 0}
                      </span>
                      <p className="text-sm text-blue-500">
                        {personne <= 1 ? t("personne") : t("personnes")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total price */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-green-800">
                        {t("prixTotal")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-green-600">
                        {prixTotal.toFixed(2)} CHF
                      </span>
                      <p className="text-sm text-green-500">{t("ttc")}</p>
                    </div>
                  </div>
                </div>

                {/* Price selector */}
                <div className="mb-8">
                  <Tarif
                    id={id}
                    prixPersonne={prix}
                    onTarifChange={handlechangePrice}
                    onPersonChange={handleChangePerson}
                  />
                </div>

                {/* Reserve button */}
                <button
                  onClick={() => handleReserver(personne, prixTotal)}
                  disabled={personne === 0 || prixTotal === 0}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>{t("chargement")}</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      {personne === 0 || prixTotal === 0
                        ? t("choisissezOptions")
                        : t("reserverMaintenant")}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Trust indicators */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛡️</div>
                    <p className="text-xs text-gray-600">{t("annulation")}</p>
                    <p className="text-xs font-bold text-gray-800">
                      {t("annulationTexte")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="text-xs text-gray-600">{t("confirmation")}</p>
                    <p className="text-xs font-bold text-gray-800">
                      {t("confirmationTexte")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <p className="text-xs text-gray-600">
                      {t("materielTrust")}
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                      {t("materielTrustTexte")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
