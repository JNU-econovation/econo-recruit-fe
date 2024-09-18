"use client";

import { useQuery } from "@tanstack/react-query";
import CommonNavbarCell from "./NavbarCell";
import { getMyInfo } from "@/src/apis/interview";
import { usePathname } from "next/navigation";

type NavbarManagePassStateProps = {
  isShort: boolean;
  currentType: string;
};
export const NavbarManagePassState = ({
  currentType,
  isShort,
}: NavbarManagePassStateProps) => {
  const currentPath = usePathname();
  const generation = currentPath.split("/")[2];
  const { data: userData, isLoading } = useQuery(["user"], getMyInfo);
  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  if (userData.role !== "ROLE_OPERATION") {
    return <div>관리자만 접근이 가능합니다.</div>;
  }

  return (
    <CommonNavbarCell
      currentType={currentType}
      isShort={isShort}
      href={`/pass-state/${generation}`}
      short_title="합/불 관리"
      title="합/불 상태 관리"
      target="_self"
      type="pass-state"
    />
  );
};
