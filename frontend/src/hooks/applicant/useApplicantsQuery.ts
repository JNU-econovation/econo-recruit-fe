import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { type ApplicantPaginationParams } from "./useApplicantPaginationParams";
import { getApplicantByPageWithGeneration } from "@/src/apis/applicant";

interface UseApplicantsQueryProps extends ApplicantPaginationParams {
  generation: string;
}

const useApplicantsQuery = ({
  generation,
  pageIndex,
  order,
  searchKeyword,
}: UseApplicantsQueryProps) => {
  const currentPage = +pageIndex;

  const query = useQuery({
    queryKey: ["allApplicant", { generation, order, pageIndex, searchKeyword }],
    queryFn: () =>
      getApplicantByPageWithGeneration(
        currentPage,
        generation,
        order,
        searchKeyword
      ),
    enabled: !!generation,
    keepPreviousData: true,
  });
  const queryClient = useQueryClient();

  /**
   * 2025.03.18
   * NOTE: 해당 prefetch는 client단의 prefetch입니다.
   * 서버사이드에서의 prefetch를 하지 않은 이유는, 검색어에 따라 상태가 자주 바뀌기 때문입니다.
   * 검색어가 변경될 때마다 서버에서 prefetch는 낭비일 수 있습니다. 따라서 client에서 prefetch를 하는 것이 좋다고 생각합니다.
   */

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (!query.data) return;
    if (!query.isPreviousData && query.data.maxPage > currentPage) {
      queryClient.prefetchQuery({
        queryKey: [
          "allApplicant",
          { generation, order, pageIndex: `${nextPage}`, searchKeyword },
        ],
        queryFn: () =>
          getApplicantByPageWithGeneration(
            nextPage,
            generation,
            order,
            searchKeyword
          ),
      });
    }
  }, [query.data, query.isPreviousData, pageIndex, queryClient]);

  return query;
};

export default useApplicantsQuery;
