"use client";

import { KanbanColumnData } from "@/src/stores/kanban/Kanban.atoms";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { getAllKanbanData } from "@/src/apis/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import KanbanDetailBackButton from "../BackButton.component";
import KanbanCardComponent from "../card/Card.component";
import Icon from "@/components/common/Icon";
import { useSearchParams } from "next/navigation";

interface KanbanDetailCardProps {
  generation: string;
  cardId: string;
  applicantId: string;
}

const KanbanColumnDetailCard = ({
  generation,
  cardId,
  applicantId,
}: KanbanDetailCardProps) => {
  const searchParams = useSearchParams();
  const columnIndex = +(searchParams.get("columnIndex") ?? "0");

  const navbarId = useAtomValue(KanbanSelectedButtonNumberState);

  const {
    data: kanbanDataArray,
    isError,
    isLoading,
  } = useQuery<KanbanColumnData[]>({
    queryKey: ["kanbanDataArray", generation],
    queryFn: () => getAllKanbanData(navbarId, generation),
    staleTime: 3000,
  });

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
        <div className="h-fit border-[1px] border-light w-fit p-4 rounded-lg min-w-[17rem] bg-white">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-lg">{cardTitle}</div>
              <div className="flex justify-center items-center px-3 rounded-full bg-primary-200 text-xs text-primary h-4">
                {cardCount}
              </div>
            </div>
            <button>
              <Icon icon="ellipsisBubble" />
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
