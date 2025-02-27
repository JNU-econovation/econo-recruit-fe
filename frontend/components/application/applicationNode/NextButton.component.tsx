"use client";

import useApplicationIndexControll from "@/src/hooks/useApplicationIndexControll.hook";
import { useAtomValue } from "jotai";
import { applicationDataAtom } from "@/src/stores/application";
import { cn } from "@/src/utils/cn";
import { getApplicationNames } from "@/src/functions/getApplication";

import { useApplication } from "@/src/hooks/useApplication";

interface ApplicationNextButtonProps {
  isLast?: boolean;
}

const ApplicationNextButton = ({
  isLast = false,
}: ApplicationNextButtonProps) => {
  const { applicationIndex, goNextIndex, goPrevIndex } =
    useApplicationIndexControll();
  const applicationData = useAtomValue(applicationDataAtom);
  const { postApplication } = useApplication();

  const onNextClick = () => {
    // const applicationName = getApplicationNames(
    //   applicationData[applicationIndex].nodes
    // );
    // if (!canApplicationNext(Array.from(applicationName))) {
    //   return;
    // }

    if (isLast) {
      postApplication(applicationData);
    } else {
      goNextIndex();
    }
  };

  return (
    <div className="flex gap-2 my-4">
      <button
        className="flex-1 rounded-md flex justify-center items-center p-4 bg-light"
        onClick={goPrevIndex}
      >
        이전
      </button>
      <button
        onClick={onNextClick}
        className={cn(
          "flex-1 rounded-md flex justify-center items-center p-4 bg-dark text-white"
        )}
      >
        {isLast
          ? "제출하기"
          : `다음(${applicationIndex + 1}/${applicationData.length})`}
      </button>
    </div>
  );
};

export default ApplicationNextButton;
