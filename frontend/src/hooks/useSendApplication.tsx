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
  const isSend = confirm("지원서를 제출하시겠습니까?");
  if (!isSend) return false;
  // if (Date.now() > Date.UTC(2023, 8, 15, 15, 0, 0)) {
  //   alert("지원 기간이 종료되었습니다.");
  //   return false;
  // }

  const timeline = localStorage.get<number[]>("timeline", []);
  if (!Array.isArray(timeline) || timeline.length === 0) {
    alert("시간표를 선택해주세요.");
    return false;
  }

  const channel = localStorage.get<string[]>("channel", []);
  channel.push(localStorage.get("channelEtc", ""));
  if (localStorage.get("channel", "").length === 0) {
    alert("지원 경로를 선택해주세요.");
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
  } catch (e) {
    const defaultMessage = `지원서 제출에 실패했습니다. 관리자에게 문의해주세요.\n ${e}`;
    const message = e instanceof AxiosError ? e.message : defaultMessage;

    alert(message);
    await postApplicantBackup(sendValues);
    return false;
  }

  window.localStorage.clear();
  window.history.pushState(null, "", "/application/done?id=" + applicantId);
  window.history.go(0);
  return true;
};
