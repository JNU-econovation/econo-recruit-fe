"use client";

import { postAddCard } from "@/src/apis/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import Icon from "@/components/common/Icon";

type KanbanAddCardComponent = {
  columnId: number;
};

function KanbanAddCardComponent({ columnId }: KanbanAddCardComponent) {
  const [title, setTitle] = useState("");
  const [isOpenAddCard, setIsOpenAddCard] = useState(false);
  const navbarId = useAtomValue(KanbanSelectedButtonNumberState);
  const queryClient = useQueryClient();

  const { mutate: addCard } = useMutation(postAddCard, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", navbarId],
      });
    },
  });
  const addCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCard({ columnId, title });
    setTitle("");
    setIsOpenAddCard(false);
  };

  return (
    <div className="mt-2">
      {isOpenAddCard ? (
        <form
          className="w-[17rem] border-[1px] border-light p-3 rounded-lg"
          onSubmit={(e) => addCardSubmit(e)}
        >
          <input
            type="text"
            className="p-3 border-[1px] border-light drop-shadow-md bg-white rounded-lg w-full text-sm my-3 outline-none"
            placeholder="Enter a title for this card"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setIsOpenAddCard(false)}>
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
          className="flex gap-2 justify-center items-center text-secondary-200"
          onClick={() => {
            setIsOpenAddCard(true);
          }}
        >
          <Icon icon="ellipsisPlus" />
          Add a card
        </button>
      )}
    </div>
  );
}

export default KanbanAddCardComponent;
