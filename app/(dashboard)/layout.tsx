import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Verbum",
  description: "A vocabulary learning app for English learners.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
