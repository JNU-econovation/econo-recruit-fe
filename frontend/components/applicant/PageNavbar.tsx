"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useSearchParams } from "next/navigation";
import { getApplicantByPageWithGeneration } from "@/src/apis/applicant";
import { ORDER_MENU } from "@/src/constants";
import { useCreateQueryString } from "@/src/hooks/useCreateQueryString";

type ApplicantPageNavbarProps = {
  generation: string;
};

const ApplicantPageNavbar = ({ generation }: ApplicantPageNavbarProps) => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const type = searchParams.get("type") ?? "list";
  const order = searchParams.get("order") ?? ORDER_MENU.APPLICANT[0].type;
  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("search") || "";
  const queryParams = { search, type, order };
  const { createQueryString } = useCreateQueryString();

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", { generation, order, pageIndex, search }],
    () =>
      getApplicantByPageWithGeneration(+pageIndex, generation, order, search),
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
      url={`/applicant/${generation}?${createQueryString(
        Object.keys(queryParams),
        Object.values(queryParams)
      )}`}
    />
  );
};

export default ApplicantPageNavbar;
