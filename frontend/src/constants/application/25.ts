import { ApplicationQuestion } from "./type";

export const APPLICATION: ApplicationQuestion[] = [
  {
    id: 1,
    title: "프로젝트 희망 분야를 선택해주세요.",
    subtitle: "1순위, 2순위 해당 분야를 모두 선택해주세요.",
    direction: "vertical",
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
            subtitle: "1순위",
            name: "field1",
            require: true,
            value: ["APP", "WEB", "GAME", "AI", "IoT", "AR/VR"],
            splitNumber: 3,
          },
          {
            subtitle: "2순위",
            name: "field2",
            require: true,
            value: ["APP", "WEB", "GAME", "AI", "IoT", "AR/VR", "선택없음"],
            splitNumber: 3,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "기본 인적 사항을 입력해주세요.",
    direction: "vertical",
    require: false,
    nodes: [
      {
        type: "text",
        name: "name",
        title: "이름",
        require: true,
        errorMessages: "이름을 입력해주세요.",
      },
      {
        type: "text",
        name: "contacted",
        title: "연락처",
        require: true,
        errorMessages: "연락처를 입력해주세요.",
      },
      {
        type: "text",
        name: "classOf",
        title: "학번",
        subtitle: "ex) 123456",
        require: true,
        errorMessages: "학번을 입력해주세요.",
      },
      {
        type: "radioByTwoRank",
        title: "학년 및 학기",
        require: true,
        name: "",
        subNodes: [
          {
            name: "grade",
            require: true,
            value: ["1", "2", "3", "4"],
            splitNumber: 4,
          },
          {
            name: "semester",
            require: true,
            value: ["1", "2"],
            splitNumber: 2,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "기본 인적 사항을 입력해주세요.",
    subtitle: "복수 전공과 부전공은 선택 입력사항입니다.",
    direction: "vertical",
    require: false,
    nodes: [
      {
        type: "text",
        name: "major",
        title: "전공",
        maxLength: 30,
        require: true,
        errorMessages: "전공을 입력해주세요.",
      },
      {
        type: "text",
        name: "doubleMajor",
        title: "복수전공",
        maxLength: 30,
        require: false,
      },
      {
        type: "text",
        name: "minor",
        title: "부전공",
        maxLength: 30,
        require: false,
      },
    ],
  },
  {
    id: 4,
    title: "기타 질문 사항에 답변해주세요.",
    direction: "vertical",
    require: false,
    nodes: [
      {
        name: "activity",
        require: true,
        type: "text",
        title:
          "학업 외에 병행하고 있거나 향후 계획 중에 있는 활동이 있으시다면 적어주세요.",
        maxLength: 200,
        subtitle: "(동아리, 연구실, 아르바이트, 스터디, 교환학생 등)",
      },
      {
        name: "channel",
        require: true,
        type: "checkboxWithEtc",
        title: "지원 경로(중복 선택 가능)",
        value: [
          "학과 공지사항",
          "홍보 포스터",
          "지인 소개",
          "인스타그램",
          "페이스북",
          "에브리타임",
        ],
        errorMessages: "지원 경로를 선택해주세요.",
      },
    ],
  },
  {
    id: 5,
    title: "에코노베이션에 지원하게 된 계기는 무엇인가요?",
    direction: "vertical",
    require: true,
    nodes: [
      {
        name: "reason",
        require: true,
        type: "textarea",
        errorMessages: "에코노베이션에 지원하게 된 계기를 입력해주세요.",
      },
    ],
  },
  {
    id: 6,
    title:
      " IT 분야에서 앞으로 도전해 보고 싶은 기획이나 기술 혹은 분야가 있다면 그 이유와 함께 서술해 주세요.",
    direction: "vertical",
    require: true,
    nodes: [
      {
        name: "future",
        require: true,
        type: "textarea",
        errorMessages: "앞으로 도전해 보고 싶은 분야를 입력해주세요.",
      },
    ],
  },
  {
    id: 7,
    title:
      "소프트웨어 프로젝트 관련 개발/기획/디자인 경험이나 주도적으로 교육에 참여한 경험이 있나요?",
    direction: "vertical",
    require: true,
    nodes: [
      {
        name: "experience",
        require: true,
        type: "booleanTextarea",
        value: ["있다", "없다"],
        subNodes: [
          {
            name: "experienceTrue",
            title:
              "본인이 어떤 역할을 했고, 경험을 통해 무엇을 얻었는지 적어주세요.",
            subtitle:
              "팀 프로젝트가 아닌 개인 프로젝트 및 경험일 경우, 역할에 관한 서술은 안 하셔도 됩니다.",
            require: true,
            type: "true",
          },
          {
            name: "experienceFalse",
            title:
              "본인이 어떤 역할을 했고, 경험을 통해 무엇을 얻었는지 적어주세요.",
            subtitle:
              "팀 프로젝트가 아닌 개인 프로젝트 및 경험일 경우, 역할에 관한 서술은 안 하셔도 됩니다.",
            require: true,
            type: "false",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title:
      "ECONOVATION에 최종 합격시 신입기수로 구성된 팀으로 개발 프로젝트에 참여하고, 목표를 달성하기 위해 스스로 끊임 없이 배우고 노력합니다. ECONOVATION에 들어오게 된다면 어떤 목표와 학습 계획을 바탕으로 활동하고 싶나요?",
    direction: "vertical",
    nodes: [
      {
        name: "goal",
        require: true,
        type: "textarea",
        errorMessages: "목표와 학습 계획을 입력해주세요.",
      },
    ],
    require: true,
  },
  {
    id: 9,
    title:
      "무언가에 깊게 빠지거나 파고 들어본 적이 있나요? 좋아하는 것을 위해서 주변에서 인정할 정도로 깊게  빠져본 적이 있다면 서술해주세요.",
    subtitle: "소프트웨어 분야 관련 경험이 아니어도 좋습니다.",
    direction: "vertical",
    nodes: [
      {
        name: "deep",
        require: true,
        type: "textarea",
        errorMessages: "깊게 빠져본 경험을 입력해주세요.",
      },
    ],
  },
  {
    id: 10,
    title:
      "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 그 이유와 함께 서술해주세요.",
    direction: "vertical",
    nodes: [
      {
        name: "collaboration",
        require: true,
        type: "textarea",
        errorMessages: "협업에 있어서 중요하다고 생각되는 것을 입력해주세요.",
      },
    ],
  },
  {
    id: 11,
    title: "자신을 어필할 수 있는 포트폴리오를 업로드해주세요.",
    direction: "vertical",
    nodes: [
      {
        name: "portfolio",
        require: false,
        type: "text",
        title: "참고 URL",
        subtitle: "(Github, Blog, Notion, Website 등)",
      },
      {
        name: "fileUrl",
        require: false,
        type: "text",
        title: "파일 URL",
        subtitle: "(Google Drive 등)",
      },
      {
        type: "bar",
      },
      {
        type: "justText",
        title:
          "기획자를 지원하는 경우 이번 학기에 진행하고 싶은 프로젝트의 기획서를 제출해 주세요.",
        subtitle:
          "(단, 제출한 기획을 기반으로 이번 학기에 프로젝트를 진행하지 못할 수 있습니다.)",
      },
      {
        name: "fileUrlforPlanner",
        require: false,
        type: "text",
        title: "파일 URL",
        subtitle: "(Google Drive 등)",
      },
    ],
  },
];
