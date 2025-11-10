import { prisma } from "@/lib/db";
import ReservationWrapper from "@/components/ui/wrapperReservation";
import { getTranslations, getLocale } from "next-intl/server";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const t = await getTranslations("ReservationPage");
  const id = Number((await searchParams)?.id);
  const locale = await getLocale();
  if (!id || isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">{t("erreurIdInvalide")}</h1>
      </div>
    );
  }

  const reservation = await prisma.reservations.findUnique({
    where: { id },
  });

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">
          {t("erreurReservationIntrouvable")}
        </h1>
      </div>
    );
  }

  const formule = await prisma.formules.findUnique({
    where: { id: reservation.formule_id },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white flex items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
          {t("titre")}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent block">
            {t("titreExperience")}
          </span>
        </h1>

        {/* Sous-titre */}
        <h2 className="text-xl md:text-2xl font-light text-white/90 mb-12 leading-relaxed">
          {t("sousTitre")}{" "}
          {locale == "fr" ? (
            <span className="font-bold text-yellow-300">
              {formule?.titleFR}
            </span>
          ) : locale == "de" ? (
            <span className="font-bold text-yellow-300">
              {formule?.titleDE}
            </span>
          ) : (
            <span className="font-bold text-yellow-300">
              {formule?.titleEN}
            </span>
          )}
        </h2>

        {/* Wrapper client qui gère l'état */}
        <ReservationWrapper time={formule?.duree} id={id} />
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-purple-500/15 rounded-full animate-pulse delay-500"></div>
    </div>
  );
}
