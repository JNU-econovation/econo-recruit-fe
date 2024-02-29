import { ScoreSequence } from "@/src/constants/applicant/27";
import AvgScore from "./AvgScore";
import InterviewerScores from "./InterviewerScore";
import { useState } from "react";
import MyScore from "./MyScore";
import { getScore } from "@/src/apis/score";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { scoreListToObject } from "@/src/functions/formatter";

const InterviewScore = () => {
  const applicantId = useAtomValue(interViewApplicantIdState);
  const [isShow, setIsShow] = useState(false);
  const onToggleIsShow = () => {
    setIsShow((prev) => !prev);
  };
  const {
    data: initScoreData,
    isLoading,
    isError,
  } = useQuery(["score", applicantId], () => getScore(applicantId));

  // TODO: nextjs app router 기능 사용
  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>에러 발생</div>;

  const scoreData = {
    totalAverage: initScoreData.totalAverage,
    fieldAverage: scoreListToObject(initScoreData.fieldAverage, ScoreSequence),
    myScore: scoreListToObject(initScoreData.myScore, ScoreSequence),
    interviewers: Object.fromEntries(
      Object.entries(initScoreData.interviewers).map(([key, value]) => [
        key,
        scoreListToObject(value, ScoreSequence),
      ])
    ),
  };

  return (
    <div className="flex flex-col gap-14 w-full mt-10">
      <AvgScore
        totalAverage={scoreData.totalAverage}
        fieldAverages={scoreData.fieldAverage}
      />
      <MyScore applicantId={applicantId} scores={scoreData.myScore} />
      <div className="flex flex-col items-end w-full gap-8">
        <button
          onClick={onToggleIsShow}
          className="text-sm text-secondary-100 underline underline-offset-2"
        >
          {isShow ? "접어 두기" : "점수 상세 보기"}
        </button>
        {isShow && <InterviewerScores interviewers={scoreData.interviewers} />}
      </div>
    </div>
  );
};

export default InterviewScore;
