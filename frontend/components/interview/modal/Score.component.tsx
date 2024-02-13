"use client";
import { FC, useState } from "react";
import InterviewScoreCellComponent from "./ScoreCell.component";
import { ScoreRes, scoreDetail } from "@/src/apis/score";

interface InterviewScoreProps {
  score: ScoreRes;
}

const InterviewScoreComponent: FC<InterviewScoreProps> = ({ score }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scoreData = Object.entries(score.scoreVo).slice(1);

  return (
    <div className="flex flex-col w-full my-10 items-end">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className="text-sm text-secondary-100 underline underline-offset-2">
          {isOpen ? "접어 두기" : "상세 보기"}
        </span>
      </button>
      {isOpen ? (
        <div className="flex flex-col w-full gap-6 mt-8">
          {scoreData.map((score, index) => (
            <InterviewScoreCellComponent item={score} key={index} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default InterviewScoreComponent;
