import { https } from "../../functions/axios";

export const getLabel = async (id: string) => {
  const { data } = await https.get<string[]>(`/labels`, {
    params: { applicantId: id },
  });

  return data;
};

export interface LabelReq {
  id: string;
  applicantId: string;
  idpId: string;
}

export const postLabel = async (id: string) => {
  const { data } = await https.post<LabelReq>(`/labels`, { applicantId: id });

  return data;
};
