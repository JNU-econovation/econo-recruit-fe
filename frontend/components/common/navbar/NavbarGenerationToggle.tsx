import CommonNavbarCell from "./NavbarCell";
import { CURRENT_GENERATION } from "@/src/constants";

type NavbarGenerationToggleProps = {
  generation: string;
  isShort: boolean;
};
export const NavbarGenerationToggle = ({
  generation,
  isShort,
}: NavbarGenerationToggleProps) => {
  const isCurrentGeneration = +generation === CURRENT_GENERATION;
  const targetGeneration = isCurrentGeneration
    ? CURRENT_GENERATION - 1
    : CURRENT_GENERATION;

  const short_title = isCurrentGeneration ? "지난 모집" : "현재 모집";
  const title = isCurrentGeneration
    ? "지난 신입모집 보기"
    : "현재 신입모집 보기";

  return (
    <CommonNavbarCell
      currentType="kanban"
      isShort={isShort}
      href={`/kanban/${targetGeneration}`}
      short_title={short_title}
      title={title}
      type="toggle"
    />
  );
};
