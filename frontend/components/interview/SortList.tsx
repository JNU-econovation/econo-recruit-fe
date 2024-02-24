"use client";
import { useQueryClient } from "@tanstack/react-query";
import SortList from "../common/SortList";
import { useSearchParams } from "next/navigation";
import { ORDER_MENU } from "@/src/constants";

const InterviewSortList = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const pageIndex = searchParams.get("page") || "1";
  const order = searchParams.get("order") ?? "newest";

  const onOrderChange = () => {
    queryClient.invalidateQueries({
      queryKey: ["allApplicant", pageIndex, order],
    });
  };

  return (
    <SortList
      sortList={ORDER_MENU.INTERVIEW}
      selected={order}
      onChange={onOrderChange}
    />
  );
};

export default InterviewSortList;
