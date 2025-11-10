import { unstable_cache } from "next/cache";
import { Link } from "@/i18n/navigation";
import { HelpCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";

// Fonction de récupération des FAQ (inchangée)
const getQuestions = unstable_cache(
  async () => {
    return prisma.questions.findMany({
      select: { id: true, question: true, reponse: true },
      orderBy: { id: "asc" },
      take: 50,
    });
  },
  ["faq-questions"],
  { revalidate: 60 * 60 * 24 } // 24h
);

export default async function FAQPage() {
  const t = await getTranslations("FAQ");
  const items = await getQuestions();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="py-24 bg-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-800/10 to-pink-900/10" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="absolute top-16 left-10 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-16 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full animate-bounce delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-purple-500/15 rounded-full animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl mb-4">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              {t("before")}{" "}
              <Link
                href="/contact"
                className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors"
              >
                {t("link")}
              </Link>{" "}
              {t("after")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md px-6 py-5"
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {item.question}
                </p>
                <p className="text-gray-700 whitespace-pre-line">
                  {item.reponse}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/formules">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-5 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer">
                {t("button")}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
