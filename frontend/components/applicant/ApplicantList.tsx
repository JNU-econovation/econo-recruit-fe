"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApplicantPaginationParams from "../../src/hooks/applicant/useApplicantPaginationParams";
import { getApplicantByPageWithGeneration } from "../../src/apis/applicant";
import LoadingSpinner from "../common/LoadingSpinner";
import ApplicantBoard from "./Board";
import ApplicantPageNavbar from "./PageNavbar";
import { useEffect } from "react";

interface ApplicantListProps {
  generation: string;
}

const ApplicantList = ({ generation }: ApplicantListProps) => {
  const { pageIndex, order, searchKeyword } = useApplicantPaginationParams();
  const {
    data: applicants,
    status,
    isPreviousData,
  } = useQuery(
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
      keepPreviousData: true,
    }
  );
  const queryClient = useQueryClient();
  /**
   * 2025.03.18
   * NOTE: 해당 prefetch는 client단의 prefetch입니다.
   * 서버사이드에서의 prefetch를 하지 않은 이유는, 검색어에 따라 상태가 자주 바뀌기 때문입니다.
   * 검색어가 변경될 때마다 서버에서 prefetch는 낭비일 수 있습니다. 따라서 client에서 prefetch를 하는 것이 좋다고 생각합니다.
   */

  useEffect(() => {
    if (!applicants?.maxPage) return;
    if (!isPreviousData && applicants.maxPage > +pageIndex) {
      queryClient.prefetchQuery({
        queryKey: [
          "allApplicant",
          { generation, order, pageIndex: `${+pageIndex + 1}`, searchKeyword },
        ],
        queryFn: () =>
          getApplicantByPageWithGeneration(
            +pageIndex + 1,
            generation,
            order,
            searchKeyword
          ),
      });
    }
  }, [applicants, isPreviousData, pageIndex, queryClient]);

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
