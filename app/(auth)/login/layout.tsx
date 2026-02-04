import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Verbum",
  description: "A vocabulary learning app for English learners.",
};

export default function LoginLayout({
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
