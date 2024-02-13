import { scoreDetail } from "@/src/apis/score";

type InterviewScoreCellComponent = {
  item: [string, scoreDetail[]];
};

const InterviewScoreCellComponent = ({ item }: InterviewScoreCellComponent) => {
  return (
    <div className="flex items-center gap-9">
      <div className="flex flex-[0_0_6.7rem] justify-center items-center">
        <div className="text-primary bg-[#E8EFFF] px-5 py-2 rounded-3xl w-full">
          {item[0]}
        </div>
      </div>

      <div className="flex w-full text-lg justify-around">
        {item[1].map((score) => (
          <span className="flex flex-[0_0_4.1rem] justify-center items-center">
            {Math.floor(score.score)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InterviewScoreCellComponent;
