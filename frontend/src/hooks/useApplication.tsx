import {
  postApplicant,
  postApplicantBackup,
  postApplicantTimeline,
} from "@/src/apis/application";
import { CURRENT_GENERATION } from "@/src/constants";
import { localStorage } from "@/src/functions/localstorage";
import { ApplicationQuestion } from "../constants/application/type";
import {
  getApplicationNames,
  getApplicationValues,
} from "../functions/getApplication";
import { AxiosError } from "axios";
import { isEmail } from "../functions/validator";
import { useAtomValue, useSetAtom } from "jotai";
import {
  applicationDataAtom,
  applicationIndexAtom,
} from "../stores/application";
import { groupRequiredNamesByQuestionId } from "../functions/application";
import { useCallback } from "react";

export const useApplication = () => {
  // TODO: 질문의 이름마다 side effect가 있으니 주의하면 좋을 것
  const setApplicationIndex = useSetAtom(applicationIndexAtom);
  const applicationData = useAtomValue(applicationDataAtom);
  const fieldData = localStorage.get<string>("field", "");

  const {
    END_DATE,
  } = require(`@/src/constants/application/${CURRENT_GENERATION}.ts`);

  /**
   * @param questionId 질문의 index
   * @description 해당 입력 화면의 필수 질문이 모두 작성되었는지 확인하는 함수
   */
  const validateRequiredQuestion = useCallback(
    (questionId: number) => {
      if (typeof window === "undefined") return null;
      let result = true;

      // [예외] 지원 경로 질문에서 채널 "혹은" 기타를 입력한 경우 확인
      if (questionId === 4) {
        const activity = localStorage.get("activity", "");
        const channel = localStorage.get("channel", []);
        const channelEtc = localStorage.get("channelEtc", "");

        if (activity.length === 0) return false;
        if (channel.length === 0 && channelEtc.length === 0) return false;
        return true;
      }

      // [예외] 필수 확인사항 질문 확인
      if (
        (fieldData == "개발자" && questionId === 13) ||
        (fieldData == "기획자" && questionId === 14) ||
        (fieldData == "디자이너" && questionId === 15)
      ) {
        const check = localStorage.get<string>("check", "");

        if (check !== "확인했습니다.") return false;
        return true;
      }

      // [예외] 개인정보 수집 질문 확인
      if (
        (fieldData == "개발자" && questionId === 14) ||
        (fieldData == "기획자" && questionId === 15) ||
        (fieldData == "디자이너" && questionId === 16)
      ) {
        const email = localStorage.get<string>("email", "");
        const personalInformationAgree = localStorage.get<string>(
          "personalInformationAgree",
          ""
        );
        const personalInformationAgreeForPortfolio = localStorage.get<string>(
          "personalInformationAgreeForPortfolio",
          ""
        );

        if (email.length === 0) return false;
        if (personalInformationAgree !== "동의합니다.") return false;
        if (personalInformationAgreeForPortfolio !== "동의합니다.")
          return false;

        return result;
      }

      // [예외] 면접 가능 시간 확인
      if (
        (fieldData == "개발자" && questionId === 15) ||
        (fieldData == "기획자" && questionId === 16) ||
        (fieldData == "디자이너" && questionId === 17)
      ) {
        const timeline = localStorage.get<number[]>("timeline", []);
        if (!Array.isArray(timeline) || timeline.length === 0) {
          result = false;
        }
      }

      // [일반] 필수 질문 확인
      groupRequiredNamesByQuestionId(applicationData)[questionId]?.forEach(
        (name) => {
          const value = localStorage.get(name, "");
          if (value === "") result = false;
        }
      );

      return result;
    },
    [applicationData, fieldData]
  );

  //TODO: applicationNames의 타입 안정성 보장하기
  const getRequiredQuestionValidateMessage = (
    applicationNames: Array<string>
  ) => {
    const nonValidatedQuestion = applicationNames.filter((name) => {
      const localStorageValueFromName = localStorage.get<string>(name, "");

      switch (name) {
        case "personalInformationAgreeForPortfolio":
        case "personalInformationAgree":
          return localStorageValueFromName !== "동의합니다.";
        case "email":
          return !isEmail(localStorageValueFromName);
        case "check":
          return localStorageValueFromName !== "확인했습니다.";
        case "channel":
          return (
            localStorageValueFromName.length === 0 &&
            localStorage.get("channelEtc", "").length === 0
          );
        default:
          return localStorageValueFromName.length === 0;
      }
    });

    const name = nonValidatedQuestion[0];

    if (!name) return;

    switch (name) {
      case "personalInformationAgreeForPortfolio":
      case "personalInformationAgree":
        return "개인정보 수집 및 이용에 동의해주세요.";
      case "email":
        return "이메일을 입력해주세요.";
      case "check":
        return "확인했습니다.를 입력해주세요.";
      case "channel":
        return "지원 경로를 선택해주세요.";
      default:
        return "필수 질문을 작성해주세요.";
    }
  };

  const moveToInvalidInput = (applicationNames: Array<string>) => {
    //검사할 질문들을 필터링
    const nonValidatedQuestion = applicationNames.filter((name) => {
      const EMPTY_STRING: string = "";
      const localStorageValueFromName = localStorage.get(name, EMPTY_STRING);

      switch (name) {
        case "personalInformationAgreeForPortfolio":
        case "personalInformationAgree":
          return localStorageValueFromName !== "동의합니다.";
        case "email":
          return !isEmail(localStorageValueFromName);
        case "check":
          return localStorageValueFromName !== "확인했습니다.";
        case "channel":
          return (
            localStorageValueFromName.length === 0 &&
            localStorage.get("channelEtc", EMPTY_STRING).length === 0
          );
        default:
          return localStorageValueFromName.length === 0;
      }
    });

    const name = nonValidatedQuestion[0];

    Array.from({ length: applicationData.length }, (_, i) =>
      Array.from(getApplicationNames(applicationData[i].nodes))
    ).forEach((applicationName, applicantIndex) => {
      if (applicationName.includes(name)) {
        setApplicationIndex(applicantIndex);
      }
    });
  };

  const canApplicationNext = (applicationNames: Array<string>) => {
    const requiredQuestionValidateMessage =
      getRequiredQuestionValidateMessage(applicationNames);

    if (requiredQuestionValidateMessage) {
      alert(requiredQuestionValidateMessage);
      moveToInvalidInput(applicationNames);
      return false;
    }
  };

  const postApplication = async (
    applicationQuestions: ApplicationQuestion[]
  ) => {
    const isSend = confirm("지원서를 제출하시겠습니까?");
    if (!isSend) return false;

    // 지원 기간 확인
    if (
      Date.now() >
      Date.UTC(
        END_DATE.year,
        END_DATE.month - 1,
        END_DATE.date,
        END_DATE.hours - 9,
        END_DATE.minutes,
        END_DATE.seconds
      )
    ) {
      alert("지원 기간이 종료되었습니다.");
      return false;
    }

    // 시간표 선택 여부 확인
    const timeline = localStorage.get<number[]>("timeline", []);
    if (!Array.isArray(timeline) || timeline.length === 0) {
      alert("시간표를 선택해주세요.");
      return false;
    }

    // 지원 경로 확인
    const channel = localStorage.get<string[]>("channel", []);
    channel.push(localStorage.get("channelEtc", ""));

    const sendValues = getApplicationValues(applicationQuestions).filter(
      (value) => value.name !== "channelEtc" && value.name !== "channel"
    );
    sendValues.push({
      name: "generation",
      answer: `${CURRENT_GENERATION}`,
    });
    sendValues.push({
      name: "uploadDate",
      answer: `${new Date().getTime()}`,
    });
    sendValues.push({
      name: "channel",
      answer: channel.join(","),
    });
    sendValues.push({
      name: "timeline",
      answer: JSON.stringify(timeline),
    });

    const applicationName = Array.from(
      { length: applicationData.length },
      (_, i) => Array.from(getApplicationNames(applicationData[i].nodes))
    ).flat();
    if (!canApplicationNext(applicationName)) {
      return;
    }

    let applicantId = "";
    try {
      applicantId = await postApplicant(
        sendValues.reduce(
          (acc, cur) => {
            acc[cur.name] = cur.answer;
            return acc;
          },
          {} as Record<string, string>
        )
      );
      await postApplicantTimeline(applicantId, timeline);
      await postApplicantBackup(sendValues);
    } catch (e) {
      const defaultMessage = `지원서 제출에 실패했습니다. 관리자에게 문의해주세요.\n ${e}`;
      const message = e instanceof AxiosError ? e.message : defaultMessage;

      alert(message);
      return false;
    }

    window.localStorage.clear();
    window.history.pushState(null, "", "/application/done?id=" + applicantId);
    window.history.go(0);
    return true;
  };

  return { validateRequiredQuestion, canApplicationNext, postApplication };
};
