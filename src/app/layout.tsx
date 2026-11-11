import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Looponics | Technology Agency",
  description:
    "We design, develop, and engineer digital products, intelligent systems, and custom solutions. Web development, mobile apps, AI-powered SaaS, automations, and agentic AI systems.",
  openGraph: {
    title: "Looponics | Technology Agency",
    description:
      "We engineer digital products, intelligent systems, and custom solutions that help businesses move forward.",
    url: "https://looponics.com",
    siteName: "Looponics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Looponics | Technology Agency",
    description:
      "We engineer digital products, intelligent systems, and custom solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
