import { https } from "@/src/functions/axios";
import { KanbanColumnData } from "../../stores/kanban/Kanban.atoms";

export interface KanbanCardReq {
  id: number;
  boardId: number;
  columnId: number;
  nextBoardId: number | null;
  cardType: "WORK_CARD" | "APPLICANT" | "INVISIBLE";
  title: string;
  content: string;
  labelCount: number;
  major: string;
  applicantId: string;
  commentCount: number;
  firstPriority: string;
  secondPriority: string;
  isLabeled: boolean;
}

// TODO: card api 추가 시 수정 필요
export const getKanbanCards = async (columnId: string, generation: string) => {
  const { data } = await https.get<KanbanCardReq[]>(
    `/navigations/${columnId}/boards?${new URLSearchParams({
      year: generation,
    })}`
  );

  return data;
};

interface KanbanNavigationReq {
  columnsId: number;
  title: string;
  navigationId: number;
  nextColumnsId: number;
}

export const getColums = async (navigationId: string) => {
  const { data } = await https.get<KanbanNavigationReq[]>(
    `/boards/navigations/${navigationId}/columns`
  );

  const startColumn = data.filter((column) => column.nextColumnsId === null);

  const locationSort = (
    column: KanbanNavigationReq[]
  ): KanbanNavigationReq[] => {
    if (column.length === data.length) return column;

    const nextColumnId = column[column.length - 1].columnsId;
    const nextColumn = data.filter(
      (column) => column.nextColumnsId === nextColumnId
    );

    return locationSort([...column, ...nextColumn]);
  };

  return locationSort(startColumn).reverse();
};

interface addColumnReq {
  navigationId: string;
  title: string;
}

export const postAddColumn = async ({ navigationId, title }: addColumnReq) => {
  const { data } = await https.post<string>(
    `/boards/navigations/${navigationId}/columns`,
    null,
    {
      params: { title },
    }
  );

  return data;
};

interface addCardReq {
  columnId: number;
  title: string;
}

export const postAddCard = async ({ columnId, title }: addCardReq) => {
  const { data } = await https.post<string>(`/boards/work-cards`, {
    columnId,
    title,
    content: "",
  });

  return data;
};

export const getAllKanbanData = async (
  navigationId: string,
  generation: string
): Promise<KanbanColumnData[]> => {
  const columnsData = await getColums(navigationId);
  const cardsData = await getKanbanCards(navigationId, generation);

  return columnsData.map((column) => {
    const startColumnCardData = cardsData
      .filter((card) => card.columnId === column.columnsId)
      .filter((card) => card.cardType === "INVISIBLE");

    const findLocationData = (
      columnCardsData: KanbanCardReq[]
    ): KanbanCardReq[] => {
      if (columnCardsData[columnCardsData.length - 1].nextBoardId === null) {
        return columnCardsData;
      }

      const nextBoardId =
        columnCardsData[columnCardsData.length - 1].nextBoardId;

      const nextColumnCardsData = cardsData.find(
        (card) => card.boardId === nextBoardId
      );

      if (!nextColumnCardsData) return columnCardsData;

      return findLocationData([...columnCardsData, nextColumnCardsData]);
    };

    return {
      id: column.columnsId,
      title: column.title,
      card: findLocationData(startColumnCardData)
        .map((card) => {
          if (!card) return null;
          return {
            id: card.id,
            boardId: card.boardId,
            cardType: card.cardType,
            title: card.title,
            major: card.major.split('"').join(""),
            applicantId: card.applicantId,
            apply: [
              card.firstPriority.split('"').join(""),
              card.secondPriority.split('"').join(""),
            ].filter((apply) => apply !== ""),
            comment: card.commentCount,
            heart: card.labelCount,
            isHearted: card.isLabeled,
          };
        })
        .filter((card) => card !== null),
    };
  });
};

interface LocationReq {
  boardId: number;
  targetBoardId: number;
}

export const postLocations = async (body: LocationReq) => {
  const { data } = await https.post("/boards/locations", body);

  return data;
};

interface LocationcolumnReq {
  columnId: number;
  targetColumnId: number;
}

export const putColumnsLocations = async (body: LocationcolumnReq) => {
  const { data } = await https.put("/boards/columns", body);

  return data;
};

export interface KanbanNavReq {
  id: string;
  navTitle: string;
}

export const getAllKanbanNav = async () => {
  const { data } = await https.get<KanbanNavReq[]>("/boards/navigations");

  return data;
};

export const getKanbanNav = async (navId: string) => {
  const { data } = await https.get<KanbanNavReq>(
    `/boards/navigations/${navId}`
  );

  return data;
};

export const postKanbanNav = async (navTitle: string) => {
  const { data } = await https.post<KanbanNavReq>("/boards/navigations", {
    params: { navTitle },
  });

  return data;
};
