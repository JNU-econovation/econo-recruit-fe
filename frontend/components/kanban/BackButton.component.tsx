"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ChevronBackward from "/public/icons/chevron.backward.svg";
interface KanbanDetailBackButtonProps {
  generation: string;
}

const KanbanDetailBackButton: FC<KanbanDetailBackButtonProps> = ({
  generation,
}) => {
  const navigate = useRouter();

  const onBackClick = () => {
    navigate.push(`/kanban/${generation}`);
  };
  return (
    <button onClick={onBackClick} className="w-8 ">
      <img src={ChevronBackward} alt="" />
    </button>
  );
};

export default KanbanDetailBackButton;
