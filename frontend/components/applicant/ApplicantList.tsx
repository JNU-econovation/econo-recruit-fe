"use client";

import { useQuery } from "@tanstack/react-query";
import useApplicantPaginationParams from "../../src/hooks/applicant/useApplicantPaginationParams";
import { getApplicantByPageWithGeneration } from "../../src/apis/applicant";
import LoadingSpinner from "../common/LoadingSpinner";
import ApplicantBoard from "./Board";
import ApplicantPageNavbar from "./PageNavbar";

interface ApplicantListProps {
  generation: string;
}

const ApplicantList = ({ generation }: ApplicantListProps) => {
  const { pageIndex, order, searchKeyword } = useApplicantPaginationParams();
  const { data: applicants, status } = useQuery(
    ["allApplicant", { generation, order, pageIndex, searchKeyword }],
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

  if (status === "loading") {
    return (
      <div>
        <LoadingSpinner size={8} />
      </div>
    );
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
