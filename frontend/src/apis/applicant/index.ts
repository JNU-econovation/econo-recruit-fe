import { getAllInterviewerWithOrder } from "@/src/apis/interview";
import { APPLICANT_KEYS } from "@/src/constants";
import { https } from "@/src/functions/axios";
import { ApplicantPassState } from "../kanban";

export interface ApplicantReq {
  name: string;
  answer: string;
}

interface AllApplicantReq {
  [string: string]: string;
}

export const getApplicantByIdWithField = async (
  id: string,
  fields?: string[]
) => {
  if (fields === undefined) {
    fields = APPLICANT_KEYS;
  }
  const { data } = await https.post<AllApplicantReq>(`/boards/${id}`, fields);

  return Object.keys(data).map((key) => ({
    name: key,
    answer: data[key],
  }));
};

export interface PageInfo {
  currentPage: number;
  listCount: number;
  pageLimit: number;
  startPage: number;
  endPage: number;
  boardLimit: number;
}

interface ApplicantByPageReqAnswer {
  field: string;
  field1: string;
  field2: string;
  name: string;
  contacted: string;
  classOf: string;
  registered: string;
  grade: string;
  semester: string;
  major: string;
  doubleMajor: string;
  minor: string;
  activity: string;
  reason: string;
  future: string;
  experience: string;
  experienceTextarea: string;
  restoration: string;
  deep: string;
  collaboration: string;
  studyPlan: string;
  portfolio: string;
  fileUrl: string;
  email: string;
  check: string;
  personalInformationAgree: string;
  personalInformationAgreeForPortfolio: string;
  generation: string;
  uploadDate: string;
  channel: string;
  timeline: number[];
  id: string;
  year: number;
  created_at: string;
  state: {
    passState: ApplicantPassState;
  };
}

interface ApplicantByPageReq {
  pageInfo: PageInfo;
  answers: ApplicantByPageReqAnswer[];
}

const _mockResponse = {
  pageInfo: {
    currentPage: 1,
    listCount: 4,
    pageLimit: 10,
    startPage: 1,
    endPage: 1,
    boardLimit: 10,
  },
  answers: [
    {
      field: "개발자",
      field1: "WEB",
      field2: "GAME",
      name: "심",
      contacted: "010-1111-1114",
      classOf: "235455",
      registered: "재학",
      grade: "4학년",
      semester: "2학기",
      major: "컴공",
      doubleMajor: "",
      minor: "",
      activity: "동아리",
      reason: "테스트",
      future: "테스트",
      experience: "있다",
      experienceTextarea: "테스트",
      restoration: "테스트",
      deep: "테스트",
      collaboration: "테스트",
      studyPlan: "테스트",
      portfolio: "",
      fileUrl: "",
      email: "s4@naver.com",
      check: "확인했습니다",
      personalInformationAgree: "동의합니다.",
      personalInformationAgreeForPortfolio: "동의합니다.",
      generation: "28",
      uploadDate: "172632533267",
      channel: "홍보 포스터 / 현수막,",
      timeline: "[10,11]",
      id: "97a6e20a66",
      year: 28,
      created_at: "2024-09-14T23:48:54.463120638",
      state: {
        passState: "final-passed",
      },
    },
    {
      field: "개발자",
      field1: "APP",
      field2: "WEB",
      name: "박건규",
      contacted: "010-1111-1111",
      classOf: "410563",
      registered: "재학",
      grade: "4학년",
      semester: "2학기",
      major: "박건규",
      doubleMajor: "박건규",
      minor: "박건규",
      activity: "박건규",
      reason: "박건규",
      future: "박건규",
      experience: "있다",
      experienceTextarea: "박건규",
      restoration: "박건규",
      deep: "박건규",
      collaboration: "박건규",
      studyPlan: "박건규",
      portfolio: "박건규",
      fileUrl: "박건규",
      email: "geongyu09@gmail.com",
      check: "확인했습니다",
      personalInformationAgree: "동의합니다.",
      personalInformationAgreeForPortfolio: "동의합니다.",
      generation: "28",
      uploadDate: "1726209556840",
      channel: "인스타그램,",
      timeline: "[14]",
      id: "f5262430-da7e-91bb-a8e2a9b3f82d",
      year: 28,
      created_at: "2024-09-13T15:39:19.351043993",
      state: {
        passState: "first-passed",
      },
    },
    {
      field: "디자이너",
      field1: "APP",
      field2: "WEB",
      name: "안녕하세요",
      contacted: "010-1111-1116",
      classOf: "200757",
      registered: "재학",
      grade: "3학년",
      semester: "2학기",
      major: "소공",
      doubleMajor: "",
      minor: "",
      activity: "없음",
      reason: "ㅇ",
      future: "ㅇ",
      workDescript: "ㅇ",
      keyword: "ㅇ",
      betterment: "ㅇ",
      failure: "ㅇ",
      drain: "ㅇ",
      collaboration: "ㅇ",
      studyPlan: "ㅇ",
      portfolio: "ㅇ",
      fileUrl: "ㅇ",
      email: "w3@naver.com",
      check: "확인했습니다",
      personalInformationAgree: "동의합니다.",
      personalInformationAgreeForPortfolio: "동의합니다.",
      generation: "28",
      uploadDate: "1725958028844",
      channel: "학과 공지사항,",
      timeline: "[7,37,67]",
      id: "f197bd25-de05-43da-a8e6-e14073b2c855",
      year: 28,
      created_at: "2024-09-10T17:47:09.313945305",
      state: {
        passState: "non-passed",
      },
    },
    {
      name: "28기 다섯 번째 지원자",
      activity: "아르바이트",
      channel: "진학 공지사항",
      check: "확인했습니다",
      classOf: "000005",
      collaboration: "카드만들어져?",
      contacted: "010-1116-1116",
      deep: "카드만들어져?",
      doubleMajor: "",
      email: "w03@naver.com",
      experience: "있다",
      experienceTextarea: "카드만들어져?",
      field: "기획자",
      field1: "WEB",
      field2: "APP",
      fileUrl: "",
      future: "테스트",
      generation: "28",
      grade: "4학년",
      major: "컴퓨터전문통신공학과",
      minor: "",
      personalInformationAgree: "동의합니다.",
      personalInformationAgreeForPortfolio: "동의합니다.",
      portfolio: "",
      reason: "테스트",
      registered: "재학",
      restoration: "테스트",
      semester: "1학기",
      studyPlan: "테스트",
      timeline: [4, 5, 40, 37, 38, 39, 68, 69],
      uploadDate: 1724919760659,
      id: "31e6db71-01cd-4c147748f",
      year: 28,
      created_at: "2024-09-09T20:00:54.424479493",
      state: {
        passState: "non-processed",
      },
    },
  ],
};

