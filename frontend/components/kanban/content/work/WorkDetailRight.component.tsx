"use client";

import Txt from "@/components/common/Txt.component";

import dynamic from "next/dynamic";
import { useState } from "react";

const WorkEditorOrViewer = dynamic(
  () => import("@/components/kanban/content/work/EditorOrViewer.component"),
  { ssr: false }
);

interface WorkDetailRightProps {
  workContent: string;
  cardId: number;
}

const WorkDetailRight = ({ workContent, cardId }: WorkDetailRightProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Txt typography="h2">내용</Txt>
      <div className="flex text-sm gap-2 text-secondary-200 items-center">
        <button onClick={() => setIsEdit((prev) => !prev)}>수정</button>
      </div>
      <WorkEditorOrViewer
        content={workContent}
        cardId={cardId}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
    </>
  );
};

export default WorkDetailRight;
