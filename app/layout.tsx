import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ANSWER DIGITAL — Technology. Innovation. Solutions.",
    template: "%s | ANSWER DIGITAL",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "développement d'applications",
    "PWA",
    "transformation numérique",
    "digitalisation",
    "Kinshasa",
    "RDC",
    "logiciels sur mesure",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: "ANSWER DIGITAL — Vos défis méritent des solutions intelligentes",
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ANSWER DIGITAL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANSWER DIGITAL",
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  slogan: site.signature,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/logo-symbol.png`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "CD",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-950"
        >
          Aller au contenu
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
