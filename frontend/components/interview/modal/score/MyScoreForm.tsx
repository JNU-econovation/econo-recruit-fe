import { useState } from "react";
import Icon from "../../../common/Icon";
import { MyScoreMode, MyScoreProps } from "./MyScore";
import ScoreInput from "./ScoreInputCell";
import { useMutation } from "@tanstack/react-query";
import { postScore, putScore } from "@/src/apis/score";
import { replacer } from "@/src/functions/replacer";
import { Score, ScoreKeyword } from "@/src/constants/applicant/27";
import { scoreObjectToList } from "@/src/functions/formatter";

interface MyScoreFormProps extends MyScoreProps {
  mode: MyScoreMode;
  onChangeMode: () => void;
}

const MyScoreForm = ({
  applicantId,
  scores,
  mode,
  onChangeMode,
}: MyScoreFormProps) => {
  const [myScores, setMyScores] = useState<Score[]>(scores);

  const { mutate: createMyScore } = useMutation(["createMyScore"], () =>
    postScore({
      applicantId,
      myScore: scoreObjectToList(scores),
    })
  );
  const { mutate: updateMyScore } = useMutation(["updateMyScore"], () =>
    putScore({
      applicantId,
      myScore: scoreObjectToList(scores),
    })
  );

  const onChangeScore = (fieldName: ScoreKeyword, score: number) => {
    const newScore = +replacer(String(score), "scoreNumber");
    setMyScores(
      myScores.map((myScore) =>
        myScore.fieldName === fieldName
          ? { ...myScore, score: newScore }
          : myScore
      )
    );
  };

  const onSubmitScore = () => {
    if (confirm("점수를 제출하시겠습니까?")) {
      mode === "initialForm" ? createMyScore() : updateMyScore();
      onChangeMode();
    }
  };

  return (
    <div className="flex flex-col items-end gap-8">
      <button onClick={onSubmitScore}>
        <Icon icon="arrowForwardCircleFill" />
      </button>
      <div className="w-full flex justify-between">
        {myScores.map(({ fieldName, score }) => (
          <ScoreInput
            fieldName={fieldName}
            score={score}
            onChangeScore={onChangeScore}
          />
        ))}
      </div>
    </div>
  );
};

export default MyScoreForm;
