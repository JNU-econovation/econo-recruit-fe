"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useSearchParams } from "next/navigation";
import { getInterviewRecordByPageWithOrder } from "@/src/apis/interview";
import { ORDER_MENU } from "@/src/constants";
import { useSearchQuery } from "@/src/hooks/useSearchQuery";

type InterviewPageNavbarProps = {
  generation: string;
};

const InterviewPageNavbar = ({ generation }: InterviewPageNavbarProps) => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const type = searchParams.get("type") ?? "list";
  const order = searchParams.get("order") ?? ORDER_MENU.INTERVIEW[0].type;
  const page = searchParams.get("page") ?? "1";

  const searchTerm = searchParams.get("search") || "";
  const { searchEndPage } = useSearchQuery(pageIndex);

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", generation],
    () => getInterviewRecordByPageWithOrder(+pageIndex, order),
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
      maxLength={searchEndPage ?? maxPage}
      page={+page}
      url={`/interview/${generation}?search=${searchTerm}&type=${type}&order=${order}`}
    />
  );
};

export default InterviewPageNavbar;
