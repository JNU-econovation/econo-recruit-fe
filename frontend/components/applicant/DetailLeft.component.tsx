import { ApplicantReq } from "@/src/apis/applicant/applicant";
import ApplicantResource from "./applicantNode/CustomResource.component";
import ApplicantLabel from "./applicantNode/Label.component";
import { applicantDataFinder } from "@/src/functions/finder";
import dynamic from "next/dynamic";

interface ApplicantDetailLeftProps {
  data: ApplicantReq[];
  cardId: number;
  generation: string;
}

const ApplicantComment = dynamic(
  () => import("./applicantNode/comment/Comment.component"),
  { ssr: false }
);

const ApplicantDetailLeft = ({
  data,
  cardId,
  generation,
}: ApplicantDetailLeftProps) => {
  const postId = applicantDataFinder(data, "id");

  return (
    <>
      <ApplicantResource data={data} postId={postId} />
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
