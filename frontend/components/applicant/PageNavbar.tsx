"use client";
import PageNavbarComponent from "../common/PageNavbar.component";
import useApplicantPaginationParams from "@/src/hooks/applicant/useApplicantPaginationParams";

type ApplicantPageNavbarProps = {
  generation: string;
  maxPage: number;
};

const ApplicantPageNavbar = ({
  generation,
  maxPage,
}: ApplicantPageNavbarProps) => {
  const { pageIndex, order, searchKeyword } = useApplicantPaginationParams();

  const queryParams = { search: searchKeyword, order };

  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+pageIndex}
      url={`/applicant/${generation}`}
      query={queryParams}
    />
  );
};

export default ApplicantPageNavbar;
