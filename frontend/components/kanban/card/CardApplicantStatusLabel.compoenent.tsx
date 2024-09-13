interface KanbanCardApplicantStatusLabelProps {
  passState: "non-passed" | "first-passed" | "final-passed";
}

const KanbanCardApplicantStatusLabel = ({
  passState,
}: KanbanCardApplicantStatusLabelProps) => {
  switch (passState) {
    case "non-passed":
      return (
        <div className="bg-gray-300 text-xs px-[10px] py-[5px] rounded-[10px]">
          처리중
        </div>
      );
    case "first-passed":
      return (
        <div className="bg-lime-300 text-xs px-[10px] py-[5px] rounded-[10px]">
          1차 합격
        </div>
      );
    case "final-passed":
      return (
        <div className="bg-blue-300 text-xs px-[10px] py-[5px] rounded-[10px]">
          최종 합격
        </div>
      );
  }
};

export default KanbanCardApplicantStatusLabel;
