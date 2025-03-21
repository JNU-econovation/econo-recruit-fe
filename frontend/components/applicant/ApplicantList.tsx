"use client";

import useApplicantPaginationParams from "../../src/hooks/applicant/useApplicantPaginationParams";
import LoadingSpinner from "../common/LoadingSpinner";
import ApplicantBoard from "./Board";
import ApplicantPageNavbar from "./PageNavbar";
import { useApplicantsQuery } from "@/src/hooks/applicant";

interface ApplicantListProps {
  generation: string;
}

const ApplicantList = ({ generation }: ApplicantListProps) => {
  const { data: applicants, status } = useApplicantsQuery({
    generation,
    ...useApplicantPaginationParams(),
  });
  if (status === "loading") {
    return <LoadingSpinner size="s" />;
  }
  if (status === "error") {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <ApplicantBoard
        generation={generation}
        applicants={applicants.applicants}
      />
      <ApplicantPageNavbar
        generation={generation}
        maxPage={applicants.maxPage}
      />
    </>
  );
};

export default ApplicantList;
