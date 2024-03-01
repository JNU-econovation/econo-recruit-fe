import ScoreCell from "./ScoreCell";
import { Score } from "@/src/constants/applicant/27";

interface AvgScoreProps {
  totalAverage: number;
  fieldAverages: Score[];
}
interface TotalAverageProps extends Omit<AvgScoreProps, "fieldAverages"> {}

const TotalAverage = ({ totalAverage }: TotalAverageProps) => {
  return (
    <div className="w-full relative">
      <p className="w-full text-5xl text-dark font-extrabold text-center">
        {totalAverage}
      </p>
      <div className="bg-primary-300 absolute w-full h-5 top-8 -z-10"></div>
    </div>
  );
};

const AvgScore = ({ totalAverage, fieldAverages }: AvgScoreProps) => {
  return (
    <div className="w-full grid grid-cols-[5rem_1fr] gap-12">
      <TotalAverage totalAverage={totalAverage} />
      <div className="flex w-full justify-between">
        {fieldAverages.map(({ fieldName, score }) => (
          <ScoreCell fieldName={fieldName} score={score || 0} />
        ))}
      </div>
    </div>
  );
};

export default AvgScore;
