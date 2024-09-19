import { https } from "../../functions/axios";
import { ApplicantPassState } from "../kanban";

export interface Answer {
  field: "개발자" | "디자이너" | "기획자";
  field1: "APP" | "WEB" | "AI" | "GAME";
  field2: "APP" | "WEB" | "AI" | "GAME" | "선택 없음";
  name: string;
  id: string;
  year: number;
  state: {
    passState: ApplicantPassState;
  };
}

export const getAllApplicantsWithPassState = async (generation: string) => {
  // TODO: 머지 하기 전 주석 해제 및 목데이터 삭제
  const { data } = await https.get<Answer[]>(
    `year/${generation}/applicants/pass-state?order=newest`
  );

  return data;
};

export interface PatchApplicantPassStateParams {
  applicantId: string;
  afterState: "non-pass" | "pass";
}
export const patchApplicantPassState = async ({
  afterState,
  applicantId,
}: PatchApplicantPassStateParams) => {
  await https.post(`/applicants/${applicantId}/state?afterState=${afterState}`);
};
