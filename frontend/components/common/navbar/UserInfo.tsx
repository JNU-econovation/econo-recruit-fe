"use client";

import { getMyInfo } from "@/src/apis/interview";
import { useQuery } from "@tanstack/react-query";
import econoLogo from "@/public/images/econo-3d-logo.png";
import Txt from "../Txt.component";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";

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

  const renderContent = (content: React.ReactNode) => (
    <div className="group flex items-center">
      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
        <Image
          src={econoLogo}
          alt="econo-Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="ml-2 transition-all duration-300 ease-in-out opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
        {content}
      </div>
    </div>
  );

  if (!loggedInUserInfo || isLoading) {
    return (
      <div className="fixed bottom-12">
        {renderContent(
          <div className="bg-white shadow-md rounded-lg p-2 text-sm">
            loading...
          </div>
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed bottom-12">
        {renderContent(
          <div className="bg-white shadow-md rounded-lg p-2 text-sm">error</div>
        )}
      </div>
    );
  }

  const { name, role, year } = loggedInUserInfo;

  return (
    <div className="fixed bottom-12">
      {renderContent(
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
      )}
    </div>
  );
};

export default NavbarUserInfo;
