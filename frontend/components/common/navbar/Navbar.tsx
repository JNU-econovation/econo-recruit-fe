"use client";
import { MainNavbar } from "@/src/constants";
import CommonNavbarCell from "./NavbarCell";
import NavbarUserInfo from "./UserInfo";
import { NavbarOperation } from "./NavbarOperation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarGenerationToggle } from "./NavbarGenerationToggle";

const CommonNavbar = () => {
  const currentPath = usePathname();
  const isShort = currentPath.split("/")[1] === "kanban";
  const generation = currentPath.split("/")[2];

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
          <CommonNavbarCell key={item.type} item={item} />
        ))}
        <NavbarGenerationToggle />
        <NavbarOperation />
      </div>
      <NavbarUserInfo />
    </nav>
  );
};

export default CommonNavbar;
