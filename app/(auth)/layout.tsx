import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Verbum",
  description: "A vocabulary learning app for English learners.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
