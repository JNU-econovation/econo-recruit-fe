interface ErrorConfig {
  message: string;
}

const errorConfig: Record<string, ErrorConfig> = {
  // score & label
  LABEL_400_1: {
    message: "유효하지 않은 평가 항목입니다.",
  },
  LABEL_404_1: {
    message: "해당 라벨을 찾을 수 없습니다.",
  },

  // record
  RECORD_400_1: {
    message: "면접 기록은 중복해서 등록할 수 없습니다.",
  },
  RECORD_404_1: {
    message: "해당 면접 기록을 찾을 수 없습니다.",
  },

  // interviewer
  INTERVIEWER_400_1: {
    message: "하나의 역할만 선택할 수 있습니다.",
  },
  INTERVIEWER_400_2: {
    message: "로그인 되지 않은 사용자입니다.",
  },
  INTERVIEWER_400_3: {
    message: "IDP가 정상적으로 작동하지 않았습니다.",
  },
  INTERVIEWER_404_1: {
    message: "해당 면접관을 찾을 수 없습니다.",
  },

  // comment
  COMMENT_400_1: {
    message: "댓글을 중복해서 등록할 수 없습니다.",
  },
  COMMENT_404_1: {
    message: "해당 댓글을 찾을 수 없습니다.",
  },

  // kanban
  CARD_400_1: {
    message: "칸반 카드를 중복해서 등록할 수 없습니다.",
  },
  CARD_404_1: {
    message: "해당 칸반 카드를 찾을 수 없습니다.",
  },

  // applicant
  APPLICANT_400_1: {
    message: "이미 지원한 지원자입니다.",
  },
  APPLICANT_404_1: {
    message: "해당 지원자의 정보를 찾을 수 없습니다.",
  },
};

export default errorConfig;
