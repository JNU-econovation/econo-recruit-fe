import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getInterviewRecordByPageWithOrder } from "@/src/apis/interview";
import { type InterviewerPaginationParams } from "./useInterviewerPaginationParams";

interface UseAllInterviewRecordQueryProps
  extends Pick<
    InterviewerPaginationParams,
    "pageIndex" | "order" | "searchKeyword"
  > {
  generation: string;
}

const useAllInterviewRecordQuery = ({
  generation,
  pageIndex,
  order,
  searchKeyword,
}: UseAllInterviewRecordQueryProps) => {
  const queryKeys = [
    "allInterviewRecord",
    { pageIndex, order, generation, searchKeyword },
  ];
  const currentPage = +pageIndex;

  const query = useQuery({
    queryKey: queryKeys,
    queryFn: () =>
      getInterviewRecordByPageWithOrder({
        page: currentPage,
        order: order,
        year: generation,
        searchKeyword,
      }),
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
          "allInterviewRecord",
          { pageIndex: `${nextPage}`, order, generation, searchKeyword },
        ],
        queryFn: () =>
          getInterviewRecordByPageWithOrder({
            page: nextPage,
            order: order,
            year: generation,
            searchKeyword,
          }),
      });
    }
  }, [
    query.data,
    query.isPreviousData,
    currentPage,
    order,
    generation,
    searchKeyword,
    queryClient,
  ]);

  return query;
};

export default useAllInterviewRecordQuery;
