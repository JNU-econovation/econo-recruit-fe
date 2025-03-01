"use client";

import { useQuery } from "@tanstack/react-query";
import useInterviewerPaginationParams from "../../src/hooks/interview/useInterviewerPaginationParams";
import { getInterviewRecordByPageWithOrder } from "../../src/apis/interview";
import InterviewBoard from "./Board";
import InterviewPageNavbar from "./PageNavbar";
import LoadingSpinner from "../common/LoadingSpinner";
import { removeAll } from "../../src/functions/replacer";
import { CHARACTERS } from "../../src/constants";

interface InterviewerListProps {
  generation: string;
}

const InterviewerList = ({ generation }: InterviewerListProps) => {
  const { pageIndex, order, searchKeyword } = useInterviewerPaginationParams();

  const { data: interview, status } = useQuery({
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
