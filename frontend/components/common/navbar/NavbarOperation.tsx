"use client";

import { useQuery } from "@tanstack/react-query";
import CommonNavbarCell from "./NavbarCell";
import { getMyInfo } from "@/src/apis/interview";

interface NavbarOperationProps {
  generation: string;
  isShort?: boolean;
}

export const NavbarOperation = ({
  generation,
  isShort = false,
}: NavbarOperationProps) => {
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
