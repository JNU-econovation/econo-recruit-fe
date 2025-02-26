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
  const data = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && category.some((cat) => key.includes(cat))) {
      const value = localStorage.getItem(key);

      const parts = key.split(" - ");
      if (parts.length === 2) {
        const category = parts[0];
        const id = parts[1];
        data.push({
          category,
          id,
          value: value || "",
        });
      }
    }
  }

  return data;
};
