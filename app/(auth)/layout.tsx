import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Griot",
  description: "A vocabulary learning app for language learners.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
