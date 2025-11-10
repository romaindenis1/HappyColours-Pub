"use client";

import { formules, users } from "@/generated/prisma";
import {
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

type reservationPrice = {
  id: number;
  date: Date | null;
  debut: Date | null;
  nbrPerson: number;
  dateReservationWeb: Date;
  prix: number;
  status: string;
  formule_id: number;
  user_id: number;
};

export default function Success({
  reservationPrice,
  formule,
  user,
}: {
  reservationPrice: reservationPrice;
  formule: formules;
  user: users;
}) {
  const t = useTranslations("Success");
  const locale = useLocale();
  console.log(locale);

  const localeMap: Record<string, string> = {
    fr: "fr-FR",
    en: "en-GB",
    de: "de-DE",
  };

  const dateLocale = localeMap[locale] || "fr-FR";

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(dateLocale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(dateLocale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(dateLocale, {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de confirmation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-8 text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("titreSuccess")}
            </h1>
          </div>
        </div>

        {/* Détails de la réservation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t("detailsReservation")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date et heure */}
              <div className="flex items-start space-x-3">
                <CalendarIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{t("date")}</p>
                  <p className="text-gray-600">
                    {formatDate(reservationPrice.date || new Date())}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{t("heure")}</p>
                  <p className="text-gray-600">
                    {formatTime(reservationPrice.date || new Date())}
                  </p>
                </div>
              </div>

              {/* Service */}
              {formule && (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="h-5 w-5 bg-blue-500 rounded mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {t("service")}
                      </p>
                      {locale == "fr" ? (
                        <p className="text-gray-600">{formule.titleFR}</p>
                      ) : locale == "de" ? (
                        <p className="text-gray-600">{formule.titleDE}</p>
                      ) : (
                        <p className="text-gray-600">{formule.titleEN}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-5 w-5 bg-green-500 rounded mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">{t("prix")}</p>
                      <p className="text-gray-600 font-semibold">
                        {formatPrice(reservationPrice.prix)}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Nombre de personnes */}
              {reservationPrice.nbrPerson && (
                <div className="flex items-start space-x-3">
                  <UserIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("nbrPersonnes")}
                    </p>
                    <p className="text-gray-600">
                      {reservationPrice.nbrPerson}
                    </p>
                  </div>
                </div>
              )}

              {/* Statut actuel */}
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 bg-green-500 rounded mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">{t("statut")}</p>
                  <p className="text-amber-600 font-medium">
                    {reservationPrice.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations client */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("informationsClient")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <UserIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{t("email")}</p>
                    <p className="text-gray-600">{user.mail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={"/"}
                className="w-full bg-green-600 text-white px-6 py-4 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>{t("continuer")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            {t("questions")} 01 23 45 67 89 {t("ouEmail")}{" "}
            <Link
              href="mailto:contact@happycolours.com"
              className="text-blue-600 hover:underline"
            >
              contact@happycolours.ch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
