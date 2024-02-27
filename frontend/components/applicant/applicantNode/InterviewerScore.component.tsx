"use client";

import { getScore, postScore } from "@/src/apis/score";
import {
  INTERVIEW_SCORE_KEYWOARD,
  ScoreKeyword,
} from "@/src/constants/applicant/26";
import { replacer } from "@/src/functions/replacer";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

interface ApplicantInterviewerScoreProps {
  postId: string;
}

const ApplicantInterviewerScore = ({
  postId,
}: ApplicantInterviewerScoreProps) => {
  const [isShow, setIsShow] = useState(false);
  const [scores, setScores] = useState<Scores>({
    실천력: "",
    협업: "",
    동아리애착: "",
    기타: "",
  });

  type Scores = {
    [key in ScoreKeyword]: string;
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>, title: string) => {
    const value = replacer(e.currentTarget.value, "scoreNumber");
    console.log(value);
    setScores((scores) => ({
      ...scores,
      [title]: value,
    }));
  };

  const onClick = () => {
    setIsShow((prev) => !prev);
  };

  const submitScore = () => {
    const request = {
      applicantId: postId,
      scoreVo: Object.entries(scores).map(([key, value]) => ({
        creteria: key as ScoreKeyword,
        score: Number(value),
      })),
    };
    mutate(request);
    setIsShow((prev) => !prev);
  };

  const { data } = useQuery(["score"], () => getScore(postId), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate } = useMutation(postScore, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {!isShow ? (
        <button
          onClick={onClick}
          className="text-secondary-200 text-sm my-4 underline-offset-2 underline"
        >
          면접관 점수 입력
        </button>
      ) : (
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-start">
            <button
              onClick={onClick}
              className="text-secondary-200 text-sm my-4 underline-offset-2 underline"
            >
              면접관 점수 입력
            </button>
            <button className="h-6 w-6 opacity-90 my-3" onClick={submitScore}>
              <Image
                src={
                  require("/public/icons/arrow.forward.circle.fill.svg").default
                }
                alt="interview score append"
              />
            </button>
          </div>
          <div className="flex justify-between text-sm text-dark mb-12 mt-4 px-4">
            {INTERVIEW_SCORE_KEYWOARD.map((keyword) => (
              <div key={keyword.name} className="flex flex-col items-center">
                <input
                  placeholder="-"
                  className="placeholder-gray-500 border-none text-2xl outline-none w-4 "
                  value={scores[keyword.title]}
                  onInput={(e) => onInput(e, keyword.title)}
                />
                <div>{keyword.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicantInterviewerScore;
