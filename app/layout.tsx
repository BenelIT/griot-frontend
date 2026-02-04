import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
