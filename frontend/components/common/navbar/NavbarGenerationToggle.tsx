import { usePathname } from "next/navigation";
import CommonNavbarCell from "./NavbarCell";
import { CURRENT_GENERATION } from "@/src/constants";

export const NavbarGenerationToggle = () => {
  const currentPath = usePathname();
  const selectedGeneration = +currentPath.split("/")[2];

  const isCurrentGeneration = selectedGeneration === CURRENT_GENERATION;
  const generation = isCurrentGeneration
    ? CURRENT_GENERATION - 1
    : CURRENT_GENERATION;

  const short_title = isCurrentGeneration ? "지난 모집" : "현재 모집";
  const title = isCurrentGeneration
    ? "지난 신입모집 보기"
    : "현재 신입모집 보기";

  return (
    <CommonNavbarCell
      href={`/kanban/${generation}`}
      short_title={short_title}
      title={title}
      target="_self"
      type="toggle"
    />
  );
};
