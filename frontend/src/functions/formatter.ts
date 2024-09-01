import { Score, ScoreKeyword } from "../constants/applicant/28";

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
