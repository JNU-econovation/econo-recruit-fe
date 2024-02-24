"use client";

import AdminBoard from "@/components/admin/Board.component";
import AdminSearch from "@/components/admin/Search.component";
import SortListComponent from "@/components/common/SortList";
import CommonNavbar from "@/components/common/navbar/Navbar.component";
import { getAllInterviewer } from "@/src/apis/interview";
import { ORDER_MENU } from "@/src/constants";
import { useQuery } from "@tanstack/react-query";

interface AdminPageProps {
  params: {
    generation: string;
  };
  searchParams: {
    type: string;
    order: string;
    page: string;
  };
}

const AdminPage = ({
  params,
  searchParams: { type = "", order = "", page = "1" },
}: AdminPageProps) => {
  const { generation } = params;

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["interviewers"], () => getAllInterviewer());

  if (!userData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="px-24 w-max-[1280px] flex p-12">
      <CommonNavbar generation={generation} />
      <div className="flex-1 ml-32 min-w-[46rem] mb-12">
        <div className="flex w-full justify-end gap-8 my-12">
          <AdminSearch />
          <SortListComponent sortList={ORDER_MENU.ADMIN} selected={order} />
        </div>
        <AdminBoard />
      </div>
    </div>
  );
};

export default AdminPage;
