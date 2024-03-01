import { https } from "../../functions/axios";

interface interviewerScoreRes {
  [key: string]: number[];
}

export interface ScoreReq {
  applicantId: string;
  scoreVo: number[];
}

export interface ScoreRes {
  totalAverage: number;
  fieldAverages: number[];
  myScore: number[];
  interviewers: interviewerScoreRes;
}

export const getScore = async (id: string): Promise<ScoreRes> => {
  const { data } = await https.get(`/scores`, {
    params: { applicantId: id },
  });
  return data;
};

export const postScore = async (body: ScoreReq): Promise<string> => {
  const { data } = await https.post<string>(`/scores`, body);
  return data;
};

export const putScore = async (body: ScoreReq): Promise<string> => {
  const { data } = await https.put<string>(`/scores`, body);
  return data;
};
