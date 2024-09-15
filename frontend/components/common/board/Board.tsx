"use client";

import { PropsWithChildren, useState } from "react";
import BoardCell from "./BoardCell.component";
import Txt from "../Txt.component";
import useModalState from "../../../src/hooks/useModalState";
import BoardModal from "./BoardModal";
import BoardTable from "./BoardTable";

export interface BoardData {
  id: string;
  title: string;
  subElements: string[];
  time?: Date;
}

interface BoardProps extends PropsWithChildren {
  onClick?: (id: string) => void;
  wrapperClassname?: string;
  boardData: BoardData[];
}

const Board = ({
  children,
  onClick,
  wrapperClassname,
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
        wrapperClassname={wrapperClassname}
      >
        {children}
      </BoardModal>
    </>
  );
};

export default Board;
