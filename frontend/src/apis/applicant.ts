import { https } from "@/src/functions/axios";

export interface ApplicantReq {
  type: string;
  name: string;
  answer: string;
}

export const getApplicant = async (id: string) => {
  const { data } = await https.get<ApplicantReq[]>(`/applicants/${id}`);

  return data;
};

export interface ApplicnatLabelReq {
  name: string;
  active: boolean;
}

export const getApplicantLabel = async (id: string) => {
  const { data } = await https.get<ApplicnatLabelReq[]>(
    `/applicants/${id}/label`
  );

  return data;
};