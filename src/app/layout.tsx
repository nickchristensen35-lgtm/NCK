import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

export const metadata: Metadata = {
  title: "Commercial Kitchen Hire Adelaide | Norwood Commercial Kitchen",
  description: "Adelaide's premier commercial kitchen hire in Norwood SA. Rent from $45/hr — no lock-in contracts, 24/7 access. Council-approved & fully equipped with combi oven, bratt pan, blast chiller & walk-in coolroom. Ideal for caterers, bakers, food truck operators, market stall holders & small food producers.",
  keywords: "commercial kitchen hire Adelaide, commercial kitchen rent Adelaide, kitchen hire SA, commercial kitchen Norwood, food business Adelaide, catering kitchen hire Adelaide, licensed commercial kitchen Adelaide, kitchen space for rent Adelaide, commercial kitchen by the hour Adelaide, food entrepreneur Adelaide, shared commercial kitchen SA, council approved kitchen Adelaide",
  openGraph: {
    title: "Commercial Kitchen Hire Adelaide | Norwood Commercial Kitchen",
    description: "Adelaide's premier commercial kitchen hire from $45/hr. No lock-in contracts. 24/7 access. Council approved. Norwood SA.",
    url: "https://norwoodcommercialkitchen.com.au",
    siteName: "Norwood Commercial Kitchen",
    locale: "en_AU",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
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
