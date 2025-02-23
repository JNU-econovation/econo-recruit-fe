"use client";

import ApplicantDetailRight from "./DetailRight.component";
import { useState } from "react";
import { ApplicantReq } from "@/src/apis/application";
import { applicantDataFinder } from "@/src/functions/finder";
import { type ApplicantPassState } from "../../src/apis/kanban";
import ApplicantDetailLeft from "./_applicant/ApplicantDetailLeft";
import BoardTable from "../common/board/BoardTable";
import useModalState from "../../src/hooks/useModalState";
import BoardModal from "../common/board/BoardModal";

interface ApplicantBoardProps {
  generation: string;
  applicants: ApplicantReq[][];
}

const ApplicantBoard = ({ generation, applicants }: ApplicantBoardProps) => {
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantReq[]>(
    []
  );

  const { isOpen, openModal, closeModal } = useModalState();

  const boardData = applicants.map((value) => ({
    id: applicantDataFinder(value, "id"),
    title: `[${applicantDataFinder(value, "field")}] ${applicantDataFinder(
      value,
      "name"
    )}`,
    subElements: [
      `${applicantDataFinder(value, "field1")}/${applicantDataFinder(
        value,
        "field2"
      )}`,
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
    passState: `${applicantDataFinder(
      value,
      "passState"
    )}` as ApplicantPassState,
  }));

  const onClick = (id: string) => {
    setSelectedApplicant(
      applicants.filter((value) => applicantDataFinder(value, "id") === id)[0]
    );
  };

  const handleModalOpen = (id: string) => () => {
    openModal();
    onClick && onClick(id);
  };

  return (
    <>
      <BoardTable boardRows={boardData} handleModalOpen={handleModalOpen} />
      <BoardModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        wrapperClassName="divide-x"
      >
        <div className="flex flex-1">
          <div className="flex-1 overflow-auto px-12 min-w-[40rem]">
            <ApplicantDetailLeft
              cardId={-1}
              data={selectedApplicant}
              generation={generation}
            />
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-auto px-12">
            <ApplicantDetailRight data={selectedApplicant} />
          </div>
        </div>
      </BoardModal>
    </>
  );
};

export default ApplicantBoard;
