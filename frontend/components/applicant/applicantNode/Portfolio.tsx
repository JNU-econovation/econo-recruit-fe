import Txt from "@/components/common/Txt.component";
import { ApplicantReq } from "@/src/apis/applicant";
import { applicantDataFinder } from "@/src/functions/finder";
import Link from "next/link";

interface PortfolioProps {
  data: ApplicantReq[];
}

const Portfolio = ({ data }: PortfolioProps) => {
  const regex = /[\s,;|]+/;

  const portfolio = applicantDataFinder(data, "portfolio")
    .split(regex)
    .map((url: string) => url.trim());

  const file = applicantDataFinder(data, "fileUrl")
    .split(regex)
    .map((url: string) => url.trim());

  const fileUrlForPlanner = applicantDataFinder(data, "fileUrlforPlanner")
    .split(regex)
    .map((url: string) => url.trim());

  return (
    <>
      <Txt typography="h4">포트폴리오</Txt>
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <Txt typography="h6">링크(개발자)</Txt>
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
        {!!fileUrlForPlanner && (
          <div className="flex-1 flex flex-col">
            <Txt typography="h6">이번 학기 프로젝트 기획서</Txt>
            {fileUrlForPlanner.map((url: string, index: number) => {
              return (
                <Link href={url} target="_blank" key={index}>
                  <Txt className="break-all">{url}</Txt>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
