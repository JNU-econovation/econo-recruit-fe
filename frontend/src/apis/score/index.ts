import { ScoreKeyword } from "../../constants/applicant/26";
import { https } from "../../functions/axios";

export interface scoreDetail {
  creteria: ScoreKeyword;
  score: number;
}

export interface ScoreVo {
  average: scoreDetail[];
  [key: string]: scoreDetail[];
}

// score get response data
export interface ScoreRes {
  totalAverage: number;
  scoreVo: ScoreVo;
}

export const getScore = async (id: string) => {
  const { data } = await https.get<ScoreRes>(`/scores`, {
    params: { applicantId: id },
  });
  return data;
};

export interface ScoreReq {
  applicantId: string;
  scoreVo: scoreDetail[];
}

export const postScore = async (score: ScoreReq): Promise<string> => {
  const { data } = await https.post<string>(`/scores`, score);
  return data;
};
