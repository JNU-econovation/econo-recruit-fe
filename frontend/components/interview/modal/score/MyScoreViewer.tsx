import Icon from "../../../common/Icon";
import { MyScoreProps } from "./MyScore";
import ScoreCell from "./ScoreCell";

interface MyScoreViewerProps extends Omit<MyScoreProps, "applicantId"> {
  onChangeMode: () => void;
}

const MyScoreViewer = ({ scores, onChangeMode }: MyScoreViewerProps) => {
  return (
    <div className="flex flex-col items-end gap-8">
      <button onClick={onChangeMode}>
        <Icon icon="arrowForwardCircleFill" />
      </button>
      <div className="w-full flex justify-between">
        {scores.map(({ fieldName, score }) => (
          <ScoreCell fieldName={fieldName} score={score} />
        ))}
      </div>
    </div>
  );
};

export default MyScoreViewer;
