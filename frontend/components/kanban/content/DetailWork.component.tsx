"use client";

import { useQuery } from "@tanstack/react-query";
import { getWork } from "@/src/apis/work";
import WorkDetailLeft from "./work/WorkDetailLeft.component";
import WorkDetailRight from "./work/WorkDetailRight.component";

interface KanbanDetailWorkProps {
  cardId: string;
  generation: string;
}

const KanbanDetailWork = ({ cardId, generation }: KanbanDetailWorkProps) => {
  const { data, isLoading, isError } = useQuery(["work", cardId], () =>
    getWork(cardId)
  );

  if (!data || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="flex flex-col gap-12 ">
      <div className="ml-24 text-3xl font-bold pb-4 border-b-4">
        {generation}기 신입모집
      </div>
      <div className="">
        <div className="flex flex-1 pl-12 h-[calc(100vh-12rem)]">
          <div className="flex flex-1 min-h-0">
            <div className="flex-1 overflow-auto px-12 min-w-[35rem]">
              <WorkDetailLeft
                data={data}
                cardId={+cardId}
                generation={generation}
              />
            </div>
          </div>
          <div className="flex flex-1 min-h-0 [box-shadow:0px_0px_6px_1px_rgba(0,0,0,0.14)] mr-12">
            <div className="flex-1 overflow-auto p-12 min-w-[40rem]">
              <WorkDetailRight data={data.content} cardId={+cardId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanDetailWork;
