import { ApplicantPassState } from "@/src/apis/kanban";

const labelConfig = {
  "non-passed": {
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
};

const KanbanCardApplicantStatusLabel = ({ passState }: ApplicantPassState) => {
  const { backgroundColor, label } = labelConfig[passState];
  return (
    <div
      className={`${backgroundColor} text-xs px-[10px] py-[5px] rounded-[10px]`}
    >
      {label}
    </div>
  );
};

export default KanbanCardApplicantStatusLabel;
