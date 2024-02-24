"use client";
import { useQueryClient } from "@tanstack/react-query";
import SortListComponent from "../common/SortList";
import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "@/src/constants";

const ApplicantSortList = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const order = searchParams.get("order") ?? "newest";
  const pageIndex = searchParams.get("page") || "1";

  const onOrderChange = () => {
    queryClient.invalidateQueries({
      queryKey: ["allApplicant", pageIndex, order],
    });
  };

  return (
    <SortListComponent
      sortList={ORDER_MENU.APPLICANT}
      selected={order}
      onChange={onOrderChange}
    />
  );
};

export default ApplicantSortList;
