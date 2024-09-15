import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { https } from "../../functions/axios";
import { ApplicantPassState } from "../kanban";

interface PassInfo {
  currentPage: number;
  listCount: number;
  pageLimit: number;
  startPage: number;
  endPage: number;
  boardLimit: number;
}

interface Answer {
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
  pageInfo: PassInfo;
  answers: Answer[];
}

const _mock: AllApplicantReq = {
  pageInfo: {
    currentPage: 1,
    listCount: 1,
    pageLimit: 1,
    startPage: 1,
    endPage: 1,
    boardLimit: 1,
  },
  answers: [
    {
      field: "개발자",
      field1: "APP",
      field2: "APP",
      name: "김개발",
      id: "1",
      year: 28,
      state: {
        passState: "final-passed",
      },
    },
    {
      field: "개발자",
      field1: "APP",
      field2: "APP",
      name: "김개발",
      id: "1",
      year: 28,
      state: {
        passState: "non-passed",
      },
    },
  ],
};

const getAllApplicantsPath = (generation: string) =>
  `/page/1/year/${generation}/pass-states?order=state`;

const getApplicantByIdWithField = ({
  applicantsId,
  afterState,
}: {
  applicantsId: string;
  afterState: "non-pass" | "pass";
}) => `/applicants/${applicantsId}/state?afterState=${afterState}`;

const getAllApplicantsWithPassState = async (generation: string) => {
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
