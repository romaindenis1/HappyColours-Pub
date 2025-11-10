"use client";

import { useTranslations } from "next-intl";

type FormattedReservation = { hour: string; salles: number[] };

// Composant enfant pour sélectionner une heure
export default function ReservationHeureComponent({
  availableHours,
  selectedHour,
  onSelect,
}: {
  availableHours: FormattedReservation[];
  selectedHour: string | null;
  onSelect: (hour: string) => void;
}) {
  const t = useTranslations("ReservationHeure");

  return (
    <div className="text-center mt-6">
      <h3 className="text-2xl font-bold text-white mb-4">{t("titre")}</h3>
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {availableHours.map((hour) => (
          <button
            key={hour.hour}
            onClick={() => onSelect(hour.hour)}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all shadow-md
              ${
                selectedHour === hour.hour
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 scale-105 shadow-yellow-500/40"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            {hour.hour}
          </button>
        ))}
      </div>
    </div>
  );
}
