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

// interview 응답 형식은 변경이 잦지 않은데 finder 함수가 필요할까??
// export const interviewDataFinder = (
//   interviewData: InterviewRes[],
//   name: string
// ) => {
//   const data = interviewData.find((req) => req.url === name)?.record ?? "";
//   return data === "" ? "" : JSON.parse(data);
// };
