"use client";

import Board from "@/components/common/board/Board";
import { getApplicantByPageWithGeneration } from "@/src/apis/applicant";
import ApplicantDetailRight from "./DetailRight.component";
import ApplicantDetailLeft from "./DetailLeft.component";
import { useState } from "react";
import { ApplicantReq } from "@/src/apis/application";
import { applicantDataFinder } from "@/src/functions/finder";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "@/src/constants";
import { useSearchQuery } from "@/src/hooks/useSearchQuery";

interface ApplicantBoardProps {
  generation: string;
}

const ApplicantBoard = ({ generation }: ApplicantBoardProps) => {
  const [data, setData] = useState<ApplicantReq[]>([]);
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") || ORDER_MENU.APPLICANT[0].type;
  const { searchApplicantData } = useSearchQuery(pageIndex);

  const onClick = (id: string) => {
    if (!allData) return;
    setData(
      applicants?.filter((value) => applicantDataFinder(value, "id") === id)[0]
    );
  };

  const {
    data: allData,
    isLoading,
    isError,
  } = useQuery(
    ["allApplicant", pageIndex, order],
    () => getApplicantByPageWithGeneration(+pageIndex, generation, order),
    {
      enabled: !!generation,
    }
  );

  if (!allData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const { applicants } = allData;

  const boardData = applicants.map((value) => ({
    id: applicantDataFinder(value, "id"),
    title: `[${applicantDataFinder(value, "field")}] ${applicantDataFinder(
      value,
      "name"
    )}`,
    subElements: [
      applicantDataFinder(value, "field1"),
      applicantDataFinder(value, "field2"),
      `${applicantDataFinder(value, "grade")} ${applicantDataFinder(
        value,
        "semester"
      )}`,
      applicantDataFinder(value, "uploadDate") === ""
        ? new Date().toLocaleString("ko-KR", { dateStyle: "short" })
        : new Date(
            Number(applicantDataFinder(value, "uploadDate"))
          ).toLocaleString("ko-KR", { dateStyle: "short" }),
    ],
  }));

  return (
    <Board
      wapperClassname="divide-x"
      boardData={searchApplicantData ?? boardData}
      onClick={onClick}
    >
      <div className="flex flex-1">
        <div className="flex-1 overflow-auto px-12 min-w-[40rem]">
          <ApplicantDetailLeft
            cardId={-1}
            data={data}
            generation={generation}
          />
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-auto px-12">
          <ApplicantDetailRight data={data} />
        </div>
      </div>
    </Board>
  );
};

export default ApplicantBoard;
