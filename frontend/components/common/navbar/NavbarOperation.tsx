"use client";

import { useQuery } from "@tanstack/react-query";
import CommonNavbarCell from "./NavbarCell";
import { getMyInfo } from "@/src/apis/interview";
import { usePathname } from "next/navigation";

export const NavbarOperation = () => {
  const currentPath = usePathname();
  const generation = currentPath.split("/")[2];
  const { data: userData } = useQuery(["user"], getMyInfo);
  if (!userData) {
    return <div></div>;
  }

  if (userData.role !== "ROLE_OPERATION") {
    return <div></div>;
  }

  return (
    <CommonNavbarCell
      item={{
        href: `/admin/${generation}`,
        short_title: "관리자",
        title: "관리자 페이지",
        target: "_self",
        type: "admin",
      }}
    />
  );
};
