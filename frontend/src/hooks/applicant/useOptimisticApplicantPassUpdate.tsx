import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchApplicantPassState,
  PatchApplicantPassStateParams,
} from "@/src/apis/passState";
import { ApplicantPassState } from "@/src/apis/kanban";

export interface ApplicantPartialRes {
  field: "개발자" | "디자이너" | "기획자";
  field1: "APP" | "WEB" | "AI" | "GAME";
  field2: "APP" | "WEB" | "AI" | "GAME" | "선택 없음";
  name: string;
  id: string;
  year: number;
  state: {
    passState: ApplicantPassState;
  };
}

export const useOptimisticApplicantPassUpdate = (generation: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchApplicantPassStateParams) =>
      patchApplicantPassState(params),
    onMutate: async (params) => {
      await queryClient.cancelQueries({
        queryKey: ["allApplicantsWithPassState", generation],
      });

      const previousData = queryClient.getQueryData([
        "allApplicantsWithPassState",
        generation,
      ]);

      queryClient.setQueryData(
        ["allApplicantsWithPassState", generation],
        (oldData: ApplicantPartialRes[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((applicant: ApplicantPartialRes) =>
            applicant.id === params.applicantId
              ? { ...applicant, passState: params.afterState }
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
      queryClient.invalidateQueries({
        queryKey: ["allApplicantsWithPassState", generation],
      });
    },
  });
};
