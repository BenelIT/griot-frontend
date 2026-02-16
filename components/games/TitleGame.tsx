import { Badge } from "../ui/badge";

interface Props {
  title: string;
  langInfo?: {
    code: string;
    label: string;
    countryCode: string;
  } | null;
  round: number;
  totalQuestions: number;
  icon: React.ReactNode;
}

export const TitleGame = ({
  title,
  langInfo,
  round,
  totalQuestions,
  icon,
}: Props) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-griot-teal font-serif">
          {icon}
          {title}
        </h2>
        <p className="text-xs text-griot-gray font-sans">
          Practicando en{" "}
          {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
          {langInfo?.label}
        </p>
      </div>
      <Badge variant="secondary" className="font-mono text-sm">
        {round}/{totalQuestions}
      </Badge>
    </div>
  );
};
