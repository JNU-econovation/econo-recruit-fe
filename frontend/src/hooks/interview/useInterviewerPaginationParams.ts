import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "../../constants";

const useInterviewerPaginationParams = () => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") || ORDER_MENU.INTERVIEW[0].type;
  const searchKeyword = searchParams.get("search") || "";
  const type = searchParams.get("type") ?? "list";

  return { pageIndex, order, searchKeyword, type };
};

export default useInterviewerPaginationParams;
