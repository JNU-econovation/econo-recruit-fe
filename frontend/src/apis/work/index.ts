import { https } from "@/src/functions/axios";
import { getInterviewer } from "../interview";

export interface Work {
  title: string;
  content: string;
}

export const getWork = async (cardId: string) => {
  const response = await https.get<Work>(`/cards/${cardId}`);
  return response.data;
};

export const putWork = async ({
  cardId,
  title,
  content,
}: {
  cardId: number;
  title?: string;
  content?: string;
}) => {
  let resData;
  if (!title) resData = { content };
  else if (!content) resData = { title };
  else resData = { title, content };
  const response = await https.put<Work>(`/boards/cards/${cardId}`, resData);
  return response.data;
};

export const deleteWork = async (cardId: string) => {
  const response = await https.delete(`/cards/${cardId}`);
  return response.data;
};

export interface WorkLabelReq {
  id: number;
  name: string;
  active: boolean;
}

export const postWorkLabel = async (cardId: number) => {
  const { data } = await https.post(`/cards/${cardId}/labels`);

  return data;
};

export const getWorkLabel = async (cardId: number): Promise<WorkLabelReq[]> => {
  const allInterviewers = await getInterviewer();

  try {
    const { data } = await https.get<string[]>(`/cards/${cardId}/labels`);
    return allInterviewers.map((interviewer) => {
      const label = data.find((label) => label === interviewer.name);
      return {
        id: interviewer.id,
        name: interviewer.name,
        active: !!label,
      };
    });
  } catch (e) {
    return allInterviewers.map((interviewer) => ({
      id: interviewer.id,
      name: interviewer.name,
      active: false,
    }));
  }
};
