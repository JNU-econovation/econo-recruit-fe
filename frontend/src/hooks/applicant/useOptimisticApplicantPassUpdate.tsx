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
    onSuccess: ({ passState }, params) => {
      queryClient.setQueryData<ApplicantPartialRes[]>(
        ["allApplicantsWithPassState", generation],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((applicant) =>
            applicant.id === params.applicantId
              ? {
                  ...applicant,
                  state: {
                    ...applicant.state,
                    passState,
                  },
                }
              : applicant
          );
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["allApplicantsWithPassState", generation],
      });
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray"],
      });
    },
  });
};
