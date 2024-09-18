"use client";
import { MainNavbar } from "@/src/constants";
import CommonNavbarCell from "./NavbarCell";
import NavbarUserInfo from "./UserInfo";
import { NavbarOperation } from "./NavbarOperation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarGenerationToggle } from "./NavbarGenerationToggle";
import { NavbarManagePassState } from "./NavbarManagePassState";

const CommonNavbar = () => {
  const [_, currentType, generation] = usePathname().split("/");
  const isShort = currentType === "kanban";

  return (
    <nav className="flex flex-col transition-all">
      <Link
        className="flex flex-col font-bold h-36 justify-end text-4xl"
        href="/"
      >
        {!isShort && <div>ECONOVATION</div>}
        <div>RECRUIT</div>
        <div>{generation}th</div>
      </Link>
      <div className="flex flex-col gap-8 mt-8 text-xl">
        {MainNavbar(+generation).map((item) => (
          <CommonNavbarCell
            key={item.type}
            currentType={currentType}
            isShort={isShort}
            {...item}
          />
        ))}
        <NavbarGenerationToggle generation={generation} isShort={isShort} />
        <NavbarManagePassState currentType={currentType} isShort={isShort} />
        <NavbarOperation currentType={currentType} isShort={isShort} />
      </div>
      <NavbarUserInfo />
    </nav>
  );
};

export default CommonNavbar;
