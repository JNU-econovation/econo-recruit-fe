"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { KanbanColumnData } from "@/src/stores/kanban/Kanban.atoms";
import KanbanAddColumnComponent from "./column/AddColumn.component";
import { useQuery } from "@tanstack/react-query";
import { getAllKanbanData } from "@/src/apis/kanban/kanban";
import KanbanColumnComponent from "./column/Column.component";
import { useAtom, useAtomValue } from "jotai";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import useDragDrop from "@/src/hooks/useDragDrop.hook";

const KanbanColumnView = () => {
  const navbarId = useAtomValue(KanbanSelectedButtonNumberState);

  const {
    data: kanbanData,
    isError,
    isLoading,
  } = useQuery<KanbanColumnData[]>(["kanbanDataArray", navbarId], () =>
    getAllKanbanData(navbarId)
  );

  if (!kanbanData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      {kanbanData.map((column, index) => (
        <KanbanColumnComponent
          key={index}
          title={column.title}
          columnCount={column.card.length - 1}
          columnData={column.card}
          columnIndex={index}
          columnId={column.id}
        />
      ))}
    </>
  );
};

interface KanbanBoardDragDropProps {
  generation: string;
}

const KanbanBoardDragDropComponent = ({
  generation,
}: KanbanBoardDragDropProps) => {
  const [navbarId] = useAtom(KanbanSelectedButtonNumberState);
  const { onDragEnd } = useDragDrop();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="card" direction="horizontal">
        {(provided) => (
          <div
            key={navbarId}
            className="flex gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <KanbanColumnView />
            <KanbanAddColumnComponent />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default KanbanBoardDragDropComponent;
