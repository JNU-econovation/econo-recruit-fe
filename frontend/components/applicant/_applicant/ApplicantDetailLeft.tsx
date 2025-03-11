"use client";

import { ApplicantReq } from "@/src/apis/applicant";
import CustomResource from "./_applicantNode/CustomResource";
import { useQuery } from "@tanstack/react-query";

import { applicantDataFinder } from "@/src/functions/finder";
import { getMyInfo } from "@/src/apis/interview";
import ApplicantLabel from "../applicantNode/Label.component";
import ApplicantComment from "../applicantNode/comment/Comment.component";
import { useApplicantById } from "@/src/hooks/applicant/useApplicantById";

import { useOptimisticApplicantPassUpdate } from "@/src/hooks/applicant/useOptimisticApplicantPassUpdate";
import { getPassState } from "@/src/functions/passState";

interface DetailLeftProps {
  data: ApplicantReq[];
  generation: string;
  cardId: number;
}
const ApplicantDetailLeft = ({ data, cardId, generation }: DetailLeftProps) => {
  const postId = applicantDataFinder(data, "id");

  const { mutate: updateApplicantPassState } =
    useOptimisticApplicantPassUpdate(generation);
  const { data: userData } = useQuery(["user"], getMyInfo);

  const { applicant, isLoading, isError } = useApplicantById({
    applicantId: postId,
    generation,
  });

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

  if (!applicant) {
    return <div>로딩중...</div>;
  }

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
        passState={getPassState(applicant)}
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
