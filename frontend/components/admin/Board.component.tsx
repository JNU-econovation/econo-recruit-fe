"use client";

import {
  InterviewerReq,
  getAllInterviewer,
  getMyInfo,
  putInterviewer,
} from "@/src/apis/interview/interviewer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Txt from "../common/Txt.component";
import { cn } from "@/src/utils/cn";
import { roleKeys, roleMap, roleUpdateMap } from "@/src/constants/admin";

const roleTranslater = (role: keyof typeof roleMap) => roleMap[role];

interface InterViewerUpdateButtonProps {
  role: keyof typeof roleMap;
  user: InterviewerReq;
}

const InterViewerUpdateButton = ({
  role,
  user,
}: InterViewerUpdateButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["updateRole"],
    () => putInterviewer({ id: user.id, role: roleUpdateMap[role] }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["interviewers"]);
      },
    }
  );
  return (
    <button
      onClick={() => {
        mutate();
      }}
      className={cn(
        "py-2 w-[6rem] rounded-md",
        user.role === role
          ? "bg-primary-300 text-primary"
          : "bg-light text-secondary-100"
      )}
    >
      {roleTranslater(role)}
    </button>
  );
};

const AdminBoard = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["interviewers"], () => getAllInterviewer());

  const {
    data: myInfo,
    isLoading: myInfoLoading,
    isError: myInfoError,
  } = useQuery(["user"], () => getMyInfo());

  if (!userData || isLoading || myInfoLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || myInfoError || myInfo.role !== "ROLE_OPERATION") {
    return <div>에러 발생</div>;
  }

  return (
    <section className="flex flex-col">
      <div className="border-b mb-4">
        <div className="flex py-4 justify-between">
          <Txt
            typography="h6"
            className="flex-[1_0_0] text-left text-secondary-100"
          >
            Member Name
          </Txt>
          <Txt className="flex-[2_0_0] text-left text-secondary-100">기수</Txt>
          <Txt className="w-[28.5rem] text-left text-secondary-100">Status</Txt>
        </div>
      </div>
      {userData.map((user, index) => (
        <div className="flex py-4 justify-between" key={index}>
          <Txt typography="h6" className="flex-[1_0_0] text-left truncate">
            {user.name}
          </Txt>
          <Txt className="flex-[2_0_0] text-left truncate">{`${user.year}기`}</Txt>
          <div className="flex gap-6">
            {roleKeys.map((role, index) => (
              <InterViewerUpdateButton role={role} user={user} key={index} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminBoard;
