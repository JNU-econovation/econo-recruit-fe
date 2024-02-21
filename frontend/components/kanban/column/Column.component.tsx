import { Draggable, Droppable } from "@hello-pangea/dnd";
import { KanbanCardData } from "@/src/stores/kanban/Kanban.atoms";
import KanbanAddCardComponent from "../card/AddCard.component";
import { KanbanCard } from "../card";
interface KanbanColumnProps {
  columnIndex: number;
  columnData: (KanbanCardData | null)[];
}

const KanbanColumnDroppable = ({
  columnIndex,
  columnData,
}: KanbanColumnProps) => {
  return (
    <Droppable droppableId={`${columnIndex}`} key={columnIndex}>
      {(provided) => (
        <div
          key={columnIndex}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {columnData.map((column, index) => {
            switch (column?.cardType) {
              case "INVISIBLE":
                return (
                  <KanbanCard.Invisible
                    key={column?.id}
                    index={index}
                    columnIndex={columnIndex}
                  />
                );
              case "APPLICANT":
              case "WORK_CARD":
                return (
                  <KanbanCard.Applicant
                    key={column?.id}
                    column={column}
                    columnIndex={columnIndex}
                    index={index}
                    cardIndex={index}
                  />
                );
              default:
                return <></>;
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

interface KanbanColumnComponentProps {
  title: string;
  columnCount: number;
  columnData: (KanbanCardData | null)[];
  columnIndex: number;
  columnId: number;
}

const KanbanColumnComponent = ({
  columnData,
  title,
  columnCount,
  columnIndex,
  columnId,
}: KanbanColumnComponentProps) => {
  return (
    <Draggable
      draggableId={`${columnIndex}`}
      index={columnIndex}
      key={`column-${columnIndex}`}
    >
      {(provided) => (
        <div
          className="h-fit border-[1px] border-light w-fit p-4 rounded-lg min-w-[17rem] bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-lg">{title}</div>
              <div className="flex justify-center items-center px-3 rounded-full bg-primary-200 text-xs text-primary h-4">
                {columnCount}
              </div>
            </div>
            <button>
              <img src="/icons/ellipsis.bubble.svg" alt="ColumnDetail" />
            </button>
          </div>
          <div className="flex flex-col justify-between overflow-auto max-h-[calc(100vh-24rem)]">
            <KanbanColumnDroppable
              columnData={columnData}
              columnIndex={columnIndex}
            />
          </div>
          <KanbanAddCardComponent columnId={columnId} />
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumnComponent;
