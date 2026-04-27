import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/lib/cart-provider";
import { XulaninChatbot } from "@/components/xulanin-chatbot";
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
  title: "Xubie Snacks | Snacks That Smack",
  description:
    "Handcrafted Banana Pudding, Biscoff Banana Pudding, and Xubie Cake from San Jose, CA. Order via WhatsApp, DM, or our site. Bay Area pickup and delivery.",
  keywords:
    "xubie snacks, banana pudding, biscoff pudding, xubie cake, san jose snacks, bay area desserts, handcrafted treats, pop-up snacks",
  openGraph: {
    title: "Xubie Snacks | Snacks That Smack",
    description:
      "Handcrafted desserts by Nina Lux. Banana Pudding, Biscoff Banana Pudding, and Xubie Cake. Order now for Bay Area pickup and delivery.",
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
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <XulaninChatbot />
        </CartProvider>
      </body>
    </html>
  );
}
