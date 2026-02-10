import { LucideIcon } from "lucide-react";

import { Card } from "../ui/card";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
}

export const StatCard = ({
  label,
  value,
  icon: Icon,
  variant = "secondary",
}: Props) => {
  const variantStyles = {
    primary: "text-griot-cream",
    secondary: "text-griot-teal",
  };

  const iconBgStyles = {
    primary: "bg-griot-cream",
    secondary: "bg-griot-teal/10",
  };

  return (
    <Card
      className="group relative overflow-hidden border border-griot-sand/50 bg-griot-cream shadow-sm sm:shadow-md 
                transition-all hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="relative p-3 sm:p-5 lg:p-6 flex items-center justify-between gap-2">
        <div className="flex-1 space-y-0.5 sm:space-y-2 min-w-0">
          <p className="text-[10px] sm:text-[14px] font-sans truncate text-griot-gray">
            {label}
          </p>
          <p
            className={`text-xl sm:text-3xl font-bold font-serif tracking-tight ${variantStyles[variant]}`}
          >
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`rounded-lg p-1.5 sm:p-3 shrink-0 ${iconBgStyles[variant]}`}
        >
          <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${variantStyles[variant]}`} />
        </div>
      </div>
    </Card>
  );
};
