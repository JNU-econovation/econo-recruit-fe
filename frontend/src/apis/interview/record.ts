import { https } from "@/src/functions/axios";

export interface InterviewRes {
  url: string;
  record: string;
}

export const getInterviewRecord = async (id: string) => {
  const { data } = await https.get<InterviewRes>(`/records`, {
    params: { applicantId: id },
  });
  return data;
};

export interface interviewReqBody {
  applicantId: string;
  url: string;
  record: string;
}

export const postInterviewRecord = async (recode: interviewReqBody) => {
  const { data } = await https.post<interviewReqBody>(`/records`, recode);

  return data;
};

export interface putInterviewReq {
  applicantId: string;
  record?: string;
  url?: string;
}

export const putInterviewRecord = async ({
  applicantId,
  record,
}: putInterviewReq) => {
  const { data } = await https.put<string>(
    `/applicants/${applicantId}/records`,
    { record }
  );
  return data;
};

export const putInterviewUrl = async ({
  applicantId,
  url,
}: putInterviewReq) => {
  const { data } = await https.put<string>(
    `/applicants/${applicantId}/records`,
    { url }
  );

  return data;
};
