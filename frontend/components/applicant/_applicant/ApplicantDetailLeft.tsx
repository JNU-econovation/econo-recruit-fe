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

interface DetailLeftProps {
  data: ApplicantReq[];
  generation: string;
  cardId: number;
}
const ApplicantDetailLeft = ({ data, cardId, generation }: DetailLeftProps) => {
  const queryClient = useQueryClient();
  const { mutate: updateApplicantPassState } = useMutation({
    mutationFn: (params: PatchApplicantPassStateParams) =>
      patchApplicantPassState(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "allApplicantsWithPassState",
          applicantDataFinder(data, "generation"),
        ],
      });
    },
  });
  const { data: userData } = useQuery(["user"], getMyInfo);

  const postId = applicantDataFinder(data, "id");

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
        ableToEdit={userData?.role === "ROLE_OPERATION"}
        onClickPass={onClickPass}
        onClickNonPass={onClickNonPass}
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
