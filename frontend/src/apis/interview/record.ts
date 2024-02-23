import { https } from "@/src/functions/axios";
import { PageInfo } from "../applicant/applicant";

// TODO: RecordsRes 타입 정의 필요한지 확인
// FIXME: field 추가해야 함
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

export const getInterviewRecordByPage = async (page: number, order: string) => {
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
