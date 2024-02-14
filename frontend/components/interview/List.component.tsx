"use client";

import {
  interviewListState,
  interviewPopupBooleanState,
} from "@/src/stores/interview/Interview.atom";
import { useAtomValue, useSetAtom } from "jotai";

const InterviewListComponent = () => {
  const boardData = useAtomValue(interviewListState);
  const setIsPopuped = useSetAtom(interviewPopupBooleanState);
  const onBoardClick = () => {
    setIsPopuped(true);
  };
  return (
    <div className="flex flex-col">
      {boardData.map((board, idx) => (
        <button
          className="flex h-[calc(14vh-6.5rem)] min-h-[4.5rem] border-t-[1px] border-secondary-100"
          onClick={onBoardClick}
          key={idx}
        >
          <div className="flex w-full h-full items-center justify-between">
            <div className="font-semibold text-lg">{board.title}</div>
            <div className="flex gap-24 text-secondary-200">
              <div className="flex gap-12">
                {board.apply.map((a) => (
                  <div key={a}>{a}</div>
                ))}
              </div>
              <div className="flex items-center gap-24">
                <div>{board.score}</div>
                <div>{board.registerDate}</div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
export default InterviewListComponent;
