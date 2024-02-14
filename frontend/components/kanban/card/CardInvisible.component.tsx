import { Draggable } from "@hello-pangea/dnd";

interface KanbanColumnInvisibleProps {
  columnIndex: number;
  index: number;
}

const KanbanColumnInvisible = ({
  columnIndex,
  index,
}: KanbanColumnInvisibleProps) => {
  return (
    <Draggable draggableId={`${columnIndex}-${index}`} index={columnIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="py-1"
        ></div>
      )}
    </Draggable>
  );
};

export default KanbanColumnInvisible;
