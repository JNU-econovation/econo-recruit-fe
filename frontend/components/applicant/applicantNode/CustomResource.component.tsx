import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Link from "next/link";

interface ApplicantResourceProps {
  data: ApplicantReq[];
  postId: string;
}

const ApplicantResource = ({ data, postId }: ApplicantResourceProps) => {
  const regex = /[\s,;|]+/;

  const portfolio = applicantDataFinder(data, "portfolio")
    .split(regex)
    .map((url: string) => url.trim());

  const file = applicantDataFinder(data, "fileUrl")
    .split(regex)
    .map((url: string) => url.trim());

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
            {portfolio.map((url: string, index: number) => {
              return (
                <Link href={url} target="_blank" key={index}>
                  <Txt className="break-all">{url}</Txt>
                </Link>
              );
            })}
          </div>
          <div className="flex-1 flex flex-col">
            <Txt typography="h6">파일</Txt>
            {file.map((url: string, index: number) => {
              return (
                <Link href={url} target="_blank" key={index}>
                  <Txt className="break-all">{url}</Txt>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantResource;
