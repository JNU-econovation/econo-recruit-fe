"use client";
import { useRouter } from "next/navigation";
import Icon from "../common/Icon";

interface KanbanDetailBackButtonProps {
  generation: string;
}

const KanbanDetailBackButton = ({
  generation,
}: KanbanDetailBackButtonProps) => {
  const navigate = useRouter();

  const onBackClick = () => {
    navigate.push(`/kanban/${generation}`);
  };
  return (
    <button onClick={onBackClick} className="w-8 ">
      <Icon icon="chevronBackward" />
    </button>
  );
};

export default KanbanDetailBackButton;
