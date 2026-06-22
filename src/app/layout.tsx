import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://norwoodcommercialkitchen.com.au"),
  title: {
    default: "Commercial Kitchen Hire Adelaide | Norwood Commercial Kitchen",
    template: "%s | Norwood Commercial Kitchen",
  },
  description: "Hire a fully equipped commercial kitchen in Norwood, Adelaide from $45/hr. Council-approved, 24/7 access, no lock-in contracts. UNOX combi oven, bratt pan, blast chiller, walk-in coolroom & more. Perfect for caterers, bakers, food truck operators & food entrepreneurs.",
  keywords: [
    "commercial kitchen hire Adelaide",
    "commercial kitchen rental Adelaide",
    "commercial kitchen Norwood",
    "commercial kitchen hire SA",
    "kitchen hire Adelaide",
    "commercial kitchen Adelaide",
    "commercial kitchen near me Adelaide",
    "kitchen for hire Adelaide",
    "commercial kitchen space Adelaide",
    "catering kitchen hire Adelaide",
    "licensed commercial kitchen Adelaide",
    "council approved kitchen Adelaide",
    "food production kitchen Adelaide",
    "commercial baking kitchen Adelaide",
    "shared commercial kitchen Adelaide",
    "kitchen hire by the hour Adelaide",
    "food business Adelaide",
    "food entrepreneur Adelaide",
    "commercial kitchen hire South Australia",
    "kitchen hire Norwood SA",
    "59 Queen Street Norwood kitchen",
    "Adelaide eastern suburbs commercial kitchen",
  ],
  authors: [{ name: "Norwood Commercial Kitchen" }],
  creator: "Norwood Commercial Kitchen",
  publisher: "Norwood Commercial Kitchen",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "https://norwoodcommercialkitchen.com.au",
  },
  openGraph: {
    title: "Commercial Kitchen Hire Adelaide | From $45/hr | Norwood Commercial Kitchen",
    description: "Fully equipped commercial kitchen hire in Norwood, Adelaide. $45/hr, 24/7 access, no lock-in. Council-approved with combi oven, bratt pan, blast chiller & walk-in coolroom.",
    url: "https://norwoodcommercialkitchen.com.au",
    siteName: "Norwood Commercial Kitchen",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/Norwood Commercial Kitchen Logo.png",
        width: 1200,
        height: 630,
        alt: "Norwood Commercial Kitchen — Adelaide's premier commercial kitchen hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Kitchen Hire Adelaide | Norwood Commercial Kitchen",
    description: "Fully equipped commercial kitchen hire in Norwood, Adelaide from $45/hr. No lock-in contracts. 24/7 access.",
    images: ["/images/Norwood Commercial Kitchen Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://norwoodcommercialkitchen.com.au",
  name: "Norwood Commercial Kitchen",
  description: "Fully equipped commercial kitchen hire in Norwood, Adelaide. Council-approved facility available from $45/hr with 24/7 access and no lock-in contracts.",
  url: "https://norwoodcommercialkitchen.com.au",
  telephone: "+61475517995",
  email: "hello@norwoodcommercialkitchen.com.au",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "59 Queen Street",
    addressLocality: "Norwood",
    addressRegion: "SA",
    postalCode: "5067",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.9215,
    longitude: 138.6388,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "State", name: "South Australia" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "UNOX Combi Oven", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bratt Pan", value: true },
    { "@type": "LocationFeatureSpecification", name: "Walk-in Cool Room", value: true },
    { "@type": "LocationFeatureSpecification", name: "Blast Chiller", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
  ],
  sameAs: [
    "https://www.instagram.com/norwoodcommercialkitchen",
    "https://www.facebook.com/102043932657134",
  ],
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <CustomCursor />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
