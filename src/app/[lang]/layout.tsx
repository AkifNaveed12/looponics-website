import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import HydrationFix from "@/components/HydrationFix";
import AssistantModal from "@/components/assistant-ui/assistant-modal";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { locales, isRtl, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "./dictionaries";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang as Locale);
  const canonicalUrl = `https://looponics.tech/${lang}`;

  // Build alternate language links (hreflang)
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `https://looponics.tech/${loc}`;
  }
  languages["x-default"] = "https://looponics.tech/en";

  return {
    metadataBase: new URL("https://looponics.tech"),
    title: {
      default: dict.meta.title,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    keywords: [
      "technology agency",
      "software engineering",
      "web development",
      "mobile app development",
      "AI SaaS",
      "business automation",
      "agentic AI",
      "Next.js agency",
    ],
    authors: [{ name: "Looponics" }],
    creator: "Looponics",
    publisher: "Looponics",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: dict.meta.ogTitle || dict.meta.title,
      description: dict.meta.ogDescription || dict.meta.description,
      url: canonicalUrl,
      siteName: "Looponics",
      locale: lang === "en" ? "en_US" : lang,
      type: "website",
      images: [
        {
          url: "/images/looponics-logo.png",
          width: 512,
          height: 512,
          alt: "Looponics Agency Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.twitterTitle || dict.meta.title,
      description: dict.meta.twitterDescription || dict.meta.description,
      images: ["/images/looponics-logo.png"],
    },
    icons: {
      icon: [
        { url: "/images/favicon.svg?v=20261112", type: "image/svg+xml" },
        { url: "/favicon.ico?v=20261112", sizes: "any" },
        { url: "/favicon.svg?v=20261112", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico?v=20261112",
      apple: [
        {
          url: "/images/looponics-logo.png?v=20261112",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/images/favicon.svg?v=20261112"
          type="image/svg+xml"
        />
        <link rel="icon" href="/favicon.ico?v=20261112" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/images/looponics-logo.png?v=20261112"
        />
      </head>
      <body suppressHydrationWarning>
        <HydrationFix />
        <DictionaryProvider dictionary={dict}>
          <Navbar currentLocale={locale} />
          {children}
          <AssistantModal />
        </DictionaryProvider>
      </body>
    </html>
  );
}
