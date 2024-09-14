import { ApplicantPassState } from "@/src/apis/kanban";

const labelConfig = {
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

const KanbanCardApplicantStatusLabel = ({ passState }: ApplicantPassState) => {
  const { backgroundColor, label } = labelConfig[passState];
  return (
    <div className={`${backgroundColor} text-xs px-2.5 py-1.5 rounded-lg`}>
      {label}
    </div>
  );
};

export default KanbanCardApplicantStatusLabel;
