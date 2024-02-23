"use client";
import { getMyInfo } from "@/src/apis/interview/interviewer";
import { useQuery } from "@tanstack/react-query";
import Txt from "../Txt.component";
import LogoutBtn from "./LogoutBtn";

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
    return <div className="fixed bottom-12">loading...</div>;
  }

  if (isError) {
    return <div className="fixed bottom-12">error</div>;
  }

  const { name, role, year } = loggedInUserInfo;

  return (
    <div className="fixed bottom-12">
      <div>
        <Txt className="font-medium">{name}</Txt>
        <LogoutBtn />
      </div>
      <div>
        <Txt className="text-secondary-200">
          {`${year}기 | ${roleTranslater(role)}`}
        </Txt>
      </div>
    </div>
  );
};

export default NavbarUserInfo;
