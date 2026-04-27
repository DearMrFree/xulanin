import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/lib/cart-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xubie Snacks | Handcrafted Snacks That Spark Joy",
  description:
    "Artisan snacks handcrafted in San Jose, CA. From signature trail mixes to wellness bites, Xubie Snacks brings joy to every occasion. Order online for Bay Area delivery.",
  keywords:
    "snacks, artisan snacks, handcrafted, San Jose, Bay Area, trail mix, healthy snacks, vegan snacks, gluten free, party snacks, corporate catering",
  openGraph: {
    title: "Xubie Snacks | Handcrafted Snacks That Spark Joy",
    description:
      "Artisan snacks made with love by Nina Lux. Fresh, handcrafted, and delivered to your door in the Bay Area.",
    type: "website",
    url: "https://xulanin.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
        {/*
         * AI Concierge — Xuliani agent sourced from sof.ai updates as it trains.
         * The bundle injects a Shadow-DOM-isolated chat bubble into the bottom-right
         * and POSTs to sof.ai's embed API for customer support.
         */}
        <Script
          src="https://sof.ai/embed/xuliani.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
