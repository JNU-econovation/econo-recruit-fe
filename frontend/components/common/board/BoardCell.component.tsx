import { type ApplicantPassState } from "../../../src/apis/kanban";
import PassStateLabel from "../../passState/PassStateLabel";
import Txt from "../Txt.component";

export interface BoardCellProps {
  title: string;
  subElements: string[];
  passState?: ApplicantPassState;
  score?: string;
  onClick?: () => void;
}

const BoardCell = ({
  title,
  subElements,
  score,
  passState,
  onClick,
}: BoardCellProps) => {
  return (
    <button className="flex border-t py-4 justify-between" onClick={onClick}>
      <Txt typography="h6" className="flex-[2_0_0] text-left truncate">
        {title}
      </Txt>
      {passState && <PassStateLabel passState={passState} />}
      <div className="flex gap-20 flex-[2_0_0] text-center truncate">
        {subElements.map((subElement, index) => (
          <Txt
            key={index}
            typography="p"
            color="light_gray"
            className="w-full flex-1 last:text-right truncate"
          >
            {subElement}
          </Txt>
        ))}
        {score && <Txt typography="p">{score}</Txt>}
      </div>
    </button>
  );
};

export default BoardCell;
