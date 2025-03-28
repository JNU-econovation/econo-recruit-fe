export const APPLICANT_MANAGER = [
  {
    id: 5,
    title: "자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요.",
    type: "textarea",
    value: { name: "reason" },
  } as ApplicantTextareaNode,
  {
    id: 6,
    title: "기획자를 희망하는 이유는 무엇인가요?",
    type: "textarea",
    value: { name: "future" },
  } as ApplicantTextareaNode,
  {
    id: 7,
    title:
      "PM(기획자)은 아이디어를 낼 뿐만 아니라, 자신의 아이디어를 동료들이 이해할 수 있는 형식으로 효과적으로 전달해야 하는 역할입니다. \n지원자님께서 자신의 아이디어를 시각적으로 구현하여, 구체적으로 전달한 경험이 있다면 서술해 주세요.",
    type: "textarea",
    value: { name: "communication" },
  } as ApplicantTextareaNode,
  {
    id: 8,
    title:
      "지원자님께서 직접 IT 서비스(UI/UX)를 설계하거나 개선한 경험이 있나요?(캡스톤 디자인 제외)",
    type: "booleanTextarea",
    booleanValue: { name: "experience" },
    subtitle: [
      "본인이 어떠한 부분을 설계 및 개선했고, 그 경험을 통해 무엇을 얻었는지 서술해 주세요.",
      "우리 주변의 IT서비스 중에 개선하고 싶은 서비스가 있다면, 어떤 점을 '왜' 그리고 '어떻게' 개선하고 싶은지 서술해 주세요.",
    ],
    value: { name: "experienceTextarea" },
  } as ApplicantBooleanTextareaNode,
  {
    id: 9,
    title:
      "무언가에 깊게 빠지거나 파고 들어본 적이 있나요? 좋아하는 것을 위해서 주변에서 인정할 정도로 깊게 빠져본 적이 있다면 서술해 주세요.",
    type: "textarea",
    value: { name: "failual" },
  } as ApplicantTextareaNode,
  {
    id: 10,
    title:
      "어떤 일에 도전하고 실패해 본 경험이 있나요? 그 실패를 어떻게 극복했는지 서술해 주세요.",
    type: "textarea",
    value: { name: "deep" },
  } as ApplicantTextareaNode,
  {
    id: 11,
    title:
      "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 그 이유와 함께 지원자님의 생각을 서술해 주세요.",
    type: "textarea",
    value: { name: "collaboration" },
  } as ApplicantTextareaNode,
  {
    id: 12,
    title: "에코노베이션에서의 활동 목표와 학습 계획을 이야기해주세요.",
    type: "textarea",
    value: { name: "studyPlan" },
  } as ApplicantTextareaNode,
  {
    id: 14,
    title:
      "에코노베이션은 3학기 이상의 활동과 매주 금요일 17시 주간발표 참여가 필수이며, 최종 합격 시 신입 기수로 구성된 팀으로 한 학기 동안 활동하게 됩니다. \n또한, 에코노베이션에서 운영되고 있는 다양한 부서 활동과 네트워킹 행사에 적극적인 참여를 권장합니다.",
    type: "textarea",
    value: { name: "check" },
  } as ApplicantTextareaNode,
  {
    id: 17,
    title: "면접 가능시간을 선택해주세요. (중복 선택 가능)",
    type: "timeline",
  } as ApplicantTimelineNode,
];
