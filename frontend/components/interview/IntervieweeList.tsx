"use client";
import InterviewBoard from "./Board";
import IntervieweePageNavbar from "./PageNavbar";
import LoadingSpinner from "../common/LoadingSpinner";
import { removeAll } from "@/src/functions/replacer";
import { CHARACTERS } from "@/src/constants";
import {
  useAllInterviewRecordQuery,
  useIntervieweePaginationParams,
} from "@/src/hooks/interview";

interface IntervieweeListProps {
  generation: string;
}

const IntervieweeList = ({ generation }: IntervieweeListProps) => {
  const { data: interviewees, status } = useAllInterviewRecordQuery({
    generation,
    ...useIntervieweePaginationParams(),
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

  const interviewRecords = interviewees.records.map((value) => {
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
      <IntervieweePageNavbar
        generation={generation}
        maxPage={interviewees.maxPage}
      />
    </>
  );
};

export default IntervieweeList;
