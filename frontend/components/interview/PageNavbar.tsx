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
  const { pageIndex, type, order, searchKeyword } =
    useInterviewerPaginationParams();

  const queryParams = { type, order, search: searchKeyword };

  const { createQueryString } = useCreateQueryString();

  return (
    <PageNavbarComponent
      maxLength={maxPage}
      page={+pageIndex}
      url={`/interview/${generation}?${createQueryString(
        Object.keys(queryParams),
        Object.values(queryParams)
      )}`}
    />
  );
};

export default InterviewPageNavbar;
