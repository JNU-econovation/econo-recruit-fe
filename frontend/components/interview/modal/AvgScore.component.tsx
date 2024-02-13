import { scoreDetail } from "@/src/apis/score";
import { clamp } from "@/src/functions/calculator";

interface InterviewAvgScoreProps {
  totalAverage: number;
  average: scoreDetail[];
}

const InterviewAvgScoreComponent = ({
  totalAverage,
  average,
}: InterviewAvgScoreProps) => {
  return (
    <div className="flex w-full items-center mt-10 gap-9">
      <div className="flex-[0_0_6.7rem]">
        <span className="text-5xl font-extrabold text-[#333333] relative">
          <div className="absolute w-full h-5 bg-[#A6BFFF] top-9 -z-10"></div>
          {clamp(totalAverage, 0, 5).toFixed(2)}
        </span>
      </div>
      <div className="flex w-full justify-around">
        {average.map((score) => (
          <div
            key={score.creteria}
            className="flex flex-col items-center justify-center gap-1 flex-[0_0_4.1rem]"
          >
            <span className="text-2xl font-semibold text-[#4E4E4E] max-w-full">
              {clamp(score.score, 0, 5).toFixed(2)}
            </span>
            <span className="text-sm text-[#4F4F4F]">{score.creteria}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewAvgScoreComponent;
