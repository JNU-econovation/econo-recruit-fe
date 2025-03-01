"use client";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useCreateQueryString } from "@/src/hooks/useCreateQueryString";
import useApplicantPaginationParams from "../../src/hooks/applicant/useApplicantPaginationParams";

type ApplicantPageNavbarProps = {
  generation: string;
  maxPage: number;
};

const ApplicantPageNavbar = ({
  generation,
  maxPage,
}: ApplicantPageNavbarProps) => {
  const { pageIndex, type, order, searchKeyword } =
    useApplicantPaginationParams();

  const queryParams = { search: searchKeyword, type, order };

  const { createQueryString } = useCreateQueryString();

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
