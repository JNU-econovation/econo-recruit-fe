import { APPLICANT_KEYS } from "@/src/constants";
import { https } from "@/src/functions/axios";
import { getAllInterviewer } from "../interview/interviewer";

export interface ApplicantReq {
  name: string;
  answer: string;
}

interface AllApplicantReq {
  [string: string]: string;
}

export const getApplicantByIdWithField = async (
  id: string,
  fields?: string[]
) => {
  if (fields === undefined) {
    fields = APPLICANT_KEYS;
  }
  const { data } = await https.post<AllApplicantReq>(`/boards/${id}`, fields);

  return Object.keys(data).map((key) => ({
    name: key,
    answer: data[key],
  }));
};

interface PageInfo {
  currentPage: number;
  listCount: number;
  pageLimit: number;
  startPage: number;
  endPage: number;
  boardLimit: number;
}

interface ApplicantByPageReq {
  pageInfo: PageInfo;
  applicants: AllApplicantReq[];
}

// FIXME: 지원서 리스트 조회 API 변경
export const getApplicantByPageAndGeneration = async (
  page: number,
  generation: string,
  order: string
): Promise<{ maxPage: number; applicants: ApplicantReq[][] }> => {
  const {
    data: { applicants, pageInfo },
  } = await https.get<ApplicantByPageReq>(
    `/page/${page}/year/${+generation}/applicants?order=${order}`
  );

  return {
    maxPage: pageInfo.endPage,
    applicants: applicants.map((applicant) =>
      Object.keys(applicant).map((key) => ({
        name: key,
        answer: applicant[key],
      }))
    ),
  };
};

export const getAllApplicant = async (
  fields?: string[]
): Promise<ApplicantReq[][]> => {
  if (fields === undefined) {
    fields = APPLICANT_KEYS;
  }
  const { data } = await https.post<AllApplicantReq[]>(`/boards`, fields);
  return data.map((d) =>
    Object.keys(d).map((key) => ({
      name: key,
      answer: d[key],
    }))
  );
};

export const getAppliationById = async (id: string) => {
  const { data } = await https.get<AllApplicantReq>(`/applicants/${id}`);

  return Object.keys(data).map((key) => ({
    name: key,
    answer: data[key],
  }));
};

export interface ApplicantLabelReq {
  name: string;
  active: boolean;
}

export const getApplicantLabel = async (id: string) => {
  const allInterviewers = await getAllInterviewer();

  try {
    const { data } = await https.get<string[]>(`/applicants/${id}/labels`);
    return allInterviewers
      .map((interviewer) => {
        const label = data.find((label) => label === interviewer.name);
        return {
          name: interviewer.name,
          active: !!label,
        };
      })
      .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
  } catch (e) {
    return allInterviewers.map((interviewer) => ({
      name: interviewer.name,
      active: false,
    }));
  }
};

export const postApplicantLabel = async (
  id: string
): Promise<ApplicantLabelReq[]> => {
  const { data } = await https.post<ApplicantLabelReq[]>(
    `/applicants/${id}/labels`
  );

  return data;
};

export const getApplicantTimeTables = async (id: string) => {
  const { data } = await https.get<number[]>(`/applicants/${id}/timetables`);

  return data;
};
