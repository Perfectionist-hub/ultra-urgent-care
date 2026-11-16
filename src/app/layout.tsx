import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { CallBar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteNotice } from "@/components/site-notice";
import { locations, practice } from "@/lib/clinic";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(practice.website),
  title: {
    default: "Ultra Urgent Care & Pain Management",
    template: "%s · Ultra Urgent Care",
  },
  description:
    "Walk-in urgent care in Chicago and Hoffman Estates. Atención de urgencias sin cita en Chicago y Hoffman Estates. Pain management and virtual psychiatry. Hoffman Estates is open until 10 PM.",
  openGraph: {
    title: "Ultra Urgent Care & Pain Management",
    description:
      "Two clinics. Walk in for urgent care. Call for pain and video psychiatry. Closed Sunday.",
    type: "website",
    locale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": locations.map((location) => ({
    "@type": "MedicalClinic",
    name: practice.name,
    url: practice.website,
    telephone: location.phoneDisplay,
    email: practice.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.neighborhood,
      addressRegion: "IL",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: `${location.openHour.toString().padStart(2, "0")}:00`,
      closes: `${location.closeHour.toString().padStart(2, "0")}:00`,
    },
    medicalSpecialty: ["PainManagement", "Psychiatric"],
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable} antialiased`}>
        <LocaleProvider>
          <SiteNotice />
          <SiteHeader />
          <div className="pb-52 print:pb-0 md:pb-24">{children}</div>
          <SiteFooter />
          <CallBar />
          <ChatWidget />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
