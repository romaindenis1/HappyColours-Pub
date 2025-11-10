import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { formules } from "@/generated/prisma";

export default function Formule({ formules }: { formules: formules[] }) {
  const t = useTranslations("Formules");
  const locale = useLocale();
  return (
    <>
      <section className="py-24 bg-sky-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              {t("titreSection")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("sousTitre")}
            </p>
          </div>
          {locale == "fr" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {formules.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules/${formula.id}`}
                  className="group block rounded-3xl shadow-md bg-white overflow-hidden
                           transform transition-transform duration-300 hover:scale-[1.02]
                           cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={formula.image || "/default-image.jpg"}
                      alt={formula.titleFR || t("imageAlt")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        formula.color || "from-black/0 to-black/20"
                      } opacity-60`}
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {formula.titleFR}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {formula.descriptionFR}
                    </p>
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
                      {t("decouvrir")}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : locale == "de" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {formules.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules/${formula.id}`}
                  className="group block rounded-3xl shadow-md bg-white overflow-hidden
                           transform transition-transform duration-300 hover:scale-[1.02]
                           cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={formula.image || "/default-image.jpg"}
                      alt={formula.titleDE || t("imageAlt")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        formula.color || "from-black/0 to-black/20"
                      } opacity-60`}
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {formula.titleDE}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {formula.descriptionDE}
                    </p>
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
                      {t("decouvrir")}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {formules.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules/${formula.id}`}
                  className="group block rounded-3xl shadow-md bg-white overflow-hidden
                           transform transition-transform duration-300 hover:scale-[1.02]
                           cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={"/" + formula.image || "/default-image.jpg"}
                      alt={formula.titleEN || t("imageAlt")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        formula.color || "from-black/0 to-black/20"
                      } opacity-60`}
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {formula.titleEN}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {formula.descriptionEN}
                    </p>
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
                      {t("decouvrir")}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
