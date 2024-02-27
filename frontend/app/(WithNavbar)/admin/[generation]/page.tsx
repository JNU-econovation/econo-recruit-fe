"use client";

import AdminBoard from "@/components/admin/Board.component";
import AdminSearch from "@/components/admin/Search.component";
import SortList from "@/components/common/SortList";
import { getAllInterviewerWithOrder } from "@/src/apis/interview";
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
  } = useQuery(["interviewers"], () => getAllInterviewerWithOrder(order));

  if (!userData || isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="px-24 w-max-[1280px] flex p-12">
      <div className="flex-1 ml-32 min-w-[46rem] mb-12">
        <div className="flex w-full justify-end gap-8 my-12">
          <AdminSearch />
          <SortList sortList={ORDER_MENU.ADMIN} />
        </div>
        <AdminBoard />
      </div>
    </div>
  );
};

export default AdminPage;
