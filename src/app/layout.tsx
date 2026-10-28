import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Anton, Shrikhand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ToastHost } from "@/components/ui/toast-host";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const shrikhand = Shrikhand({
  variable: "--font-cooper",
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#EDE0D0",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Kumbia Sound | Archivo Histórico de la Cumbia Peruana",
  description:
    "Plataforma de preservación discográfica, genealogía musical y consulta armónica para DJs (1968–2005).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${shrikhand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] border-2 border-[#1F1305] bg-white px-4 py-2 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#1F1305] text-[#1F1305]"
        >
          SALTAR AL EXPEDIENTE ↓
        </a>
        {children}
        <ToastHost />
        <Analytics />
      </body>
    </html>
  );
}
