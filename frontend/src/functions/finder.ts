import { ApplicantReq } from "../apis/applicant";
import { InterviewRes } from "@/src/apis/interview";

export const applicantDataFinder = (
  applicantData: ApplicantReq[],
  name: string
) => {
  const data = applicantData.find((req) => req.name === name)?.answer ?? "";
  if (name === "id") return data;

  return data === "" ? "" : JSON.parse(data);
};

export const interviewDataFinder = (
  interviewData: InterviewRes[],
  name: string
) => {
  const data = interviewData.find((req) => req.url === name)?.record ?? "";
  return data === "" ? "" : JSON.parse(data);
};
