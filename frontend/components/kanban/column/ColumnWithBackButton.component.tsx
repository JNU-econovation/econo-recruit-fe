"use client";

import { KanbanColumnData } from "@/src/stores/kanban/Kanban.atoms";
import { useAtom } from "jotai";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllKanbanData } from "@/src/apis/kanban/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import KanbanDetailBackButton from "../BackButton.component";
import KanbanCardComponent from "../card/Card.component";
import EllipsisBubble from "/public/icons/ellipsis.bubble.svg";

interface KanbanDetailCardProps {
  columnIndex: number;
  generation: string;
  cardId: string;
  applicantId: string;
}

const KanbanColumnDetailCard: FC<KanbanDetailCardProps> = ({
  columnIndex,
  generation,
  cardId,
  applicantId,
}) => {
  const [navbarId] = useAtom(KanbanSelectedButtonNumberState);

  const {
    data: kanbanDataArray,
    isError,
    isLoading,
  } = useQuery<KanbanColumnData[]>(["kanbanDataArray", generation], () =>
    getAllKanbanData(navbarId)
  );

  if (!kanbanDataArray || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const cardTitle = kanbanDataArray[columnIndex].title;
  const cardCount = kanbanDataArray[columnIndex].card.length - 1;

  return (
    <div className="max-h-[calc(100vh-20rem)]">
      <div className="p-4">
        <KanbanDetailBackButton generation={generation} />
      </div>
      <div className="overflow-auto max-h-[calc(100vh-10em)]">
        <div className="h-fit border-[1px] border-[#F0F0F0] w-fit p-4 rounded-lg min-w-[17rem] bg-white">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-lg">{cardTitle}</div>
              <div className="flex justify-center items-center px-3 rounded-full bg-[#E8EFFF] text-xs text-[#2160FF] h-4">
                {cardCount}
              </div>
            </div>
            <button>
              <img src={EllipsisBubble} alt="CardDetail" />
            </button>
          </div>
          <div className="flex flex-col justify-between">
            {kanbanDataArray[+columnIndex].card.map(
              (col) =>
                col &&
                col.cardType !== "INVISIBLE" && (
                  <div className="my-2" key={col.id}>
                    <KanbanCardComponent
                      data={col}
                      columnIndex={columnIndex}
                      cardId={cardId}
                      applicantId={applicantId}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumnDetailCard;
