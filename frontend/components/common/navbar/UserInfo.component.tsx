import { getMyInfo } from "@/src/apis/interview";
import { useQuery } from "@tanstack/react-query";
import Txt from "../Txt.component";

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
  const { data, isLoading, isError } = useQuery(["user"], () => getMyInfo());

  if (!data || isLoading) {
    return <div className="fixed bottom-12">loading...</div>;
  }

  if (isError) {
    return <div className="fixed bottom-12">error</div>;
  }

  return (
    <div className="fixed bottom-12">
      <div>
        <Txt className="font-medium">{data.name}</Txt>
      </div>
      <div>
        <Txt className="text-secondary-200">
          {`${data.year}기 | ${roleTranslater(data.role)}`}{" "}
        </Txt>
      </div>
    </div>
  );
};

export default NavbarUserInfo;