export const getApplicantByPageWithGeneration = async (
  page: number,
  generation: string,
  order: string
) => {
  // const {
  //   data: { pageInfo, answers },
  // } = await https.get<ApplicantByPageReq>(
  //   `/page/${page}/year/${+generation}/applicants?order=${order}`
  // );

  const { pageInfo, answers } = _mockResponse;

  return {
    maxPage: pageInfo.endPage,
    applicants: answers.map(
      (applicant) =>
        Object.keys(applicant).map((key) => {
          if (key === "state") {
            return {
              name: "passState",
              answer: applicant.state.passState,
            };
          }
          return {
            name: key,
            answer: applicant[key as keyof ApplicantByPageReqAnswer],
          };
        }) as ApplicantReq[]
    ),
  };
};

/** THIS API MAY UNUSED. PLEASE REMOVE THIS COMMENT IF YOU WANT USE */
export const getAllApplicant = async (
  fields?: string[]
): Promise<ApplicantReq[][]> => {
  if (fields === undefined) {
    fields = APPLICANT_KEYS;
  }
  const { data } = await https.post<AllApplicantReq[]>(`/boards`, fields);
  return data.map((d) =>
    Object.keys(d).map((key) => ({
      name: key,
      answer: d[key],
    }))
  );
};

export const getApplicationById = async (id: string) => {
  const { data } = await https.get<AllApplicantReq>(
    `/applicants?applicantId=${id}`
  );

  return Object.keys(data).map((key) => ({
    name: key,
    answer: data[key],
  }));
};

export interface ApplicantLabelReq {
  name: string;
  active: boolean;
}

export const getApplicantLabel = async (id: string) => {
  const allInterviewers = await getAllInterviewerWithOrder("name");

  try {
    const { data } = await https.get<string[]>(`/applicants/${id}/labels`);
    return allInterviewers
      .map((interviewer) => {
        const label = data.find((label) => label === interviewer.name);
        return {
          name: interviewer.name,
          active: !!label,
        };
      })
      .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
  } catch (e) {
    return allInterviewers.map((interviewer) => ({
      name: interviewer.name,
      active: false,
    }));
  }
};

export const postApplicantLabel = async (
  id: string
): Promise<ApplicantLabelReq[]> => {
  const { data } = await https.post<ApplicantLabelReq[]>(
    `/applicants/${id}/labels`
  );

  return data;
};

export const getApplicantTimeTables = async (id: string) => {
  const { data } = await https.get<number[]>(`/applicants/${id}/timetables`);

  return data;
};
