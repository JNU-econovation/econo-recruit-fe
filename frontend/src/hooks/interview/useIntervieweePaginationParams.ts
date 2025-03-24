import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "../../constants";

// TODO: ApplicantPaginationParams와 같은 타입임.
export interface IntervieweePaginationParams {
  pageIndex: string;
  order: string;
  searchKeyword: string;
}

const useIntervieweePaginationParams: () => IntervieweePaginationParams =
  () => {
    const searchParams = useSearchParams();
    const pageIndex = searchParams.get("page") || "1";
    const order = searchParams.get("order") || ORDER_MENU.INTERVIEW[0].type;
    const searchKeyword = searchParams.get("search") || "";

    return { pageIndex, order, searchKeyword };
  };

export default useIntervieweePaginationParams;
