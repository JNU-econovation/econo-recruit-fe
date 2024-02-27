import {
  postApplicant,
  postApplicantBackup,
  postApplicantTimeline,
} from "@/src/apis/application";
import { CURRENT_GENERATION } from "@/src/constants";
import { localStorage } from "@/src/functions/localstorage";
import { ApplicationQuestion } from "../constants/application/type";
import { ApplicantReq } from "../apis/applicant";

// 깊은 탐색을 통해 지원자가 작성한 데이터를 추출하는 함수
const extractApplicantData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: { [key: string]: any } | ApplicationQuestion[],
  applicationData: Set<ApplicantReq>
) => {
  if (node === null) return;
  if (Array.isArray(node)) {
    node.forEach((element) => {
      extractApplicantData(element, applicationData);
    });
    return;
  }

  Object.entries(node).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((element) => {
        extractApplicantData(element, applicationData);
      });
      return;
    }
    if (key === "name" && value !== "timeline" && value !== "channel") {
      if ("require" in node) {
        if (localStorage.get(value, "").length === 0 && node.require) {
          throw new Error(`지원서 작성이 완료되지 않았습니다. ${value}`);
        }
        applicationData.add({
          name: value,
          answer: JSON.stringify(localStorage.get(value, "")),
        });
      }
    }
  });
};

export const postApplication = async (
  applicationQuestions: ApplicationQuestion[]
) => {
  const isSend = confirm("지원서를 제출하시겠습니까?");
  if (!isSend) return false;

  const applicationData = new Set<ApplicantReq>();
  let applicantId: string;

  try {
    extractApplicantData(applicationQuestions, applicationData);

    applicationData.add({
      name: "generation",
      answer: `${CURRENT_GENERATION}`,
    });
    applicationData.add({
      name: "uploadDate",
      answer: `${new Date().getTime()}`,
    });
    const channel = localStorage.get<string[]>("channel", []);
    channel.push(localStorage.get("channelEtc", ""));

    applicationData.add({
      name: "channel",
      answer: JSON.stringify(channel.join(",")),
    });

    if (localStorage.get("channel", "").length === 0) {
      if (channel.length === 0) {
        throw new Error("지원 경로를 선택해주세요.");
      }
    }

    const timeline = localStorage.get<number[]>("timeline", []);
    if (!Array.isArray(timeline) || timeline.length === 0) {
      throw new Error("시간표가 존재하지 않습니다.");
    }

    if (Date.now() > Date.UTC(2023, 8, 15, 15, 0, 0)) {
      throw new Error("지원 기간이 종료되었습니다.");
    }

    applicantId = await postApplicant(Array.from(applicationData));
    await postApplicantTimeline(applicantId, timeline);

    applicationData.add({
      name: "applicantId",
      answer: applicantId,
    });
    applicationData.add({
      name: "timeline",
      answer: JSON.stringify(timeline),
    });
  } catch (e) {
    await postApplicantBackup(Array.from(applicationData));
    alert(`지원서 제출에 실패했습니다. 관리자에게 문의해주세요.\n ${e}`);
    return false;
  }

  window.localStorage.clear();
  window.history.pushState(null, "", "/application/done?id=" + applicantId);
  window.history.go(0);
  return true;
};
