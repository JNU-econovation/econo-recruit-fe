import Txt from "../Txt.component";
import { BoardData } from "./Board";
import BoardCell from "./BoardCell.component";

interface BoardTableProps {
  boardRows: BoardData[];
  handleModalOpen: (id: string) => () => void;
}
const BoardTable = ({ boardRows, handleModalOpen }: BoardTableProps) => {
  return (
    <section className="flex flex-col">
      {boardRows.length === 0 ? (
        <Txt>검색결과가 없습니다.</Txt>
      ) : (
        <>
          {boardRows.map(({ id, title, subElements, passState }) => (
            <BoardCell
              key={id}
              title={title}
              subElements={subElements}
              passState={passState}
              onClick={handleModalOpen(id)}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default BoardTable;
