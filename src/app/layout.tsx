import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olema | Technology Agency",
  description: "We design, develop, and engineer digital products, intelligent systems, and custom solutions. Web development, mobile apps, AI-powered SaaS, automations, and agentic AI systems.",
  openGraph: {
    title: "Olema | Technology Agency",
    description: "We engineer digital products, intelligent systems, and custom solutions that help businesses move forward.",
    url: "https://olema.com",
    siteName: "Olema",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olema | Technology Agency",
    description: "We engineer digital products, intelligent systems, and custom solutions.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

