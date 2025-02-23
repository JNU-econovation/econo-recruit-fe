"use client";

import InterviewDetailLeftComponent from "./modal/DetailLeft.component";
import InterviewDetailRightComponent from "./modal/DetailRight.component";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { interViewApplicantIdState } from "@/src/stores/interview/Interview.atom";
import BoardTable from "../common/board/BoardTable";
import useModalState from "../../src/hooks/useModalState";
import BoardModal from "../common/board/BoardModal";
import { ApplicantPassState } from "../../src/apis/kanban";

interface InterviewBoardProps {
  interviewRecords: {
    id: string;
    title: string;
    subElements: string[];
    passState: ApplicantPassState;
  }[];
}

const InterviewBoard = ({ interviewRecords }: InterviewBoardProps) => {
  const [applicantId, setApplicantId] = useAtom(interViewApplicantIdState);

  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModalState();

  const onClick = (id: string) => {
    setApplicantId(id);
    queryClient.invalidateQueries({
      queryKey: ["record", applicantId],
    });
    queryClient.invalidateQueries({
      queryKey: ["score", applicantId],
    });
  };

  const handleModalOpen = (id: string) => () => {
    openModal();
    onClick && onClick(id);
  };

  return (
    <>
      <BoardTable
        boardRows={interviewRecords}
        handleModalOpen={handleModalOpen}
      />
      <BoardModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        wrapperClassName="divide-x"
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
      </BoardModal>
    </>
  );
};

export default InterviewBoard;
