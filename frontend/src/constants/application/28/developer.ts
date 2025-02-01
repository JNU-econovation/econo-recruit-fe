import type { ApplicationQuestion } from "../type";

export const APPLICATION_DEVELOPER: ApplicationQuestion[] = [
  {
    id: 5,
    title: "자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요.",
    direction: "horizontal",
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
    title: "개발자를 희망하는 이유는 무엇인가요?",
    subtitle: "계획하고 계신 진로와 이를 위해 노력한 내용을 말씀해 주세요.",
    direction: "horizontal",
    require: true,
    nodes: [
      {
        name: "future",
        require: true,
        type: "textarea",
        errorMessages: "개발자를 희망하는 이유를 입력해주세요.",
      },
    ],
  },
  {
    id: 7,
    title:
      "소프트웨어 프로젝트에서 주도적으로 개발한 경험이 있나요?(캡스톤 디자인 제외)",
    direction: "booleanTextarea",
    require: true,
    nodes: [
      {
        name: "experience",
        require: true,
        value: ["있다", "없다"],
        type: "booleanTextarea",
        subNodes: [
          {
            name: "experienceTextarea",
            title:
              "본인이 어떤 역할을 했고, 그 경험을 통해 무엇을 얻었는지 서술해 주세요.",
            require: true,
            type: "true",
          },
          {
            name: "experienceTextarea",
            title:
              "앞으로 해보고 싶은 프로젝트가 무엇인가요? 그 이유와 함께 서술해 주세요.",
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
      "어떤 일에 도전하고 실패해 본 경험이 있나요? 그 실패를 어떻게 극복했는지 서술해 주세요.",
    subtitle: "소프트웨어 관련 경험이 아니어도 좋습니다",
    direction: "horizontal",
    nodes: [
      {
        name: "restoration",
        require: true,
        type: "textarea",
        errorMessages: "도전하고 실패해 본 경험을 입력해주세요.",
      },
    ],
    require: true,
  },
  {
    id: 9,
    title:
      "무언가에 깊게 빠지거나 파고 들어본 적이 있나요? 좋아하는 것을 위해서 주변에서 인정할 정도로 깊게  빠져본 적이 있다면 서술해주세요.",
    subtitle: "소프트웨어 분야 관련 경험이 아니어도 좋습니다.",
    direction: "horizontal",
    require: true,
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
      "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 그 이유와 함께 지원자님의 생각을 서술해 주세요.",
    direction: "horizontal",
    require: true,
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
    title:
      "에코노베이션에 최종 합격 시 신입 기수로 구성된 팀으로 개발 프로젝트에 참여하고, 목표를 달성하기 위해 스스로 끊임없이 배우고 노력합니다. 에코노베이션에 들어오게 된다면 어떤 목표와 학습 계획을 바탕으로 활동하고 싶나요?",
    direction: "horizontal",
    require: true,
    nodes: [
      {
        name: "studyPlan",
        require: true,
        type: "textarea",
        errorMessages: "목표와 학습 계획을 입력해주세요.",
      },
    ],
  },
  {
    id: 12,
    title: "자신을 어필할 수 있는 포트폴리오를 업로드해 주세요.",
    subtitle:
      "지원자 분의 포트폴리오 링크 접근 권한을 열어주세요. 만약 접근 권한이 없을 경우 불이익이 있을 수 있습니다.",
    alert: "최종 제출 후 포트폴리오 수정은 불가합니다.",
    direction: "horizontal",
    nodes: [
      {
        type: "addText",
        name: "portfolio",
        require: false,
        title: "참고 URL",
        category: ["Github", "Blog", "Notion", "Website", "기타"],
        alert: "(입력창 하나당 하나의 URL을 입력해주세요.)",
      },
    ],
  },
  {
    id: -1,
    title: "개인정보 수집에 관한 안내 및 개인정보 수집",
    direction: "vertical",
    nodes: [
      {
        id: 13,
        direction: "horizontal",
        title: "합격여부 전달을 위하여 이메일을 입력해주세요.",
        subtitle: "이메일을 기재하지 않을 시, 합격이 취소될 수 있습니다.",
        require: true,
        nodes: [
          {
            type: "text",
            name: "email",
            title: "E-mail",
            validate: "emailString",
            errorMessages: "이메일을 입력해주세요.",
            require: true,
          },
        ],
      },
      {
        id: 14,
        direction: "horizontal",
        title:
          "에코노베이션은 3학기 이상의 활동과 매주 금요일 17시 주간발표에 필수로 참여해야 합니다.\n위 내용을 확인하셨으면 '확인했습니다'를 기입해주세요.",
        require: true,
        nodes: [
          {
            type: "text",
            name: "check",
            validate: "confirmationString",
            errorMessages: '"확인했습니다"를 입력해주세요.',
            require: true,
          },
        ],
      },
      {
        id: 15,
        direction: "radioForCheck",
        title:
          "개인정보 수집에 관한 안내 및 개인정보 수집에 대한 안내에 동의하시나요?",
        require: true,
        nodes: [
          {
            type: "radioForCheck",
            name: "personalInformationAgree",
            title: "개인정보 수집(공통)에 대한 안내",
            value: ["동의합니다.", "동의하지 않습니다."],
            require: true,
          },
          {
            type: "radioForCheck",
            name: "personalInformationAgreeForPortfolio",
            title: "개인정보 수집(포트폴리오)에 대한 안내",
            value: ["동의합니다.", "동의하지 않습니다."],
            require: true,
          },
        ],
      },
    ],
  },
  {
    id: 16,
    title: "면접 가능시간을 선택해주세요.(중복 선택 가능)",
    subtitle:
      "면접은 오프라인으로 진행되며 지원서에 작성된 내용을 토대로 약 10분간 진행될 예정입니다.\n선택한 시간이 적을 경우, 지원자님의 면접이 임의 시간에 배정될 수 있습니다.\n면접이 가능한 시간대를 모두 선택해 주시기 바랍니다.",
    direction: "timeline",
    require: true,
    alert: "최종 제출 후 시간 변경은 불가합니다.",
    nodes: [
      {
        type: "timeline",
        name: "timeline",
        require: true,
      },
    ],
  },
];

export const APPLICATION_NAVBAR_DEVELOPER = [
  {
    id: 5,
    title: "자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요.",
  },
  {
    id: 6,
    title: "개발자를 희망하는 이유는 무엇인가요?",
  },
  {
    id: 7,
    title: "소프트웨어 프로젝트에서 주도적으로 개발한 경험이 있나요?",
  },
  {
    id: 8,
    title: "어떤 일에 도전하고 실패해 본 경험이 있나요?",
  },
  { id: 9, title: "무언가에 깊게 빠지거나 파고 들어본 적이 있나요?" },
  {
    id: 10,
    title:
      "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 서술해 주세요.",
  },
  {
    id: 11,
    title:
      "에코노베이션에 들어오게 된다면 어떤 목표와 학습 계획을 바탕으로 활동하고 싶나요?",
  },
  { id: 12, title: "자신을 어필할 수 있는 포트폴리오를 업로드해주세요." },
  { id: 13, title: "개인정보 수집에 관한 안내 및 개인정보 수집" },
  { id: 14, title: "면접 가능시간을 선택해주세요.(중복 선택 가능)" },
];
