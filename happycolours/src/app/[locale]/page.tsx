import { Star, Users, Calendar, Gift, Palette, ArrowRight } from "lucide-react";
import Formule from "@/components/ui/formule";
import { formules } from "@/generated/prisma";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  // Chargement serveur (Node) via Prisma
  const rows = await prisma.formules.findMany({ orderBy: { id: "asc" } });
  const formules: formules[] = JSON.parse(JSON.stringify(rows));

  const steps = [
    {
      icon: Calendar,
      title: t("etape1Titre"),
      description: t("etape1Description"),
    },
    {
      icon: Palette,
      title: t("etape2Titre"),
      description: t("etape2Description"),
    },
    {
      icon: Gift,
      title: t("etape3Titre"),
      description: t("etape3Description"),
    },
  ];

  const heroImage =
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-800/30 to-pink-900/40"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-purple-500/15 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Background image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
          style={{ marginTop: -160 }}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 mb-8 border border-white/10 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {t("title")}
              <span
                className="bg-gradient-to-r
                  from-red-600 via-orange-500 via-yellow-400
                  via-green-500 via-teal-400
                  via-blue-600 via-indigo-700
                  to-purple-700
                  bg-clip-text text-transparent inline-block font-extrabold"
              >
                {t("highlightedTitle")}
              </span>
              <span className="text-white inline-block ml-2">
                {t("emojiTitle")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
              {t("description")}
              <br />
              <span className="font-semibold text-yellow-300">
                {t("descriptionColours")}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/formules">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center gap-3 min-w-max cursor-pointer">
                <Calendar className="w-6 h-6" />
                {t("boutonReserver")}
              </button>
            </Link>
            <Link href="/FAQ">
              <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 cursor-pointer">
                <Palette className="w-5 h-5" />
                {t("boutonFAQ")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-sky-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-8">
              {t("titreSection2")}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block py-2 leading-tight">
                {t("highlightedTitle")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              {t("descriptionSection2")}
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t("carte1Section2Titre")}
                </h3>
                <p className="text-gray-600">
                  {t("carte1Section2Description")}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t("carte2Section2Titre")}
                </h3>
                <p className="text-gray-600">
                  {t("carte2Section2Description")}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t("carte3Section2Titre")}
                </h3>
                <p className="text-gray-600">
                  {t("carte3Section2Description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-blue-100">
        <div className="absolute inset-0 opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              {t("section3Titre")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("section3Description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group relative">
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl relative">
                      <Icon className="w-10 h-10 text-white" />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-center mt-6">
            <Link href="/formules">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-5 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer">
                {t("boutonSection3")} <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Formule formules={formules} />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              {t("section4Titre")}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent block">
                {t("section4TitreGradient")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
              {t("section4Description")}
            </p>

            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/formules">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-5 rounded-full text-xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center gap-3 mx-auto cursor-pointer">
                  <Calendar className="w-6 h-6" />
                  {t("section4Bouton")}
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{t("trust1Emoji")}</div>
                <p className="text-sm opacity-80">{t("trust1Titre")}</p>
                <p className="font-bold">{t("trust1Description")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{t("trust2Emoji")}</div>
                <p className="text-sm opacity-80">{t("trust2Titre")}</p>
                <p className="font-bold">{t("trust2Description")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{t("trust3Emoji")}</div>
                <p className="text-sm opacity-80">{t("trust3Titre")}</p>
                <p className="font-bold">{t("trust3Description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
