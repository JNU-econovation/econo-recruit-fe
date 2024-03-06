import {
  postApplicant,
  postApplicantBackup,
  postApplicantTimeline,
} from "@/src/apis/application";
import { CURRENT_GENERATION } from "@/src/constants";
import { localStorage } from "@/src/functions/localstorage";
import { ApplicationQuestion } from "../constants/application/type";
import { getApplicationValues } from "../functions/getApplication";
import { AxiosError } from "axios";

export const postApplication = async (
  applicationQuestions: ApplicationQuestion[]
) => {
  const channel = localStorage.get<string[]>("channel", []);
  channel.push(localStorage.get("channelEtc", ""));

  if (channel.length === 0) {
    alert("지원 경로를 선택해주세요.");
    return false;
  }

  const isSend = confirm("지원서를 제출하시겠습니까?");
  if (!isSend) return false;
  if (Date.now() > Date.UTC(2024, 2, 14, 15, 0, 0)) {
    alert("지원 기간이 종료되었습니다.");
    return false;
  }

  const timeline = localStorage.get<number[]>("timeline", []);
  if (!Array.isArray(timeline) || timeline.length === 0) {
    alert("시간표를 선택해주세요.");
    return false;
  }

  const check = localStorage.get<string>("check", "");
  if (check !== "확인했습니다") {
    alert("고정 행사 일정에 참여할 것을 확인 해주세요.");
    return false;
  }

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

  //지원 분야 선택 확인 및 필수 질문 확인
  const commonQuestionsField = [
    "reason",
    "future",
    "failual",
    "collaboration",
    "studyPlan",
  ];

  const managerQuestionsField = [
    "communication",
    "experience",
    "experienceTextarea",
    "deep",
  ];
  const designerQuestionsField = [
    "workDescript",
    "keyword",
    "betterment",
    "failure",
    "drain",
  ];
  const developerQuestionsField = [
    "experience",
    "experienceTextarea",
    "restoration",
    "deep",
  ];

  for (const field of commonQuestionsField) {
    const answer = localStorage.get(field, "");
    if (!answer) {
      alert("지원서를 완전히 작성해주세요.");
      return false;
    }
  }

  const userPosition: "개발자" | "디자이너" | "기획자" | "" = localStorage.get(
    "field",
    ""
  );
  if (!userPosition) {
    alert("지원 분야를 선택해주세요.");
    return false;
  }

  if (userPosition === "개발자") {
    for (const field of developerQuestionsField) {
      const answer = localStorage.get(field);
      if (!answer) {
        alert("지원서를 완전히 작성해주세요.");
        break;
      }
    }
  }

  if (userPosition === "디자이너") {
    for (const field of designerQuestionsField) {
      const answer = localStorage.get(field);
      if (!answer) {
        alert("지원서를 완전히 작성해주세요.");
        break;
      }
    }
  }

  if (userPosition === "기획자") {
    for (const field of managerQuestionsField) {
      const answer = localStorage.get(field);
      if (!answer) {
        alert("지원서를 완전히 작성해주세요.");
        break;
      }
    }
  }

  const userField1 = localStorage.get("field1", "");
  const userField2 = localStorage.get("field2", "");
  if (!userField1 && !userField2) {
    alert("희망 분야를 선택해주세요.");
    return false;
  }

  //
  if (sendValues.some((value) => value.answer === "")) {
    alert("지원서를 작성해주세요.");
    return false;
  }

  if (sendValues.find((value) => value.name === "timeline")?.answer === "[]") {
    alert("시간표를 선택해주세요.");
    return false;
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
