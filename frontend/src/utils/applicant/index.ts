import { KanbanCardReq } from "@/src/apis/kanban";

export const findApplicantState = (
  cardsData: KanbanCardReq[],
  applicantId: string
) => {
  return cardsData.find((card) => card.applicantId === applicantId)?.state
    .passState;
};

export const changeIntactUrl = (url: string) => {
  if (!url) return url;

  if (!/^https?:\/\//.test(url)) {
    return `http://${url}`;
  }

  return url;
};
