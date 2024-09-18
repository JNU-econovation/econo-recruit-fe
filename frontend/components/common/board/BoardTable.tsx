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
          {boardRows.map((item) => (
            <BoardCell
              key={item.id}
              title={item.title}
              subElements={item.subElements}
              passState={item.passState}
              onClick={handleModalOpen(item.id)}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default BoardTable;
