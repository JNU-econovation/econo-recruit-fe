"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { getApplicantByPageWithGeneration } from "@/src/apis/applicant";
import { useCreateQueryString } from "@/src/hooks/useCreateQueryString";
import useApplicantPaginationParams from "../../src/hooks/applicant/useApplicantPaginationParams";

type ApplicantPageNavbarProps = {
  generation: string;
};

const ApplicantPageNavbar = ({ generation }: ApplicantPageNavbarProps) => {
  const { pageIndex, type, order, searchKeyword } =
    useApplicantPaginationParams();

  const queryParams = { search: searchKeyword, type, order };

  const { createQueryString } = useCreateQueryString();

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", { generation, order, pageIndex, search: searchKeyword }],
    () =>
      getApplicantByPageWithGeneration(
        +pageIndex,
        generation,
        order,
        searchKeyword
      ),
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

  // Search 넣어야 함!!!
  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+pageIndex}
      url={`/applicant/${generation}?${createQueryString(
        Object.keys(queryParams),
        Object.values(queryParams)
      )}`}
    />
  );
};

export default ApplicantPageNavbar;
