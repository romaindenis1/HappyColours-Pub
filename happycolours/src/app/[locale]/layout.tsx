import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "rsuite/DatePicker/styles/index.css";
import { SessionProvider } from "@/components/session-providers";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Convertir locale next-intl en format OpenGraph (fr -> fr_FR)
  const ogLocale =
    locale === "fr" ? "fr_FR" : locale === "en" ? "en_US" : "de_DE";

  return {
    // SEO de base
    title: {
      default: t("title"),
      template: "%s | Happy Colours",
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Happy Colours" }],

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `https://happycolours.ch/${locale}`,
      siteName: "Happy Colours",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: "/favicon.ico",
    },

    // Robots et indexation
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // URLs alternatives pour chaque langue
    alternates: {
      canonical: `https://happycolours.ch/${locale}`,
      languages: {
        fr: "https://happycolours.ch/fr",
        en: "https://happycolours.ch/en",
        de: "https://happycolours.ch/de",
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 3. Récupérer les messages

  // 4. Récupérer la session (pour SessionProvider)
  const session = await getServerSession();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning={true}>
        {/* SessionProvider doit envelopper tout */}
        <SessionProvider session={session}>
          {/* Spacer global qui suit la taille du header */}
          <div className="h-10 sm:h-12 md:h-16 lg:h-20" aria-hidden />

          <main>
            <NextIntlClientProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </NextIntlClientProvider>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
