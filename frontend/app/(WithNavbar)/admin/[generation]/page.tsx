import { dehydrate, Hydrate } from "@tanstack/react-query";
import AdminBoard from "@/components/admin/Board.component";
import AdminSearch from "@/components/admin/Search.component";
import SortList from "@/components/common/SortList";
import { ORDER_MENU } from "@/src/constants";
import { getInterviewer, getMyInfo } from "@/src/apis/interview";
import getQueryClient from "@/src/functions/getQueryClient";

interface AdminPageProps {
  searchParams: {
    order: (typeof ORDER_MENU.ADMIN)[number]["type"];
  };
}

const AdminPage = async ({ searchParams: { order } }: AdminPageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["interviewers"],
    queryFn: () => getInterviewer({ order }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getMyInfo,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <div className="flex-1 ml-32 min-w-[46rem] mb-12">
      <div className="flex w-full justify-end gap-8 my-12">
        <AdminSearch />
        <SortList sortList={ORDER_MENU.ADMIN} />
      </div>
      <Hydrate state={dehydrateState}>
        <AdminBoard />
      </Hydrate>
    </div>
  );
};

export default AdminPage;
