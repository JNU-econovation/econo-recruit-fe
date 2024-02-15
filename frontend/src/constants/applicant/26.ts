const APPLICANT: ApplicantNode[] = [
  {
    id: 1,
    title: "프로젝트 희망 분야를 선택해주세요.*",
    type: "customField",
    value: {
      name: "field",
    },
    subValue: [
      { title: "1순위", name: "field1" },
      { title: "2순위", name: "field2" },
    ],
  },
  {
    id: 2,
    title: "학적 상태를 입력해주세요.*",
    type: "customHuman",
    value: {
      hunamName: { name: "name" },
      humanEmail: { name: "email" },
      humanPhone: { name: "contacted" },
      humanEtc: [
        { name: "classOf" },
        { name: "major" },
        { name: "doubleMajor" },
        { name: "minor" },
        { name: "grade" },
        { name: "semester" },
      ],
    },
  },
  {
    id: 3,
    title: "기타 질문 사항에 답변해주세요.",
    type: "shortSplit",
    value: [
      { title: "향후 계획 활동", name: "activity" },
      { title: "지원 경로* (중복 선택 가능)", name: "channel" },
    ],
  },
];

// TODO: ScoreKeyword, ScoreKeywordName, ScoreKeywordType type 최적화
export type ScoreKeyword = "실천력" | "동아리애착" | "협업" | "기타";
type ScoreKeywordName =
  | "passion"
  | "clubFocus"
  | "collaboration"
  | "earnestness";

type ScoreKeywordType = {
  title: ScoreKeyword;
  name: ScoreKeywordName;
};

const INTERVIEW_SCORE_KEYWOARD: ScoreKeywordType[] = [
  { title: "실천력", name: "passion" },
  { title: "협업", name: "collaboration" },
  { title: "동아리애착", name: "clubFocus" },
  { title: "기타", name: "earnestness" },
];

export { INTERVIEW_SCORE_KEYWOARD, APPLICANT };
