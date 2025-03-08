import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchApplicantPassState,
  PatchApplicantPassStateParams,
} from "@/src/apis/passState";
import { ApplicantPassState } from "@/src/apis/kanban";

export interface IAnswer {
  field: "개발자" | "디자이너" | "기획자";
  field1: "APP" | "WEB" | "AI" | "GAME";
  field2: "APP" | "WEB" | "AI" | "GAME" | "선택 없음";
  name: string;
  id: string;
  year: number;
  state: {
    passState: ApplicantPassState;
    passStateToEnum: string;
  };
}

export const useOptimisticApplicantPassUpdate = (
  generation: string,
  postId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchApplicantPassStateParams) =>
      patchApplicantPassState(params),
    onMutate: async (variables) => {
      await queryClient.cancelQueries([
        "allApplicantsWithPassState",
        generation,
      ]);

      const previousData = queryClient.getQueryData([
        "allApplicantsWithPassState",
        generation,
      ]);

      queryClient.setQueryData(
        ["allApplicantsWithPassState", generation],
        (oldData: IAnswer[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((applicant: IAnswer) =>
            applicant.id === postId
              ? { ...applicant, passState: variables.afterState }
              : applicant
          );
        }
      );
      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["allApplicantsWithPassState", generation],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allApplicantsWithPassState", generation]);
    },
  });
};
