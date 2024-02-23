"use client";

import { KANBAN_MENU } from "@/src/constants/kanban/26";
import { KanbanSelectedButtonNumberState } from "@/src/stores/kanban/Navbar.atoms";
import { useAtom } from "jotai";

type NavbarButtonProps = {
  value: string;
};

const NavbarButton = ({ value }: NavbarButtonProps) => {
  const [navbarId, setnavbarId] = useAtom(KanbanSelectedButtonNumberState);

  const findmenuIndex =
    KANBAN_MENU.findIndex((menu) => menu.navTitle === value) + 1;

  const buttonClassName = " py-2 px-6 rounded-lg min-w-fit ";

  const onClick = () => {
    setnavbarId(findmenuIndex.toString());
  };

  return (
    <button
      className={
        findmenuIndex.toString() === navbarId
          ? `bg-dark text-white${buttonClassName}`
          : `bg-white text-gray-400${buttonClassName}`
      }
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default NavbarButton;
