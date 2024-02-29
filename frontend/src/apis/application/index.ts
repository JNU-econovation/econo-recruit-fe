import axios from "axios";
import { https } from "../../functions/axios";

export interface ApplicantReq {
  name: string;
  answer: string;
}

export const postApplicant = async (body: object) => {
  const { data } = await https.post(`/applicants`, body);

  return data;
};

export const postApplicantTimeline = async (
  applicantId: string,
  body: number[]
) => {
  const { data } = await https.post(
    `/applicants/${applicantId}/timetables`,
    body
  );

  if (data satisfies string) {
    return data;
  }

  return data;
};

export const postApplicantBackup = async (body: ApplicantReq[]) => {
  await axios.post(`/application/backup`, body);
};
