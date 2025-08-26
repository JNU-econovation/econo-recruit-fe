import { https } from "../../functions/axios";

export interface RecruitmentTime {
  year: number;
  startDate: number;
  endDate: number;
}

export interface RecruitmentResponse {
  endAt: string;
  recruitmentId: number;
  startAt: string;
  states: "ACTIVE" | "NON_START" | "END" | "RECRUITING";
}

export interface PageInfo {
  boardLimit: number;
  currentPage: number;
  endPage: number;
  listCount: number;
  pageLimit: number;
  startPage: number;
}

export interface RecruitmentListResponse {
  pageInfo: PageInfo;
  responses: RecruitmentResponse[];
}

export const postRecruitmentTime = async ({
  year,
  startDate,
  endDate,
}: RecruitmentTime) => {
  const { data } = await https.post<string>(`/recruitment`, {
    year,
    startAt: startDate,
    endAt: endDate,
  });
  return data;
};

export const getRecruitmentTime = async (
  page: number
): Promise<RecruitmentListResponse> => {
  const { data } = await https.get(`/page/${page}/recruitments`);
  return data;
};

export const deleteRecruitmentTime = async (recruitmentId: string) => {
  const { data } = await https.delete(`/recruitments/${Number(recruitmentId)}`);
  return data;
};
