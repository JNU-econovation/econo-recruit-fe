export const APPLICANT_DEVELOPER = [
  {
    id: 5,
    title: "자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요.",
    type: "textarea",
    value: { name: "reason" },
  } as ApplicantTextareaNode,
  {
    id: 6,
    title:
      "개발자를 희망하는 이유는 무엇인가요? 계획하고 계신 진로와 이를 위해 노력한 내용을 말씀해 주세요.",
    type: "textarea",
    value: { name: "future" },
  } as ApplicantTextareaNode,
  {
    id: 7,
    title:
      "소프트웨어 프로젝트에서 주도적으로 개발한 경험이 있나요?(캡스톤 디자인 제외)",
    type: "booleanTextarea",
    booleanValue: { name: "experience" },
    subtitle: [
      "본인이 어떤 역할을 했고, 그 경험을 통해 무엇을 얻었는지 서술해 주세요.",
      "앞으로 해보고 싶은 프로젝트가 무엇인가요? 그 이유와 함께 서술해 주세요.",
    ],
    value: { name: "experienceTextarea" },
  } as ApplicantBooleanTextareaNode,
  {
    id: 8,
    title:
      "어떤 일에 도전하고 실패해 본 경험이 있나요? 그 실패를 어떻게 극복했는지 서술해 주세요.",
    type: "textarea",
    value: { name: "restoration" },
  } as ApplicantTextareaNode,
  {
    id: 9,
    title:
      "무언가에 깊게 빠지거나 파고 들어본 적이 있나요? 좋아하는 것을 위해서 주변에서 인정할 정도로 깊게  빠져본 적이 있다면 서술해주세요.",
    type: "textarea",
    value: { name: "deep" },
  } as ApplicantTextareaNode,
  {
    id: 10,
    title:
      "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 그 이유와 함께 지원자님의 생각을 서술해 주세요.",
    type: "textarea",
    value: { name: "collaboration" },
  } as ApplicantTextareaNode,
  {
    id: 11,
    title:
      "에코노베이션에 최종 합격 시 신입 기수로 구성된 팀으로 개발 프로젝트에 참여하고, 목표를 달성하기 위해 스스로 끊임없이 배우고 노력합니다. 에코노베이션에 들어오게 된다면 어떤 목표와 학습 계획을 바탕으로 활동하고 싶나요?",
    type: "textarea",
    value: { name: "studyPlan" },
  } as ApplicantTextareaNode,
  {
    id: 12,
    title:
      "에코노베이션은 3학기 이상의 활동을 권장하고 있으며 매주 금요일 17시에는 주간발표가 있습니다. 위 내용을 확인하셨으면 '확인했습니다'를 기입해주세요.",
    type: "textarea",
    value: { name: "check" },
  } as ApplicantTextareaNode,
  {
    id: 13,
    title: "면접 가능시간을 선택해주세요. (중복 선택 가능)",
    type: "timeline",
  } as ApplicantTimelineNode,
];
