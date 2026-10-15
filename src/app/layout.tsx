import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import AddedToast from "@/components/AddedToast";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const signal = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-signal" });

export const metadata: Metadata = {
  title: "FitThread — Wear Your Version",
  description: "Oversized streetwear. No default storyline.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${grotesk.variable} ${signal.variable}`}>
      <body className="min-h-screen bg-ink text-bone antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <AddedToast />
        </CartProvider>
      </body>
    </html>
  );
}
