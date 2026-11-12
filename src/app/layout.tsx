import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HydrationFix from "@/components/HydrationFix";
import AssistantModal from "@/components/assistant-ui/assistant-modal";
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
    title: "Looponics | Technology & Engineering Agency",
    description:
      "We design, develop, and engineer digital products, intelligent systems, and custom software solutions.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <Navbar />
        {children}
        <AssistantModal />
      </body>
    </html>
  );
}
