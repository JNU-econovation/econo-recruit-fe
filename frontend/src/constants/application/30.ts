import type { ApplicationQuestion, ApplicationTimeline } from "./type";

export const APPLICATION: ApplicationQuestion[] = [
  {
    id: 1,
    title: "프로젝트 희망 분야를 선택해주세요.",
    subtitle: "2순위가 없다면 '없음'을 선택해주세요.",
    direction: "horizontal",
    require: true,
    nodes: [
      {
        type: "radio",
        name: "field",
        require: true,
        value: ["개발자", "디자이너", "기획자"],
      },
      {
        type: "radioByTwoRank",
        require: true,
        name: "",
        subNodes: [
          {
            splitNumber: 3,
            title: "1순위",
            name: "field1",
            require: true,
            value: ["APP", "WEB", "GAME", "AI"],
          },
          {
            splitNumber: 3,
            title: "2순위",
            name: "field2",
            require: true,
            value: ["APP", "WEB", "GAME", "AI", "선택없음"],
          },
        ],
      },
      {
        type: "text",
        name: "specificField",
        title: "구체적인 희망 분야",
        require: false,
        maxLength: 30,
        example: [
          "# 프론트엔드 개발을 시작한 UI/UX 디자이너",
          "# Computer Vision 위주의 프로젝트 개발",
          "# Android",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "기본 인적 사항을 입력해주세요.",
    direction: "horizontal",
    require: false,
    nodes: [
      {
        type: "text",
        name: "name",
        title: "이름",
        maxLength: 5,
        require: true,
        errorMessages: "이름을 입력해주세요.",
      },
      {
        type: "text",
        name: "contacted",
        title: "연락처",
        subtitle:
          "서류가 접수되면 접수 확인 문자가 발송될 예정이니, 연락처를 정확하게 기입해 주시기 바랍니다.",
        require: true,
        replace: "cellPhoneNumber",
        validate: "cellPhoneNumber",
        errorMessages: "연락처를 입력해주세요.",
        maxLength: 13,
      },
      {
        type: "text",
        name: "classOf",
        title: "학번",
        subtitle: "(ex. 123456)",
        require: true,
        replace: "undergradeNumber",
        validate: "undergradeNumber",
        maxLength: 6,
        errorMessages: "학번을 입력해주세요.",
      },
      {
        type: "text",
        name: "registered",
        title: "학적상태(재학 or 휴학)",
        subtitle: "'휴학'일 경우 복학 예정 시기를 기재해 주세요.",
        require: true,
        errorMessages: "학적상태를 입력해주세요.",
      },
      {
        type: "radioByTwoRank",
        title: "",
        name: "",
        require: true,
        subtitle: "'휴학'일 경우 휴학 직전 학기를 선택해 주세요.",
        subNodes: [
          {
            title: "학년",
            splitNumber: 4,
            name: "grade",
            require: true,
            value: ["1학년", "2학년", "3학년", "4학년"],
          },
          {
            title: "학기",
            splitNumber: 2,
            name: "semester",
            require: true,
            value: ["1학기", "2학기"],
          },
        ],
      },
    ],
  },
  {
    id: 3,

    title: "전공을 입력해주세요.",
    subtitle: "복수 전공과 부전공은 선택 입력사항입니다.",
    direction: "horizontal",
    require: false,
    nodes: [
      {
        type: "text",
        name: "major",
        title: "전공",
        require: true,
        errorMessages: "전공을 입력해주세요.",
      },
      {
        type: "text",
        name: "doubleMajor",
        title: "복수전공",
        require: false,
      },
      {
        type: "text",
        name: "minor",
        title: "부전공",
        require: false,
      },
    ],
  },
  {
    id: 4,
    title: "기타 질문 사항에 답변해주세요.",
    direction: "horizontal",
    require: true,
    nodes: [
      {
        name: "activity",
        require: true,
        type: "text",
        title:
          "학업 외에 병행하고 있거나 향후 계획 중에 있는 활동이 있으시다면 ‘꼭’ 서술해 주세요.",
        subtitle:
          "(동아리, 연구실, 아르바이트, 스터디, 교환학생 등), 없을 경우, 없음으로 기재해 주세요. 기재하지 않고 추후 적발시 최종 합불 논의에 불이익이 있을 수 있습니다.)",
      },
      {
        name: "channel",
        require: true,
        type: "checkboxWithEtc",
        title: "지원 경로(중복 선택 가능)",
        value: [
          "학과 공지사항",
          "홍보 포스터 / 현수막",
          "지인 소개",
          "인스타그램",
          "알림아리",
          "에브리타임",
        ],
        errorMessages: "지원 경로를 선택해주세요.",
      },
    ],
  },
];

export const APPLICATION_NAVBAR = [
  { id: 1, title: "프로젝트 희망 분야를 선택해주세요." },
  { id: 2, title: "기본 인적 사항을 입력해주세요." },
  { id: 3, title: "전공을 입력해주세요." },
  { id: 4, title: "기타 질문 사항에 답변해주세요." },
];

export const APPLICATION_TIMELINE: ApplicationTimeline = {
  seperate: 30,
  time: [
    {
      startTime: new Date(2025, 8, 15, 10, 0, 0),
      endTime: new Date(2025, 8, 15, 20, 30, 0),
    },
    {
      startTime: new Date(2025, 8, 16, 10, 0, 0),
      endTime: new Date(2025, 8, 16, 20, 30, 0),
    },
    {
      startTime: new Date(2025, 8, 17, 10, 0, 0),
      endTime: new Date(2025, 8, 17, 20, 30, 0),
    },
  ],
  disableTime: [],
};

/**
 * @description 개인정보 수집에 대한 1차 모집 시작일 상수 데이터
 * @property {number} year - 1차 모집 시작 연도
 * @property {number} month - 1차 모집 시작 달 (1-12)
 * @property {number} date - 1차 모집 시작 날짜 (1-31)
 * @property {number} hours - 1차 모집 시작 시간(시) (0-23)
 * @property {number} minutes - 1차 모집 시작 시간(분) (0-59)
 * @property {number} seconds - 1차 모집 시작 시간(초) (0-59)
 */
export const START_DATE = {
  year: 2025,
  month: 9,
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

/**
 * @description 개인정보 수집에 대한 1차 모집 마감일 상수 데이터
 * @property {number} year - 1차 모집 마감 연도
 * @property {number} month - 1차 모집 마감 달 (1-12)
 * @property {number} date - 1차 모집 마감 날짜 (1-31)
 * @property {number} hours - 1차 모집 마감 시간(시) (0-23)
 * @property {number} minutes - 1차 모집 마감 시간(분) (0-59)
 * @property {number} seconds - 1차 모집 마감 시간(초) (0-59)
 */
export const END_DATE = {
  year: 2025,
  month: 9,
  date: 10,
  hours: 23,
  minutes: 59,
  seconds: 59,
};

/**
 * @description 개인정보 수집에 대한 1차 합격자 공지 상수 데이터
 * @property {number} year - 1차 합격자 공지 연도
 * @property {number} month - 1차 합격자 공지 월 (1-12)
 * @property {number} date - 1차 합격자 공지 일 (1-31)
 */
export const FIRST_NOTIFICATION_DATE = {
  year: 2025,
  month: 9,
  date: 12,
};

/**
 * @description 개인정보 수집에 대한 최종 마감일 상수 데이터
 * @property {number} year - 최종 모집 마감 연도
 * @property {number} month - 최종 모집 마감 월 (1-12)
 * @property {number} date - 최종 모집 마감 일 (1-31)
 */
export const FINAL_DATE = {
  year: 2025,
  month: 9,
  date: 22,
};
