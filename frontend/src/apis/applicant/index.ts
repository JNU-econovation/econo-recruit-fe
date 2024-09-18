import { getAllInterviewerWithOrder } from "@/src/apis/interview";
import { APPLICANT_KEYS } from "@/src/constants";
import { https } from "@/src/functions/axios";
import { ApplicantPassState } from "../kanban";

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

interface ApplicantByPageReqAnswer {
  field: string;
  field1: string;
  field2: string;
  name: string;
  contacted: string;
  classOf: string;
  registered: string;
  grade: string;
  semester: string;
  major: string;
  doubleMajor: string;
  minor: string;
  activity: string;
  reason: string;
  future: string;
  experience: string;
  experienceTextarea: string;
  restoration: string;
  deep: string;
  collaboration: string;
  studyPlan: string;
  portfolio: string;
  fileUrl: string;
  email: string;
  check: string;
  personalInformationAgree: string;
  personalInformationAgreeForPortfolio: string;
  generation: string;
  uploadDate: string;
  channel: string;
  timeline: number[];
  id: string;
  year: number;
  created_at: string;
  passState: {
    passState: ApplicantPassState;
  };
}

interface ApplicantByPageReq {
  pageInfo: PageInfo;
  answers: ApplicantByPageReqAnswer[];
}

export const getApplicantByPageWithGeneration = async (
  page: number,
  generation: string,
  order: string
) => {
  const {
    data: { pageInfo, answers },
  } = await https.get<ApplicantByPageReq>(
    `/page/${page}/year/${+generation}/applicants?order=${order}`
  );

  return {
    maxPage: pageInfo.endPage,
    applicants: answers.map(
      (applicant) =>
        Object.keys(applicant).map((key) => {
          if (key === "passState") {
            return {
              name: "passState",
              answer: applicant.passState.passState,
            };
          }
          return {
            name: key,
            answer: applicant[key as keyof ApplicantByPageReqAnswer],
          };
        }) as ApplicantReq[]
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
  name: string;
  active: boolean;
}

export const getApplicantLabel = async (id: string) => {
  const allInterviewers = await getAllInterviewerWithOrder("name");

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
