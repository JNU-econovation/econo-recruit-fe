"use client";

import { PropsWithChildren, useState } from "react";
import BoardCell from "./BoardCell.component";
import Modal from "react-modal";
import Image from "next/image";
import CloseImage from "/public/icons/ellipsis.multiply.svg";
import { cn } from "@/src/utils/cn";
import Txt from "../Txt.component";
import useModalState from "../../../src/hooks/useModalState";

interface BoardData {
  id: string;
  title: string;
  subElements: string[];
  time?: Date;
}

interface BoardProps extends PropsWithChildren {
  onClick?: (id: string) => void;
  wapperClassname?: string;
  boardData: BoardData[];
}

const modalStyle = {
  content: {
    width: "calc(100% - 12rem)",
    zIndex: "9999",
    height: "calc(100%)",
    margin: "3rem 6rem 0 6rem",
    minWidth: "1280px",
    boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.14)",
    border: "none",
    position: "relative",
    inset: "0",
    padding: "2.5rem 3rem",
  },
  overlay: {
    padding: "0",
    position: "absolute",
  },
} as const;

const Board = ({
  children,
  onClick,
  wapperClassname,
  boardData,
}: BoardProps) => {
  const { isOpen, openModal, closeModal } = useModalState();

  const handleModalOpen = (id: string) => () => {
    openModal();
    onClick && onClick(id);
  };

  return (
    <section className="flex flex-col">
      {boardData.length === 0 ? (
        <Txt>검색결과가 없습니다.</Txt>
      ) : (
        <>
          {boardData.map((item) => (
            <BoardCell
              key={item.id}
              title={item.title}
              subElements={item.subElements}
              onClick={handleModalOpen(item.id)}
            />
          ))}
        </>
      )}
      <Modal
        style={modalStyle}
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <button className="absolute z-10" onClick={closeModal}>
          <Image src={CloseImage} alt="close" />
        </button>
        <div
          className={cn(
            "flex pt-8 absolute h-[calc(100%-6rem)] w-[calc(100%-6rem)]",
            wapperClassname
          )}
        >
          {children}
        </div>
      </Modal>
    </section>
  );
};

export default Board;
