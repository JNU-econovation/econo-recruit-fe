import { Score } from "@/src/constants/applicant/27";
import { useState } from "react";
import MyScoreForm from "./MyScoreForm";
import MyScoreViewer from "./MyScoreViewer";

export type MyScoreMode = "initialForm" | "viewer" | "editForm";
export interface MyScoreProps {
  applicantId: string;
  scores: Score[];
}

const MyScore = ({ applicantId, scores }: MyScoreProps) => {
  const [mode, setMode] = useState<MyScoreMode>(
    scores.length === 0 ? "initialForm" : "viewer"
  );
  const onChangeMode = () => {
    setMode(mode === "viewer" ? "editForm" : "viewer");
  };

  return (
    <>
      {mode === "viewer" ? (
        <MyScoreViewer scores={scores} onChangeMode={onChangeMode} />
      ) : (
        <MyScoreForm
          applicantId={applicantId}
          scores={scores}
          mode={mode}
          onChangeMode={onChangeMode}
        />
      )}
    </>
  );
};

export default MyScore;
