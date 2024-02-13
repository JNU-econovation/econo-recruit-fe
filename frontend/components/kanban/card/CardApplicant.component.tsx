"use client";

import { KanbanCardData } from "@/src/stores/kanban/Kanban.atoms";
import { Draggable } from "@hello-pangea/dnd";
import KanbanCardComponent from "./Card.component";

interface KanbanColumnApplicantProps {
  columnIndex: number;
  cardIndex: number;
  index: number;
  column: KanbanCardData;
}

const KanbanColumnApplicant = ({
  index,
  columnIndex,
  column,
  cardIndex,
}: KanbanColumnApplicantProps) => {
  return (
    <Draggable draggableId={`${index}-${column.id}`} index={cardIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-4"
        >
          <KanbanCardComponent data={column} columnIndex={columnIndex} />
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumnApplicant;
