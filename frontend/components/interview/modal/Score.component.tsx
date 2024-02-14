"use client";
import { useState } from "react";
import InterviewScoreCellComponent from "./ScoreCell.component";
import { ScoreRes } from "@/src/apis/score";

interface InterviewScoreComponentProps {
  score: ScoreRes;
}

// TODO: remove postfix "Component"
const InterviewScoreComponent = ({ score }: InterviewScoreComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scoreData = Object.entries(score.scoreVo).slice(1);

  return (
    <div className="flex flex-col w-full my-10 items-end">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className="text-sm text-[#A7A7A7] underline underline-offset-2">
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
