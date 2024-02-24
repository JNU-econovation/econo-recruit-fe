"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useSearchParams } from "next/navigation";
import { getInterviewRecordByPage } from "@/src/apis/interview";

type InterviewPageNavbarProps = {
  generation: string;
};

const InterviewPageNavbar = ({ generation }: InterviewPageNavbarProps) => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const type = searchParams.get("type") ?? "list";
  const order = searchParams.get("order") ?? "newest";
  const page = searchParams.get("page") ?? "1";

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", generation],
    () => getInterviewRecordByPage(+pageIndex, order),
    {
      enabled: !!generation,
    }
  );

  if (!allData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const { maxPage } = allData;
  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+page}
      url={`/interview/${generation}?type=${type}&order=${order}`}
    />
  );
};

export default InterviewPageNavbar;
