import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Verbum",
  description: "A vocabulary learning app for English learners.",
};

export default function SignInLayout({
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
