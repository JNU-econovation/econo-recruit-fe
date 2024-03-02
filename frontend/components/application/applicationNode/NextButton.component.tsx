"use client";

import useApplicationIndexControll from "@/src/hooks/useApplicationIndexControll.hook";
import { useAtomValue } from "jotai";
import { applicationDataAtom } from "@/src/stores/application";
import { localStorage } from "@/src/functions/localstorage";
import { cn } from "@/src/utils/cn";
import { getApplicationNames } from "@/src/functions/getApplication";
import { isEmail } from "@/src/functions/validator";
import { postApplication } from "@/src/hooks/useSendApplication";

interface ApplicationNextButtonProps {
  isLast?: boolean;
}

// etc. 단순히 boolean이 아닌 어느 곳에서 터지는 지와 그 이유를 담은 객체를 반환하면 어떨까?
// TODO: 질문의 이름마다 side effect가 있으니 주의하면 좋을 것
const canNext = (applicationNames: Array<string>) => {
  return applicationNames.every((name) => {
    const EMPTY_STRING: string = "";
    const localStorageValueFromName = localStorage.get(name, EMPTY_STRING);

    if (
      name === "personalInformationAgreeForPortfolio" ||
      name === "personalInformationAgree"
    ) {
      return localStorageValueFromName === "동의합니다.";
    }
    if (name === "email") {
      return isEmail(localStorageValueFromName);
    }
    if (name === "check") {
      return localStorageValueFromName === "확인했습니다";
    }
    return (
      !(localStorageValueFromName.length === 0) ||
      (name === "channel" && localStorage.get("channelEtc", "").length !== 0)
    );
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
      return;
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
