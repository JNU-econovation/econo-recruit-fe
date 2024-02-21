"use client";

import useApplicationIndexControll from "@/src/hooks/useApplicationIndexControll.hook";
import { postApplication } from "../sendApplication";
import { useAtomValue } from "jotai";
import { applicationDataAtom } from "@/src/stores/application";
import type { ApplicationQuestion } from "@/src/constants/application/type";
import { localStorage } from "@/src/functions/localstorage";

interface ApplicationNextButtonProps {
  canNext: boolean;
  applicationLength: number;
  beforeCheckCallback?: () => boolean;
  isLast?: boolean;
}

const ApplicationNextButton = ({
  canNext,
  beforeCheckCallback,
  applicationLength,
  isLast = false,
}: ApplicationNextButtonProps) => {
  const { applicationIndex, goNextIndex, goPrevIndex } =
    useApplicationIndexControll();
  const nextButtonClassName =
    "flex-1 rounded-md flex justify-center items-center p-4";
  const applicationData = useAtomValue(applicationDataAtom);

  const applicationName = new Set<string>();

  const getApplicationName = (
    node: { [key: string]: any } | ApplicationQuestion[],
    applicationName: Set<string>
  ) => {
    if (node === undefined) return;
    if (Array.isArray(node)) {
      node.forEach((element) => {
        getApplicationName(element, applicationName);
      });
      return;
    }

    Object.entries(node).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((element) => {
          getApplicationName(element, applicationName);
        });
        return;
      }
      if (key === "name" && value !== "timeline") {
        if ("require" in node) {
          if (node.require) {
            applicationName.add(value);
          }
        }
      }
    });
  };

  const beforeCheck = () => {
    if (beforeCheckCallback) {
      if (!beforeCheckCallback()) {
        return false;
      }
    }

    getApplicationName(applicationData[applicationIndex], applicationName);
    const applicationNameArray = Array.from(applicationName);

    for (let i = 0; i < applicationNameArray.length; i++) {
      const name = applicationNameArray[i];

      if (localStorage.get(name, "") === "") {
        if (
          name === "channel" &&
          localStorage.get("channelEtc", "").length === 0
        ) {
          alert("필수 항목을 입력해주세요.");
          return false;
        }

        alert("필수 항목을 입력해주세요.");
        return false;
      }
    }
    return true;
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
        onClick={
          isLast
            ? () => postApplication(applicationData)
            : () => {
                if (!beforeCheck()) {
                  return;
                }
                goNextIndex();
              }
        }
        disabled={!canNext}
        className={
          canNext
            ? nextButtonClassName + " bg-dark text-white"
            : nextButtonClassName + " bg-light text-secondary-100"
        }
      >
        {isLast
          ? "제출하기"
          : `다음(${applicationIndex + 1}/${applicationLength})`}
      </button>
    </div>
  );
};

export default ApplicationNextButton;
