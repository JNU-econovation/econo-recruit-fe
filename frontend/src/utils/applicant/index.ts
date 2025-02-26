import { KanbanCardReq } from "@/src/apis/kanban";
import { portfolioCategory } from "@/src/constants/application";

export const findApplicantState = (
  cardsData: KanbanCardReq[],
  applicantId: string
) => {
  return cardsData.find((card) => card.applicantId === applicantId)?.state
    .passState;
};

export const getLocalStorage = (category: typeof portfolioCategory) => {
  const data = Object.keys(localStorage)
    .filter((key) =>
      category.some((cat) => key.includes(cat) && key.includes(" - "))
    )
    .map((key) => {
      const value = localStorage.getItem(key) || "";
      const parts = key.split(" - ");

      return {
        category: parts[0],
        id: parts[1],
        value,
      };
    });

  return data;
};
