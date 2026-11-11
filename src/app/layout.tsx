import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HydrationFix from "@/components/HydrationFix";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://looponics.tech"),
  title: {
    default: "Looponics | Technology & Engineering Agency",
    template: "%s | Looponics",
  },
  description:
    "Looponics is a modern technology services agency engineering web applications, cross-platform mobile apps, AI-powered SaaS platforms, custom automations, and agentic AI systems.",
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
  openGraph: {
    title: "Looponics | Technology & Engineering Agency",
    description:
      "We design, develop, and engineer digital products, intelligent systems, and custom software solutions that help businesses scale.",
    url: "https://looponics.tech",
    siteName: "Looponics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Looponics | Technology & Engineering Agency",
    description:
      "We design, develop, and engineer digital products, intelligent systems, and custom software solutions.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <HydrationFix />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
