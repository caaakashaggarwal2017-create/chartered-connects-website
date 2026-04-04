import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A1628",
};

export const metadata: Metadata = {
  title: {
    default: "India's CA Community — Chartered Connects",
    template: "%s | Chartered Connects",
  },
  description:
    "Resources, jobs, articleship and compliance tools for 1 lakh+ CAs and CA aspirants across India",
  metadataBase: new URL("https://charteredconnects.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://charteredconnects.com",
    siteName: "Chartered Connects",
    title: "India's CA Community — Chartered Connects",
    description:
      "Resources, jobs, articleship and compliance tools for 1 lakh+ CAs and CA aspirants across India",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chartered Connects — India's CA Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India's CA Community — Chartered Connects",
    description:
      "Resources, jobs, articleship and compliance tools for 1 lakh+ CAs and CA aspirants across India",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = headers().get("x-is-admin") === "1";

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Analytics 4 — TODO: Activate by replacing GA_MEASUREMENT_ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','GA_MEASUREMENT_ID');` }} /> */}
      </head>
      <body className="antialiased">
        {!isAdmin && <Nav />}
        {isAdmin ? children : <main>{children}</main>}
        {!isAdmin && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
