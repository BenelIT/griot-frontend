import { CardContent } from "@/components/ui/card";

interface Props {
  label: string;
  value: number;
  icon: React.ComponentType<any>;
}

export const StatCard = ({ label, value, icon: Icon }: Props) => {
  return (
    <CardContent className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-card-foreground">
            {value}
          </p>
        </div>
      </div>
    </CardContent>
  );
};
