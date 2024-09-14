import { ApplicantPassState, KanbanCardReq } from "@/src/apis/kanban";
import { cn } from "@/src/utils/cn";

interface labelConfigType {
  backgroundColor: string;
  label: string;
}

export const labelConfig: Record<ApplicantPassState, labelConfigType> = {
  "non-processed": {
    backgroundColor: "bg-gray-300",
    label: "처리중",
  },
  "first-passed": {
    backgroundColor: "bg-lime-300",
    label: "1차 합격",
  },
  "final-passed": {
    backgroundColor: "bg-blue-300",
    label: "최종 합격",
  },
  "non-passed": {
    backgroundColor: "bg-red-300",
    label: "탈락",
  },
};

const KanbanCardApplicantStatusLabel = ({
  passState,
}: KanbanCardReq["state"]) => {
  const { backgroundColor, label } = labelConfig[passState];
  return (
    <div className={cn("text-xs px-2.5 py-1 rounded-lg", backgroundColor)}>
      {label}
    </div>
  );
};

export default KanbanCardApplicantStatusLabel;
