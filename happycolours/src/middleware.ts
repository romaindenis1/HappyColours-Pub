import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Fonction utilitaire
const sanitizeRedirectUrl = (path: string): string => {
  if (!path.startsWith("/")) return "/";

  const blockedPaths = [
    "/api",
    "/_next",
    "/error",
    "/denied",
    "/favicon.ico",
    "/image",
  ];
  if (blockedPaths.some((blocked) => path.startsWith(blocked))) return "/";

  return path.replace(/[^\w\-\/\?\&\=]/g, "");
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // CORRECTION: Middleware pour enlever le /fr /de /en des liens des images
  // Doit être AVANT le middleware intl
  console.log(pathname);
  if (pathname.match(/^\/(fr|en|de)\/(images|assets|uploads)\/.+/)) {
    const newPathname = pathname.replace(/^\/(fr|en|de)/, "");
    return NextResponse.rewrite(new URL(newPathname, req.url));
  }

  // Appliquer le middleware intl après
  const intlResponse = intlMiddleware(req);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes = ["/reservation", "/profile"];

  // Vérifier si la route demandée (sans la langue) est protégée
  // Extraire le pathname sans le code langue
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|de)(.*)$/, "$2") || "/";

  const requiresAuth = protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );

  if (requiresAuth && !token) {
    const callback = sanitizeRedirectUrl(url.pathname + url.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callback)}`, req.url)
    );
  }

  if (pathname.startsWith("/admin")) {
    if (!token || !token.isAdmin) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }

  // Retourner la réponse du middleware intl
  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|manifest.json|sw.js|error|denied|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp).*)",
    "/:locale(fr|en|de)/images/:path*",
    "/:locale(fr|en|de)/assets/:path*",
    "/:locale(fr|en|de)/uploads/:path*",
  ],
};
