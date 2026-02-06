import Image from "next/image";

import { CardHeader } from "@/components/ui/card";

interface Props {
  title?: string;
  subtitle?: string;
}

export const AuthHeader = ({ title, subtitle }: Props) => {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto w-24 h-24 relative">
        <Image
          src="/Isotypes/VerbumIsotypeLight.svg"
          alt="Verbum Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div>
        <h1 className="text-4xl font-serif font-semibold tracking-tight text-[#0FA3B1]">
          {title || "Welcome to Verbum"}
        </h1>
        <p className="text-sm font-sans text-[#5A5A5A] ">{subtitle}</p>
      </div>
    </CardHeader>
  );
};
