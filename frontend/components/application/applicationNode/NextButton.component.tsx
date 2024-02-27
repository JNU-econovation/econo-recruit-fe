"use client";

import useApplicationIndexControll from "@/src/hooks/useApplicationIndexControll.hook";
import { postApplication } from "../sendApplication";
import { useAtomValue } from "jotai";
import { applicationDataAtom } from "@/src/stores/application";
import { localStorage } from "@/src/functions/localstorage";
import { cn } from "@/src/utils/cn";
import { getApplicationNames } from "@/src/functions/getApplicationName";
import { isEmail } from "@/src/functions/validator";

interface ApplicationNextButtonProps {
  isLast?: boolean;
}

// TODO: 질문의 이름마다 side effect가 있으니 주의하면 좋을 것
const canNext = (applicationName: Array<string>) => {
  return applicationName.every((name) => {
    if (
      name === "personalInformationAgreeForPortfolio" ||
      name === "personalInformationAgree"
    ) {
      return (
        localStorage.get(name, "") !== "동의하지 않습니다." &&
        localStorage.get(name, "") !== ""
      );
    }
    if (name === "email") {
      return isEmail(localStorage.get(name, ""));
    }
    if (name === "check") {
      return localStorage.get(name, "") === "확인했습니다";
    }
    if (localStorage.get(name, "").length === 0) {
      if (
        name === "channel" &&
        localStorage.get("channelEtc", "").length !== 0
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
};

const ApplicationNextButton = ({
  isLast = false,
}: ApplicationNextButtonProps) => {
  const { applicationIndex, goNextIndex, goPrevIndex } =
    useApplicationIndexControll();
  const applicationData = useAtomValue(applicationDataAtom);

  const onNextClick = () => {
    const applicationName = getApplicationNames(
      applicationData[applicationIndex].nodes
    );
    if (!canNext(Array.from(applicationName))) {
      alert("필수 항목을 입력해주세요.");
      return false;
    }

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
