import { https } from "@/src/functions/axios";
import { PageInfo } from "../applicant";

export interface SearchInterviewerRes {
  id: string;
  name: string;
  field: string;
  field1: string;
  field2: string;
  grade: string;
  semester: string;
  uploadDate: string;
}

export interface GetSearchTermReq {
  page: number;
  searchTerm: string;
}

export interface GetSearchTermRes {
  answers: SearchInterviewerRes[];
  pageInfo: PageInfo;
}

export const getSearchTerm = async ({ page, searchTerm }: GetSearchTermReq) => {
  const {
    data: { answers, pageInfo },
  } = await https.get<GetSearchTermRes>(
    `/page/${page}/search/${searchTerm}/applicants`
  );

  return {
    answers,
    endPage: pageInfo.endPage,
  };
};
