"use client";

import Txt from "../common/Txt.component";
import { useAtomValue } from "jotai";
import { applicationIndexAtom } from "@/src/stores/application";
import ApplicationNextButton from "./applicationNode/NextButton.component";
import { ApplicationLayout } from "./Layout.component";
import type { ApplicationQuestion } from "@/src/constants/application/type";
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

  const applicationQuestion = applicationQuestions[applicationIndex];

  return (
    <article className={cn("flex flex-col justify-between", className)}>
      <div>
        <Txt typography="h1" className="uppercase">
          ECONOVATION 신입모집 신청
        </Txt>
        <div className="my-6 h-1 bg-gray-300 w-full" />
        <ApplicationLayout applicationQuestion={applicationQuestion} />
      </div>
      <div className="translate-x-[calc(100%+1.5rem)] w-[calc(50%-2.3rem)]">
        {applicationQuestions.length - 1 > applicationIndex ? (
          <ApplicationNextButton />
        ) : (
          <ApplicationNextButton isLast={true} />
        )}
      </div>
    </article>
  );
};

export default ApplicationQuestion;
