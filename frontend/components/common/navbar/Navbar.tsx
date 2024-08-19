"use client";
import { MainNavbar } from "@/src/constants";
import CommonNavbarCell from "./NavbarCell";
import NavbarUserInfo from "./UserInfo";
import { NavbarOperation } from "./NavbarOperation";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CommonNavbarProps {
  generation: string;
}

const CommonNavbar = ({ generation }: CommonNavbarProps) => {
  const currentPath = usePathname().split("/")[1];
  const isShort = currentPath === "kanban";

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
        {MainNavbar.map((item) => (
          <CommonNavbarCell key={item.type} item={item} />
        ))}
        <NavbarOperation generation={generation} />
      </div>
      <NavbarUserInfo />
    </nav>
  );
};

export default CommonNavbar;
