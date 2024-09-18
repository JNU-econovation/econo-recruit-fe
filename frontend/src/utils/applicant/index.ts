import { KanbanCardReq } from "@/src/apis/kanban";

export const findApplicantState = (
  cardsData: KanbanCardReq[],
  applicantId: string
) => {
  return cardsData.find((card) => card.applicantId === applicantId)?.state
    .passState;
};
