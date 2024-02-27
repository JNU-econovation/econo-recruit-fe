import { ScoreKeyword } from "@/src/constants/applicant/27";

interface ScoreCellProps {
  fieldName: ScoreKeyword;
  score: number;
}

const ScoreCell = ({ fieldName, score }: ScoreCellProps) => {
  return (
    <div className="w-[4.5rem] flex flex-col gap-2 items-center">
      <span className="text-dark text-3xl font-semibold">{score}</span>
      <span className="text-dark text-center text-sm break-keep">
        {fieldName}
      </span>
    </div>
  );
};
export default ScoreCell;
