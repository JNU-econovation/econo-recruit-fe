"use client";

import { MainNavbar } from "@/src/constants";
import { useEffect, useState } from "react";
import CommonNavbarCellComponent from "./NavbarCell.component";
import NavbarUserInfo from "./UserInfo.component";
import { getMyInfo } from "@/src/apis/interview";
import { useQuery } from "@tanstack/react-query";

interface CommonNavbarProps {
  generation: string;
  isShort?: boolean;
}

const CommonNavbar = ({ generation, isShort = false }: CommonNavbarProps) => {
  const [currentPath, setCurrcurrentPath] = useState("");

  useEffect(() => {
    const currentUrl = document.location.pathname;
    setCurrcurrentPath(currentUrl.split("/")[1]);
  }, []);

  const { data: userData } = useQuery(["user"], () => getMyInfo());
  if (!userData) {
    return <div>loading...</div>;
  }

  return (
    <nav className="flex flex-col">
      <a className="font-bold text-4xl" href="/">
        {isShort ? "" : <div>ECONOVATION</div>}
        <div>RECRUIT</div>
        <div>{generation}th</div>
      </a>
      <div className="flex flex-col gap-8 mt-8 text-xl">
        {MainNavbar.map((item) => (
          <CommonNavbarCellComponent
            key={item.type}
            currentPath={currentPath}
            isShort={isShort}
            item={item}
          />
        ))}
        {userData.role === "ROLE_OPERATION" && (
          <CommonNavbarCellComponent
            currentPath={currentPath}
            isShort={isShort}
            item={{
              href: `/admin/${generation}`,
              short_title: "관리자",
              title: "관리자 페이지",
              target: "_self",
              type: "admin",
            }}
          />
        )}
      </div>
      <NavbarUserInfo />
    </nav>
  );
};

export default CommonNavbar;
