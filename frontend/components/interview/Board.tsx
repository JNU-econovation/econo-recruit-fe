"use client";

import InterviewDetailLeftComponent from "./modal/DetailLeft.component";
import Board from "../common/board/Board";
import InterviewDetailRightComponent from "./modal/DetailRight.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import { useSearchParams } from "next/navigation";
import { getInterviewRecordByPageWithOrder } from "@/src/apis/interview";
import { ORDER_MENU } from "@/src/constants";
import { useSearchQuery } from "@/src/hooks/useSearchQuery";

const InterviewBoard = () => {
  const [applicantId, setApplicantId] = useAtom(interViewApplicantIdState);
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") || ORDER_MENU.INTERVIEW[0].type;
  const { createSearchData } = useSearchQuery(pageIndex);

  const queryClient = useQueryClient();

  const onClick = (id: string) => {
    setApplicantId(id);
    queryClient.invalidateQueries({
      queryKey: ["record", applicantId],
    });
    queryClient.invalidateQueries({
      queryKey: ["score", applicantId],
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allInterviewRecord", pageIndex, order],
    queryFn: () => getInterviewRecordByPageWithOrder(+pageIndex, order),
  });

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  const { records } = data;

  const boardData = records.map((value) => {
    return {
      id: value.applicantId,
      title: value.name,
      subElements: [
        value.field1.split('"').join(""),
        value.field2.split('"').join(""),
        `${value.grade.split('"').join("")} ${value.semester
          .split('"')
          .join("")}`,
      ],
    };
  });

  return (
    <Board
      wapperClassname="divide-x"
      boardData={createSearchData() ?? boardData}
      onClick={(id) => onClick(id)}
    >
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-auto px-12">
          <InterviewDetailLeftComponent />
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-auto px-12">
          <InterviewDetailRightComponent />
        </div>
      </div>
    </Board>
  );
};

export default InterviewBoard;
