"use client";

import AdminBoard from "@/components/admin/Board.component";
import AdminSearch from "@/components/admin/Search.component";
import SortListComponent from "@/components/common/SortList.component";
import { getAllInterviewer } from "@/src/apis/interview";
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

const orderMenu = [
  { type: "newest", string: "최신순" },
  { type: "name", string: "이름순" },
];

const AdminPage = ({
  searchParams: { type = "", order = "", page = "1" },
}: AdminPageProps) => {
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
    <div className="flex-1 ml-32 min-w-[46rem] mb-12">
      <div className="flex w-full justify-end gap-8 my-12">
        <AdminSearch />
        <SortListComponent sortList={orderMenu} selected={order} />
      </div>
      <AdminBoard />
    </div>
  );
};

export default AdminPage;