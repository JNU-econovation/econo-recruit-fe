export const CURRENT_GENERATION = 26;

export const MAIN_MENU = [
  {
    title: `${CURRENT_GENERATION} PAGE`,
    subtitle: "신입모집 신청 페이지",
    href: `/application`,
  },
  {
    title: "KANBAN BOARD",
    subtitle: "신입모집 칸반보드",
    href: `/kanban/${CURRENT_GENERATION}`,
  },
  {
    title: "INTERVIEW",
    subtitle: "신입모집 면접 기록",
    href: `/interview/${CURRENT_GENERATION}`,
  },
  {
    title: "APPLICANT VIEW",
    subtitle: "신입모집 지원현황",
    href: `/applicant/${CURRENT_GENERATION}`,
  },
  {
    title: "SHARE POINT",
    subtitle: "신입모집 쉐어포인트",
    href: "https://ejnu.sharepoint.com/sites/msteams_bbf640/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Fmsteams_bbf640%2FShared%20Documents%2F2023%EB%85%84%2F1%ED%95%99%EA%B8%B0%2F%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91&p=true&ga=1",
  },
  {
    title: "HISTORY",
    subtitle: "지난 신입모집",
    href: "https://trello.com/b/ioPTFCHN/2023-econovation-1%ED%95%99%EA%B8%B0-%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91-tf%ED%8C%80",
  },
] as const;

export const MainNavbar = [
  {
    title: "신입모집 신청 페이지",
    short_title: "신청",
    type: "apply",
    target: "_blank",
    href: `/application`,
  },
  {
    title: "신입모집 칸반보드",
    short_title: "칸반보드",
    type: "kanban",
    target: "none",
    href: `/kanban/${CURRENT_GENERATION}`,
  },
  {
    title: "신입모집 면접 기록",
    short_title: "면접기록",
    type: "interview",
    target: "none",
    href: `/interview/${CURRENT_GENERATION}`,
  },
  {
    title: "신입모집 지원현황",
    short_title: "지원현황",
    type: "applicant",
    target: "none",
    href: `/applicant`,
  },
  {
    title: "신입모집 쉐어 포인트",
    short_title: "쉐어포인트",
    type: "sharepoint",
    target: "_blank",
    href: "https://ejnu.sharepoint.com/sites/msteams_bbf640/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Fmsteams_bbf640%2FShared%20Documents%2F2023%EB%85%84%2F1%ED%95%99%EA%B8%B0%2F%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91&p=true&ga=1",
  },
  {
    title: "지난 신입모집",
    short_title: "지난 모집",
    type: "history",
    target: "_blank",
    href: "https://trello.com/b/ioPTFCHN/2023-econovation-1%ED%95%99%EA%B8%B0-%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91-tf%ED%8C%80",
  },
] as const;

export const APPLICANT_KEYS = [
  "field",
  "field1",
  "field2",
  "name",
  "contacted",
  "classOf",
  "registered",
  "grade",
  "semester",
  "major",
  "doubleMajor",
  "minor",
  "activity",
  "channel",
  "reason",
  "future",
  "workDescript",
  "keyword",
  "betterment",
  "failure",
  "drain",
  "collaboration",
  "studyPlan",
  "portfolio",
  "fileUrl",
  "email",
  "check",
  "personalInformationAgree",
  "personalInformationAgreeForPortfolio",
  "timeline",
  "experienceTextarea",
  "experience",
  "restoration",
  "deep",
  "communication",
  "failual",
  "fileUrlforPlanner",
  "generation",
  "uploadDate",
];

export const ORDER_MENU = {
  ADMIN: [
    { type: "newest", string: "최신순" },
    { type: "name", string: "이름순" },
  ],
  APPLICANT: [
    { type: "newest", string: "최신순" },
    { type: "name", string: "이름순" },
  ],
  INTERVIEW: [
    { type: "newest", string: "최신순" },
    { type: "name", string: "이름순" },
    { type: "objective", string: "지원분야순" },
    { type: "score", string: "점수순" },
  ],
} as const;
