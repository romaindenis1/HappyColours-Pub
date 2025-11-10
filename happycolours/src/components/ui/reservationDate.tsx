"use client";

import { useState, useEffect } from "react";
import ReservationHeureComponent from "@/components/ui/reservationHeure";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function ReservationDateComponent({
  id,
  onSelectionChange,
}: {
  time?: number;
  id: number;
  onSelectionChange?: (data: {
    selectedDate: string | null;
    selectedHour: string | null;
  }) => void;
}) {
  const t = useTranslations("ReservationDate");
  const locale = useLocale();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableHours, setAvailableHours] = useState<FormattedReservation[]>(
    []
  );
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  type Creneau = {
    start: string;
    salles: number[];
  };

  type Reservation = {
    creneaux: Creneau[];
  };

  type FormattedReservation = { hour: string; salles: number[] };

  function transformReservations(data: Creneau[]): FormattedReservation[] {
    return data.map((r) => {
      const date = new Date(r.start);
      const hour = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
        date.getUTCMinutes()
      ).padStart(2, "0")}`;
      return {
        hour,
        salles: r.salles,
      };
    });
  }

  // Nouveau useEffect pour remonter les changements vers le parent
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({ selectedDate, selectedHour });
    }
  }, [selectedDate, selectedHour, onSelectionChange]);

  useEffect(() => {
    if (!selectedDate) return;

    const run = async () => {
      try {
        const res = await fetch(
          `/api/salle/avaible?date=${selectedDate}&idReservation=${id}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Reservation = await res.json();

        const transformedData = transformReservations(data.creneaux);

        setAvailableHours(transformedData);
      } catch (e) {
        console.error("Failed fetching reservations:", e);
      }
    };
    run();
  }, [selectedDate, id]);

  // Fonction pour gérer le changement de date
  const handleDateChange = (newDate: string) => {
    const today = `${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(
      startDate.getDate()
    )}`;
    if (today < newDate) {
      setSelectedDate(newDate);
      // Reset l'heure quand on change de date
      setSelectedHour(null);
    } else {
      setSelectedDate(null);
      setSelectedHour(null);
    }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  // 🔹 Choisir une date précise de début des réservations
  const chosenStartDate = new Date(2025, 10, 12);

  // Si tu veux utiliser aujourd'hui à la place, tu gardes :
  const today = new Date();

  // minDate = la plus tardive entre chosenStartDate et today
  const startDate = chosenStartDate > today ? chosenStartDate : today;

  const minDate = `${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(
    startDate.getDate()
  )}`;

  // maxDate = 1 an après today
  const inOneYear = new Date(today);
  inOneYear.setFullYear(today.getFullYear() + 1);

  const maxDate = `${inOneYear.getFullYear()}-${pad(inOneYear.getMonth() + 1)}-${pad(
    inOneYear.getDate()
  )}`;

  // Déterminer les options de localisation pour toLocaleDateString
  const localeMap: Record<string, string> = {
    fr: "fr-FR",
    en: "en-GB",
    de: "de-DE",
  };

  const dateLocale = localeMap[locale] || "fr-FR";

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-12 text-center">
      <p className="text-lg text-white/80 mb-6">{t("sousTitre")}</p>

      {/* Sélecteur de date */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          className="px-6 py-3 rounded-full text-gray-900 font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all"
          value={selectedDate || ""}
          onChange={(e) => handleDateChange(e.target.value)}
          min={minDate}
          max={maxDate}
        />
      </div>

      {/* Sélecteur d'horaires dynamiques */}
      {selectedDate && (
        <ReservationHeureComponent
          availableHours={availableHours}
          selectedHour={selectedHour}
          onSelect={setSelectedHour}
        />
      )}

      {/* Résumé */}
      {selectedDate && selectedHour && (
        <p className="mt-6 text-lg text-yellow-300 font-medium">
          {t("resume")}{" "}
          {new Date(selectedDate).toLocaleDateString(dateLocale, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          {t("a")} {selectedHour}
        </p>
      )}
    </div>
  );
}
