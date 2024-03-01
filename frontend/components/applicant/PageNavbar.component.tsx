"use client";
import { useQuery } from "@tanstack/react-query";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useSearchParams } from "next/navigation";
import { getApplicantByPageWithGeneration } from "@/src/apis/applicant";
import { ORDER_MENU } from "@/src/constants";

type ApplicantPageNavbarProps = {
  generation: string;
};

const ApplicantPageNavbar = ({ generation }: ApplicantPageNavbarProps) => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const type = searchParams.get("type") ?? "list";
  const order = searchParams.get("order") ?? ORDER_MENU.APPLICANT[0].type;
  const page = searchParams.get("page") ?? "1";

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", generation],
    () => getApplicantByPageWithGeneration(+pageIndex, generation, order),
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
      url={`/applicant/${generation}?type=${type}&order=${order}`}
    />
  );
};

export default ApplicantPageNavbar;
