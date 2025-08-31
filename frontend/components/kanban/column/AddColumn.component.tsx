"use client";

import { postAddColumn } from "@/src/apis/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import Icon from "@/components/common/Icon";
import { CURRENT_GENERATION } from "@/src/constants";

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
    addColumn({ navigationId, title, year: CURRENT_GENERATION });
    setTitle("");
    setIsOpenAddColumn(false);
  };

  return (
    <div className="w-[17rem]">
      {isOpenAddColumn ? (
        <form
          className="w-[17rem] border-[1px] border-light p-3 rounded-lg"
          onSubmit={(e) => addColumnSubmit(e)}
        >
          <input
            type="text"
            className="p-3 border-[1px] border-light bg-white rounded-lg w-full text-sm my-3 outline-none"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setIsOpenAddColumn(false)}>
              <Icon icon="ellipsisMultiply" />
            </button>
            <button type="submit">
              <Icon icon="arrowForwardCircleFill" />
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="w-[17rem] flex gap-6 justify-start items-center text-secondary-200 py-4 px-6 bg-light h-fit rounded-lg text-lg"
          onClick={() => setIsOpenAddColumn(true)}
        >
          <Icon icon="ellipsisPlus" />
          Add another list
        </button>
      )}
    </div>
  );
}

export default KanbanAddColumnComponent;
