"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { getInterviewRecordByPageWithOrder } from "@/src/apis/interview";
import { useCreateQueryString } from "@/src/hooks/useCreateQueryString";
import useInterviewerPaginationParams from "../../src/hooks/interview/useInterviewerPaginationParams";

type InterviewPageNavbarProps = {
  generation: string;
};

const InterviewPageNavbar = ({ generation }: InterviewPageNavbarProps) => {
  const { pageIndex, type, order, searchKeyword } =
    useInterviewerPaginationParams();

  const queryParams = { type, order, search: searchKeyword };

  const { createQueryString } = useCreateQueryString();

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allInterviewRecord", { generation, order, pageIndex, searchKeyword }],
    () =>
      getInterviewRecordByPageWithOrder({
        page: +pageIndex,
        order: order,
        year: generation,
        searchKeyword,
      }),
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
      page={+pageIndex}
      url={`/interview/${generation}?${createQueryString(
        Object.keys(queryParams),
        Object.values(queryParams)
      )}`}
    />
  );
};

export default InterviewPageNavbar;
