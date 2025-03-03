import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchApplicantPassState,
  PatchApplicantPassStateParams,
} from "@/src/apis/passState";

export const useOptimisticApplicantPassUpdate = (
  generation: string,
  postId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchApplicantPassStateParams) =>
      patchApplicantPassState(params),
    onMutate: async (newData) => {
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
        (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((applicant: any) =>
            applicant.id === postId
              ? { ...applicant, passState: newData.afterState }
              : applicant
          );
        }
      );
      return { previousData };
    },
    onError: (err, newData, context: any) => {
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
