"use client";

import { useEffect, useState } from "react";
import Txt from "../common/Txt.component";
import { useAtomValue } from "jotai";
import { applicationIndexAtom } from "@/src/stores/application";
import ApplicationNextButton from "./applicationNode/NextButton.component";
import { ApplicationLayout } from "./Layout.component";
import { ApplicationQuestion } from "@/src/constants/application/type";
import { cn } from "@/src/utils/cn";

interface ApplicationQuestionProps {
  className?: string;
  applicationQuestions: ApplicationQuestion[];
}

const ApplicationQuestion = ({
  className,
  applicationQuestions,
}: ApplicationQuestionProps) => {
  const applicationIndex = useAtomValue(applicationIndexAtom);
  const [applicationQuestion, setApplicationQuestion] = useState(
    applicationQuestions[applicationIndex]
  );

  useEffect(() => {
    setApplicationQuestion(applicationQuestions[applicationIndex]);
  }, [applicationIndex]);

  return (
    <article className={cn("flex flex-col justify-between", className)}>
      <div>
        <Txt typography="h1" className="uppercase">
          ECONOVATION 신입모집 신청
        </Txt>
        <div className="my-6 h-1 bg-gray-300 w-full"></div>
        <ApplicationLayout applicationQuestion={applicationQuestion} />
      </div>
      <div className="translate-x-[calc(100%+1.5rem)] w-[calc(50%-2.3rem)]">
        {applicationQuestions.length - 1 > applicationIndex ? (
          <ApplicationNextButton
            canNext={true}
            applicationLength={applicationQuestions.length}
          />
        ) : (
          <ApplicationNextButton
            canNext={true}
            applicationLength={applicationQuestions.length}
            isLast={true}
            beforeCheckCallback={() => false}
          />
        )}
      </div>
    </article>
  );
};

export default ApplicationQuestion;
