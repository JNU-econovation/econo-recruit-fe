import { https } from "@/src/functions/axios";
import { PageInfo } from "../applicant";

export interface RecordsRes {
  applicantId: string;
  scores: number;
  name: string;
  url: string;
  record: string;
  field1: string;
  field2: string;
  grade: string;
  semester: string;
  modifiedAt: string;
}

interface RecordsByPageRes {
  records: RecordsRes[];
  pageInfo: PageInfo;
}

export const getInterviewRecordByPageWithOrder = async (
  page: number,
  order: string
) => {
  const {
    data: { records, pageInfo },
  } = await https.get<RecordsByPageRes>(
    `/page/${page}/records?sortType=${order}`
  );

  return {
    maxPage: pageInfo.endPage,
    records,
  };
};

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

/** THIS API MAY UNUSED. PLEASE REMOVE THIS COMMENT IF YOU WANT USE */
export const getInterviewRecordAll = async () => {
  const { data } = await https.get<InterviewRes[]>(`/records/all`);

  return data;
};

export interface InterviewerReq {
  id: number;
  name: string;
  year: number;
  role: "ROLE_GUEST" | "ROLE_TF" | "ROLE_OPERATION" | "ROLE_PRESIDENT";
}

export const getAllInterviewerWithOrder = async (order: string) => {
  const { data } = await https.get<InterviewerReq[]>(
    `/interviewers?order=${order}`
  );

  return data;
};

interface ApplicantReq {
  id: number;
  name: string;
  year: number;
  email: string;
  role: "ROLE_GUEST" | "ROLE_TF" | "ROLE_OPERATION" | "ROLE_PRESIDENT";
}

export const getMyInfo = async () => {
  const { data } = await https.get<ApplicantReq>("/interviewers/me");
  return data;
};

export interface putInterviewerReq {
  id: number;
  role: "GUEST" | "TF" | "OPERATION" | "PRESIDENT";
}

export const putInterviewer = async ({ id, role }: putInterviewerReq) => {
  const { data } = await https.put<string>(`/interviewers/${id}/roles`, null, {
    params: { role },
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

export interface DeleteInterviewerReq {
  idpId: number;
}

export const deleteInterviewer = async ({ idpId }: DeleteInterviewerReq) => {
  const { data } = await https.delete(`/interviewers/${idpId}`);
};
