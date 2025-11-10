"use client";

import { useState } from "react";
import ReservationDateComponent from "@/components/ui/reservationDate";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ReservationWrapperProps {
  time?: number;
  id: number;
}

function timeStringToDate(time: string): Date {
  const [h, m, s] = time.split(":");
  const hours = Number(h);
  const minutes = Number(m);
  const seconds = s ? Number(s) : 0;

  return new Date(1970, 0, 1, hours, minutes, seconds);
}

export default function ReservationWrapper({
  time,
  id,
}: ReservationWrapperProps) {
  const t = useTranslations("ReservationWrapper");
  const [reservationData, setReservationData] = useState<{
    selectedDate: string | null;
    selectedHour: string | null;
  }>({
    selectedDate: null,
    selectedHour: null,
  });
  const router = useRouter();

  const handleReserver = async () => {
    const { selectedDate, selectedHour } = reservationData;

    if (!selectedDate || !selectedHour) {
      alert(t("alertSelectionManquante"));
      return;
    }

    try {
      console.log("Réservation:", {
        date: selectedDate,
        hour: selectedHour,
        reservationId: id,
      });

      const response = await fetch("/api/reservation/end", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          date: new Date(selectedDate),
          heureDebut: timeStringToDate(selectedHour),
        }),
      });

      if (response.ok) {
        router.push(`/confirmation?id=${id}`);
      } else {
        alert(t("erreurReservation"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(t("erreurReservation"));
    }
  };

  const { selectedDate, selectedHour } = reservationData;

  return (
    <>
      <ReservationDateComponent
        time={time}
        id={id}
        onSelectionChange={setReservationData}
      />

      {/* Bouton d'action */}
      <button
        onClick={handleReserver}
        disabled={!selectedDate || !selectedHour}
        className={`px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-2xl ${
          selectedDate && selectedHour
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:scale-110 hover:shadow-yellow-500/25 hover:cursor-pointer mb-16"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        {t("boutonConfirmer")}
      </button>
    </>
  );
}
