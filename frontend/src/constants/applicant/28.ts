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
    title: "기본 인적 사항을 입력해주세요.",
    type: "customHuman",
    value: {
      humanName: { name: "name" },
      humanEmail: { name: "email" },
      humanPhone: { name: "contacted" },
      humanEtc: [
        { name: "classOf" },
        { name: "major" },
        { name: "doubleMajor" },
        { name: "minor" },
        { name: "grade" },
        { name: "semester" },
        { name: "registered" },
      ],
    },
  },
  {
    id: 4,
    title: "기타 질문 사항에 답변해주세요.",
    type: "shortSplit",
    value: [
      { title: "향후 계획 활동", name: "activity" },
      { title: "지원 경로* (중복 선택 가능)", name: "channel" },
    ],
  },
];

export type ScoreKeyword =
  | "실천력"
  | "동아리 활동의지"
  | "협업"
  | "베풀려는 마음";

// type ScoreKeywordName =
//   | "passion"
//   | "clubInvolvement"
//   | "collaboration"
//   | "devotion";

export const ScoreSequence: {
  [key: number]: ScoreKeyword;
} = {
  0: "실천력",
  1: "동아리 활동의지",
  2: "협업",
  3: "베풀려는 마음",
};

export type Score = {
  fieldName: ScoreKeyword;
  score: number | "";
};

// type ScoreKeywordType = {
//   title: ScoreKeyword;
//   name: ScoreKeywordName;
// };

// const INTERVIEW_SCORE_KEYWORD: ScoreKeywordType[] = [
//   { title: "실천력", name: "passion" },
//   { title: "동아리 활동의지", name: "clubInvolvement" },
//   { title: "협업", name: "collaboration" },
//   { title: "베풀려는 마음", name: "devotion" },
// ];

const FIELD_NAME: ScoreKeyword[] = Object.values(ScoreSequence);

export { APPLICANT, FIELD_NAME };
