import { KANBAN_MENU, KanbanMenu } from "@/src/constants/kanban/28";
import NavbarButton from "../common/navbar/Button";

const KanbanNavbar = () => {
  return (
    <>
      {KANBAN_MENU.map((menu: KanbanMenu) => (
        <NavbarButton key={menu.id} value={menu.navTitle} />
      ))}
    </>
  );
};

export default KanbanNavbar;
