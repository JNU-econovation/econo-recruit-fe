import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { https } from "../../functions/axios";
import { ApplicantPassState } from "../kanban";

export interface Answer {
  field: "개발자" | "디자이너" | "기획자";
  field1: "APP" | "WEB" | "AI" | "GAME";
  field2: "APP" | "WEB" | "AI" | "GAME";
  name: string;
  id: string;
  year: number;
  state: {
    passState: ApplicantPassState;
  };
}

interface AllApplicantReq {
  answers: Answer[];
}

// 인공지능으로 만든 목데이터. 실제 지원자가 아닙니다.
const _mock: AllApplicantReq = {
  answers: [
    {
      field: "개발자",
      field1: "AI",
      field2: "WEB",
      name: "윤서연",
      id: "dev007",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "디자이너",
      field1: "GAME",
      field2: "AI",
      name: "최예린",
      id: "des002",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "WEB",
      field2: "AI",
      name: "송지훈",
      id: "dev021",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "WEB",
      field2: "APP",
      name: "김민준",
      id: "dev001",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "GAME",
      field2: "APP",
      name: "김시우",
      id: "dev024",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "AI",
      field2: "GAME",
      name: "이서준",
      id: "dev002",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "WEB",
      field2: "AI",
      name: "이유나",
      id: "dev025",
      year: 28,
      state: { passState: "final-passed" },
    },
    {
      field: "개발자",
      field1: "APP",
      field2: "GAME",
      name: "정다은",
      id: "dev016",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "WEB",
      field2: "AI",
      name: "강민석",
      id: "dev017",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "AI",
      field2: "WEB",
      name: "장민준",
      id: "dev023",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "APP",
      field2: "WEB",
      name: "박지훈",
      id: "dev003",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "GAME",
      field2: "APP",
      name: "임지안",
      id: "dev008",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "AI",
      field2: "GAME",
      name: "장현우",
      id: "dev011",
      year: 28,
      state: { passState: "first-passed" },
    },
    {
      field: "개발자",
      field1: "GAME",
      field2: "APP",
      name: "김태윤",
      id: "dev012",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "개발자",
      field1: "WEB",
      field2: "AI",
      name: "이하은",
      id: "dev013",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "디자이너",
      field1: "WEB",
      field2: "APP",
      name: "박성민",
      id: "des001",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "개발자",
      field1: "APP",
      field2: "GAME",
      name: "박준호",
      id: "dev014",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "개발자",
      field1: "AI",
      field2: "WEB",
      name: "최지은",
      id: "dev015",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "개발자",
      field1: "GAME",
      field2: "APP",
      name: "한서영",
      id: "dev020",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "디자이너",
      field1: "APP",
      field2: "WEB",
      name: "정현우",
      id: "des003",
      year: 28,
      state: { passState: "non-passed" },
    },
    {
      field: "기획자",
      field1: "AI",
      field2: "GAME",
      name: "강지아",
      id: "plan001",
      year: 28,
      state: { passState: "non-processed" },
    },
  ],
};

const getAllApplicantsPath = (generation: string) =>
  `year/${generation}/applicants/pass-states?order=newest`;

const getApplicantByIdWithField = ({
  applicantsId,
  afterState,
}: {
  applicantsId: string;
  afterState: "non-pass" | "pass";
}) => `/applicants/${applicantsId}/state?afterState=${afterState}`;

const getAllApplicantsWithPassState = async (generation: string) => {
  // TODO: 머지 하기 전 주석 해제 및 목데이터 삭제
  // const { data } = await https.get<AllApplicantReq>(
  //   getAllApplicantsPath(generation)
  // );

  const data = _mock;

  return data;
};

const postApplicantPassState = async ({
  afterState,
  applicantsId,
}: {
  applicantsId: string;
  afterState: "non-pass" | "pass";
}) => {
  await https.post(getApplicantByIdWithField({ applicantsId, afterState }));
};

interface useAllApplicantsWithPassStateParams {
  generation: string;
}
export const useAllApplicantsWithPassState = ({
  generation,
}: useAllApplicantsWithPassStateParams) => {
  return useQuery(
    [getAllApplicantsPath(generation)],
    () => getAllApplicantsWithPassState(generation),
    {
      enabled: !!generation,
    }
  );
};

interface usePostApplicantPassStateParams {
  applicantsId: string;
  afterState: "non-pass" | "pass";
}
export const usePostApplicantPassState = ({
  generation,
}: {
  generation: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: usePostApplicantPassStateParams) =>
      postApplicantPassState(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getAllApplicantsPath(generation)],
      });
    },
  });
};
