"use client";

import { postAddColumn } from "@/src/apis/kanban/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import EllipsisMultiply from "/public/icons/ellipsis.multiply.svg";
import ArrowForwardCircleFill from "/public/icons/arrow.forward.circle.fill.svg";
import EllipsisPlus from "/public/icons/ellipsis.plus.svg";

function KanbanAddColumnComponent() {
  const [title, setTitle] = useState("");
  const [isOpenAddColumn, setIsOpenAddColumn] = useState(false);
  const navigationId = useAtomValue(KanbanSelectedButtonNumberState);
  const queryClient = useQueryClient();

  const { mutate: addColumn } = useMutation(postAddColumn, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", navigationId],
      });
    },
  });
  const addColumnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addColumn({ navigationId, title });
    setTitle("");
    setIsOpenAddColumn(false);
  };

  return (
    <div className="w-[17rem]">
      {isOpenAddColumn ? (
        <form
          className="w-[17rem] border-[1px] border-[#F0F0F0] p-3 rounded-lg"
          onSubmit={(e) => addColumnSubmit(e)}
        >
          <input
            type="text"
            className="p-3 border-[1px] border-[#F0F0F0] bg-white rounded-lg w-full text-sm my-3 outline-none"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setIsOpenAddColumn(false)}>
              <img src={EllipsisMultiply} alt="" />
            </button>
            <button type="submit">
              <img src={ArrowForwardCircleFill} alt="" />
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="w-[17rem] flex gap-6 justify-start items-center text-[#828282] py-4 px-6 bg-[#EFEFEF] h-fit rounded-lg text-lg"
          onClick={() => setIsOpenAddColumn(true)}
        >
          <img src={EllipsisPlus} alt="AddColumn" />
          Add another list
        </button>
      )}
    </div>
  );
}

export default KanbanAddColumnComponent;
