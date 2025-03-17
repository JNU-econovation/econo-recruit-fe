"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useInterviewerPaginationParams from "../../src/hooks/interview/useInterviewerPaginationParams";
import { getInterviewRecordByPageWithOrder } from "../../src/apis/interview";
import InterviewBoard from "./Board";
import InterviewPageNavbar from "./PageNavbar";
import LoadingSpinner from "../common/LoadingSpinner";
import { removeAll } from "../../src/functions/replacer";
import { CHARACTERS } from "../../src/constants";
import { useEffect } from "react";

interface InterviewerListProps {
  generation: string;
}

const InterviewerList = ({ generation }: InterviewerListProps) => {
  const { pageIndex, order, searchKeyword } = useInterviewerPaginationParams();

  const {
    data: interview,
    status,
    isPreviousData,
  } = useQuery({
    queryKey: [
      "allInterviewRecord",
      { pageIndex, order, generation, searchKeyword },
    ],
    queryFn: () =>
      getInterviewRecordByPageWithOrder({
        page: +pageIndex,
        order: order,
        year: generation,
        searchKeyword,
      }),
  });

  /**
   * 2025.03.18
   * NOTE: 해당 prefetch는 client단의 prefetch입니다.
   * 서버사이드에서의 prefetch를 하지 않은 이유는, 검색어에 따라 상태가 자주 바뀌기 때문입니다.
   * 검색어가 변경될 때마다 서버에서 prefetch는 낭비일 수 있습니다. 따라서 client에서 prefetch를 하는 것이 좋다고 생각합니다.
   */
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!interview?.maxPage) return;
    if (!isPreviousData && interview.maxPage > +pageIndex) {
      queryClient.prefetchQuery({
        queryKey: [
          "allInterviewRecord",
          { pageIndex: `${+pageIndex + 1}`, order, generation, searchKeyword },
        ],
        queryFn: () =>
          getInterviewRecordByPageWithOrder({
            page: +pageIndex + 1,
            order: order,
            year: generation,
            searchKeyword,
          }),
      });
    }
  }, [
    interview?.maxPage,
    pageIndex,
    order,
    generation,
    searchKeyword,
    queryClient,
  ]);

  if (status === "loading") {
    return (
      <section className="flex flex-col">
        <LoadingSpinner size="s" />
      </section>
    );
  }

  if (status === "error") {
    return <div>에러가 발생하였습니다. 잠시 후 다시 시도해보세요.</div>;
  }

  const interviewRecords = interview.records.map((value) => {
    return {
      id: value.applicantId,
      title: value.name,
      subElements: [
        removeAll(value.field1, CHARACTERS.DOUBLE_QUOTE).concat(
          CHARACTERS.SLASH,
          removeAll(value.field2, CHARACTERS.DOUBLE_QUOTE)
        ),
        removeAll(value.grade, CHARACTERS.DOUBLE_QUOTE).concat(
          CHARACTERS.SPACE,
          removeAll(value.semester, CHARACTERS.DOUBLE_QUOTE)
        ),
      ],
      passState: value.state.passState,
    };
  });

  return (
    <>
      <InterviewBoard interviewRecords={interviewRecords} />
      <InterviewPageNavbar
        generation={generation}
        maxPage={interview.maxPage}
      />
    </>
  );
};

export default InterviewerList;
