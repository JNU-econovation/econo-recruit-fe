"use client";

import { type PropsWithChildren } from "react";
import useModalState from "../../../src/hooks/useModalState";
import BoardModal from "./BoardModal";
import BoardTable from "./BoardTable";
import { type ApplicantPassState } from "../../../src/apis/kanban";

export interface BoardData {
  id: string;
  title: string;
  subElements: string[];
  time?: Date;
  passState?: ApplicantPassState;
}

interface BoardProps extends PropsWithChildren {
  onClick?: (id: string) => void;
  wrapperClassName?: string;
  boardData: BoardData[];
}

const Board = ({
  children,
  onClick,
  wrapperClassName,
  boardData,
}: BoardProps) => {
  const { isOpen, openModal, closeModal } = useModalState();

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
        wrapperClassName={wrapperClassName}
      >
        {children}
      </BoardModal>
    </>
  );
};

export default Board;
