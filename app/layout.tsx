import type { Metadata } from "next";
import "./globals.css";
import { Lora, Nunito_Sans } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verbum | For English learners",
  description: "A vocabulary learning app for English learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${nunitoSans.variable}`}>
      <body className={nunitoSans.className}>{children}</body>
    </html>
  );
}
