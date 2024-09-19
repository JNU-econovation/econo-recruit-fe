import { getAllInterviewerWithOrder } from "@/src/apis/interview";
import { APPLICANT_KEYS } from "@/src/constants";
import { https } from "@/src/functions/axios";
import { ApplicantPassState, getKanbanCards, KanbanCardReq } from "../kanban";

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

export interface PageInfo {
  currentPage: number;
  listCount: number;
  pageLimit: number;
  startPage: number;
  endPage: number;
  boardLimit: number;
}

interface ApplicantByPageReq {
  pageInfo: PageInfo;
  answers: AllApplicantReq[];
}

export const getApplicantByPageWithGeneration = async (
  page: number,
  generation: string,
  order: string
): Promise<{ maxPage: number; applicants: ApplicantReq[][] }> => {
  const {
    data: { pageInfo, answers },
  } = await https.get<ApplicantByPageReq>(
    `/page/${page}/year/${+generation}/applicants?order=${order}`
  );

  return {
    maxPage: pageInfo.endPage,
    applicants: answers.map((applicant) =>
      Object.keys(applicant).map((key) => ({
        name: key,
        answer: applicant[key],
      }))
    ),
  };
};

/** THIS API MAY UNUSED. PLEASE REMOVE THIS COMMENT IF YOU WANT USE */
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

export const getApplicationById = async (id: string) => {
  const { data } = await https.get<AllApplicantReq>(
    `/applicants?applicantId=${id}`
  );

  return Object.keys(data).map((key) => ({
    name: key,
    answer: data[key],
  }));
};

export interface ApplicantLabelReq {
  id: number;
  name: string;
  active: boolean;
}

export const getApplicantLabel = async (
  id: string
): Promise<ApplicantLabelReq[]> => {
  const allInterviewers = await getAllInterviewerWithOrder("name");

  try {
    const { data } = await https.get<string[]>(`/applicants/${id}/labels`);
    return allInterviewers
      .map((interviewer) => {
        const label = data.find((label) => label === interviewer.name);
        return {
          id: interviewer.id,
          name: interviewer.name,
          active: !!label,
        };
      })
      .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
  } catch (e) {
    return allInterviewers.map((interviewer) => ({
      id: interviewer.id,
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

interface PatchApplicantStateRes {
  passState: ApplicantPassState;
}

export const patchApplicantState = async (
  id: string,
  afterState: "non-pass" | "pass"
) => {
  const { data } = await https.patch<PatchApplicantStateRes>(
    `/applicants/${id}/state?afterState=${afterState}`
  );

  return data;
};
