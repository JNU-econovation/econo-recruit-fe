"use client";
import PageNavbarComponent from "../common/PageNavbar.component";
import { useCreateQueryString } from "@/src/hooks/useCreateQueryString";
import useInterviewerPaginationParams from "../../src/hooks/interview/useInterviewerPaginationParams";

type InterviewPageNavbarProps = {
  maxPage: number;
  generation: string;
};

const InterviewPageNavbar = ({
  maxPage,
  generation,
}: InterviewPageNavbarProps) => {
  const { pageIndex, order, searchKeyword } = useInterviewerPaginationParams();

  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+pageIndex}
      url={`/interview/${generation}`}
      query={{ order, searchKeyword }}
    />
  );
};

export default InterviewPageNavbar;
