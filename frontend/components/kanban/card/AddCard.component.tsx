"use client";

import { postAddCard } from "@/src/apis/kanban/kanban";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import EllipsisMultiply from "/public/icons/ellipsis.multiply.svg";
import ArrowForwardCircleFill from "/public/icons/arrow.forward.circle.fill.svg";
import EllipsisPlus from "/public/icons/ellipsis.plus.svg";

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
          className="w-[17rem] border-[1px] border-[#F0F0F0] p-3 rounded-lg"
          onSubmit={(e) => addCardSubmit(e)}
        >
          <input
            type="text"
            className="p-3 border-[1px] border-[#F0F0F0] drop-shadow-md bg-white rounded-lg w-full text-sm my-3 outline-none"
            placeholder="Enter a title for this card"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setIsOpenAddCard(false)}>
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
          className="flex gap-2 justify-center items-center text-[#828282]"
          onClick={() => {
            setIsOpenAddCard(true);
          }}
        >
          <img src={EllipsisPlus} alt="AddCard" />
          Add a card
        </button>
      )}
    </div>
  );
}

export default KanbanAddCardComponent;
