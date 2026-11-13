import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): Locale {
  // Priority 1: Check cookie for saved manual preference
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // Priority 2: Browser Accept-Language header negotiation
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const matched = match(languages, locales as unknown as string[], defaultLocale);
    return matched as Locale;
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the preferred locale
  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all paths except internal Next.js paths, static files, and API routes
    "/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|images|sitemap\\.xml|robots\\.txt|bg\\.avif|bg\\.jpg|trust_bg\\.png|llms\\.txt|.*\\.svg|.*\\.png|.*\\.ico|.*\\.jpg|.*\\.avif).*)",
  ],
};
