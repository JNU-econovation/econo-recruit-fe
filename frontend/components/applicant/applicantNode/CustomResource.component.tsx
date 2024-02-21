import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Link from "next/link";
import ApplicantInterviewerScore from "./InterviewerScore.component";

interface ApplicantResourceProps {
  data: ApplicantReq[];
  postId: string;
}

const ApplicantResource = ({ data, postId }: ApplicantResourceProps) => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        <Txt className="text-xl text-secondary-200 font-medium">
          {applicantDataFinder(data, "major")}
        </Txt>
        <Txt typography="h2">{`[${applicantDataFinder(
          data,
          "field"
        )}] ${applicantDataFinder(data, "name")}`}</Txt>
      </div>
      <ApplicantInterviewerScore postId={postId} />
      <div className="flex gap-4 mb-8">
        <div className="flex gap-1">
          <Txt typography="h3" color="gray" className="font-normal">
            1지망:
          </Txt>
          <Txt typography="h3" color="blue">
            {applicantDataFinder(data, "field1")}
          </Txt>
        </div>
        <div className="flex gap-1">
          <Txt typography="h3" color="gray" className="font-normal">
            2지망:
          </Txt>
          <Txt typography="h3" color="blue">
            {applicantDataFinder(data, "field2")}
          </Txt>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Txt typography="h4">포트폴리오</Txt>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <Txt typography="h6">링크</Txt>
            <Link href={applicantDataFinder(data, "portfolio")} target="_blank">
              <Txt className="break-all">
                {applicantDataFinder(data, "portfolio")}
              </Txt>
            </Link>
          </div>
          <div className="flex-1 flex flex-col">
            <Txt typography="h6">파일</Txt>
            <Link href={applicantDataFinder(data, "fileUrl")} target="_blank">
              <Txt className="break-all">
                {applicantDataFinder(data, "fileUrl")}
              </Txt>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantResource;
