import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "../../constants";

export interface ApplicantPaginationParams {
  pageIndex: string;
  order: string;
  searchKeyword: string;
}

const useApplicantPaginationParams: () => ApplicantPaginationParams = () => {
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") || ORDER_MENU.APPLICANT[0].type;
  const searchKeyword = searchParams.get("search") || "";

  return { pageIndex, order, searchKeyword };
};

export default useApplicantPaginationParams;
