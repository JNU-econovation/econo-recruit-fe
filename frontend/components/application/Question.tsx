"use client";

import Txt from "../common/Txt.component";
import { useAtomValue } from "jotai";
import {
  applicationDataAtom,
  applicationIndexAtom,
} from "@/src/stores/application";
import ApplicationNextButton from "./applicationNode/NextButton";
import { ApplicationLayout } from "./Layout.component";

const ApplicationQuestion = () => {
  const applicationIndex = useAtomValue(applicationIndexAtom);
  const applicationQuestions = useAtomValue(applicationDataAtom);

  const applicationQuestion = applicationQuestions[applicationIndex];

  return (
    <article className="flex flex-col justify-between flex-[3_0_0]">
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
