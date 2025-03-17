import { ApplicantPassState } from "../apis/kanban";
import { Score, ScoreKeyword } from "../constants/applicant/29";

export const scoreListToObject = (
  scores: number[],
  ScoreSequece: {
    [key: number]: ScoreKeyword;
  }
): Score[] => {
  if (!scores || scores.length === 0) {
    return Object.values(ScoreSequece).map((fieldName) => ({
      fieldName,
      score: "",
    }));
  }
  return scores.map((score, index) => ({
    fieldName: ScoreSequece[index],
    score,
  }));
};

export const scoreObjectToList = (scores: Score[]) => {
  return scores.reduce(
    (acc: number[], cur: Score) => [...acc, cur.score || 0],
    []
  );
};

export function getApplicantPassState(passState: ApplicantPassState) {
  const passStateMap = {
    "non-processed": "처리중",
    "first-passed": "1차 합격",
    "final-passed": "최종 합격",
    "non-passed": "탈락",
  };

  return passStateMap[passState];
}
