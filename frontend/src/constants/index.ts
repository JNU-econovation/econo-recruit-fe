export const CURRENT_GENERATION = 30;

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

export interface NavbarItem {
  title: string;
  short_title: string;
  type:
    | "apply"
    | "kanban"
    | "interview"
    | "applicant"
    | "sharepoint"
    | "admin"
    | "toggle"
    | "pass-state";
  target?: "_blank" | "_self" | "_parent" | "_top";
  href: string;
}

export const MainNavbar = (generation: number): NavbarItem[] => [
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
    href: `/kanban/${generation}`,
  },
  {
    title: "신입모집 면접 기록",
    short_title: "면접기록",
    type: "interview",
    href: `/interview/${generation}`,
  },
  {
    title: "신입모집 지원현황",
    short_title: "지원현황",
    type: "applicant",
    href: `/applicant/${generation}`,
  },
  // {
  //   title: "신입모집 쉐어 포인트",
  //   short_title: "쉐어포인트",
  //   type: "sharepoint",
  //   target: "_blank",
  //   href: "https://ejnu.sharepoint.com/sites/msteams_bbf640/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Fmsteams_bbf640%2FShared%20Documents%2F2023%EB%85%84%2F1%ED%95%99%EA%B8%B0%2F%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91&p=true&ga=1",
  // },
];

export const APPLICANT_KEYS = [
  "field",
  "field1",
  "field2",
  "specificField",
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

export const managementTeam = {
  position: ["Design", "Front-end", "Back-end"],
  member: [
    {
      position: "Design",
      generation: 22,
      name: "김서하",
    },
    {
      position: "Front-end",
      generation: 22,
      name: "임채승",
    },
    {
      position: "Front-end",
      generation: 25,
      name: "강바다",
    },
    {
      position: "Back-end",
      generation: 21,
      name: "이서현",
    },
  ],
};

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

export const needValidatePath = [
  "/admin",
  "/applicant",
  "/interview",
  "/kanban",
];

export const MAX_TEXT_LENGTH = 1000;

export const CHARACTERS = {
  DOUBLE_QUOTE: '"',
  SLASH: "/",
  SPACE: " ",
};

export const PRODUCTION_HOSTNAME = "recruit.econovation.kr";
