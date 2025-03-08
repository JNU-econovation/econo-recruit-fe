"use client";

import { ApplicantReq } from "@/src/apis/applicant";
import CustomResource from "./_applicantNode/CustomResource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  patchApplicantPassState,
  PatchApplicantPassStateParams,
} from "@/src/apis/passState";
import { applicantDataFinder } from "@/src/functions/finder";
import { getMyInfo } from "@/src/apis/interview";
import ApplicantLabel from "../applicantNode/Label.component";
import ApplicantComment from "../applicantNode/comment/Comment.component";
import { useApplicantById } from "@/src/hooks/applicant/useApplicantById";
import { useSearchParams } from "next/navigation";

interface DetailLeftProps {
  data: ApplicantReq[];
  generation: string;
  cardId: number;
}
const ApplicantDetailLeft = ({ data, cardId, generation }: DetailLeftProps) => {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("applicantId");

  const queryClient = useQueryClient();
  const { mutate: updateApplicantPassState } = useMutation({
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
    onError: (err, newData, context) => {
      queryClient.setQueryData(
        ["allApplicantsWithPassState", generation],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allApplicantsWithPassState", generation]);
    },
  });
  const { data: userData } = useQuery(["user"], getMyInfo);

  const postId = applicantDataFinder(data, "id");

  const { applicant, isLoading, isError } = useApplicantById(applicantId);

  const onClickPass = () => {
    const ok = confirm("합격 처리하시겠습니까?");
    if (!ok) return;
    updateApplicantPassState({
      applicantId: postId,
      afterState: "pass",
    });
  };

  const onClickNonPass = () => {
    const ok = confirm("불합격 처리하시겠습니까?");
    if (!ok) return;
    updateApplicantPassState({
      applicantId: postId,
      afterState: "non-pass",
    });
  };

  return (
    <>
      <CustomResource
        data={data}
        ableToEdit={
          userData?.role === "ROLE_OPERATION" ||
          userData?.role === "ROLE_PRESIDENT"
        }
        onClickPass={onClickPass}
        onClickNonPass={onClickNonPass}
        passState={
          applicant && !Array.isArray(applicant)
            ? applicant.state.passState
            : "non-processed"
        }
      />
      <ApplicantLabel postId={postId} generation={generation} />
      <ApplicantComment
        cardId={cardId}
        postId={postId}
        generation={generation}
      />
    </>
  );
};

export default ApplicantDetailLeft;
