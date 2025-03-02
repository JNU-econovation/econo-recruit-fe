"use client";

import { getMyInfo } from "@/src/apis/interview";
import { useQuery } from "@tanstack/react-query";
import Txt from "../Txt.component";
import LogoutBtn from "./LogoutBtn";
import ProfileHoverCard from "./ProfileHoverCard";

const roleTranslater = (role: keyof typeof roleMap) => {
  const roleMap = {
    ROLE_PRESIDENT: "회장단",
    ROLE_OPERATION: "관리자",
    ROLE_TF: "TF",
    ROLE_GUEST: "게스트",
  };
  return roleMap[role];
};

const NavbarUserInfo = () => {
  const {
    data: loggedInUserInfo,
    isLoading,
    isError,
  } = useQuery(["user"], () => getMyInfo());

  if (!loggedInUserInfo || isLoading) {
    return (
      <div className="fixed bottom-12">
        <ProfileHoverCard>
          <div className="bg-white shadow-md rounded-lg p-2 text-sm">
            loading...
          </div>
        </ProfileHoverCard>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed bottom-12">
        <ProfileHoverCard>
          <div className="bg-white shadow-md rounded-lg p-2 text-sm">error</div>
        </ProfileHoverCard>
      </div>
    );
  }

  const { name, role, year } = loggedInUserInfo;

  return (
    <div className="fixed bottom-12">
      <ProfileHoverCard>
        <div className="bg-white shadow-md rounded-lg px-3 py-2">
          <div className="flex items-center justify-between">
            <Txt className="font-medium">{name}</Txt>
            <LogoutBtn />
          </div>
          <div>
            <Txt className="text-secondary-200 text-sm">
              {`${year}기 | ${roleTranslater(role)}`}
            </Txt>
          </div>
        </div>
      </ProfileHoverCard>
    </div>
  );
};

export default NavbarUserInfo;
