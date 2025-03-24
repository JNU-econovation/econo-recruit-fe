"use client";
import { useIntervieweePaginationParams } from "@/src/hooks/interview";
import PageNavbarComponent from "../common/PageNavbar.component";

type IntervieweePageNavbarProps = {
  maxPage: number;
  generation: string;
};

const IntervieweePageNavbar = ({
  maxPage,
  generation,
}: IntervieweePageNavbarProps) => {
  const { pageIndex, order, searchKeyword } = useIntervieweePaginationParams();

  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+pageIndex}
      url={`/interview/${generation}`}
      query={{ order, searchKeyword }}
    />
  );
};

export default IntervieweePageNavbar;
