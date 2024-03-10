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

export interface GetSearchKeywordRes {
  answers: SearchInterviewerRes[];
  pageInfo: PageInfo;
}

export const getSearchKeyword = async (page: number, searchKeyword: string) => {
  const {
    data: { answers, pageInfo },
  } = await https.get<GetSearchKeywordRes>(
    `/page/${page}/search/${searchKeyword}/applicants`
  );

  return {
    answers,
    endPage: pageInfo.endPage,
  };
};
