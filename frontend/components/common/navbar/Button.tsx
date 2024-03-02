"use client";

import { KANBAN_MENU } from "@/src/constants/kanban/26";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { cn } from "@/src/utils/cn";
import { useAtom } from "jotai";

type NavbarButtonProps = {
  value: string;
};

const NavbarButton = ({ value }: NavbarButtonProps) => {
  const [navbarId, setnavbarId] = useAtom(KanbanSelectedButtonNumberState);

  const findmenuIndex =
    KANBAN_MENU.findIndex((menu) => menu.navTitle === value) + 1;

  const buttonClassName = "py-2 px-6 rounded-lg min-w-fit";

  const onClick = () => {
    setnavbarId(findmenuIndex.toString());
  };
  const isButtonSelected = navbarId === findmenuIndex.toString();

  return (
    <button
      className={cn(
        buttonClassName,
        isButtonSelected ? `bg-dark text-white` : `bg-white text-gray-400`
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default NavbarButton;
