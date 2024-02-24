"use client";
import { useQueryClient } from "@tanstack/react-query";
import SortListComponent from "../common/SortList";
import { useSearchParams } from "next/navigation";

const ApplicantSortList = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const orderMenu = [
    { type: "newest", string: "최신순" },
    { type: "name", string: "이름순" },
  ];
  const order = searchParams.get("order") ?? "newest";
  const pageIndex = searchParams.get("page") || "1";

  const onOrderChange = () => {
    queryClient.invalidateQueries({
      queryKey: ["allApplicant", pageIndex, order],
    });
  };

  return (
    <SortListComponent
      sortList={orderMenu}
      selected={order}
      onChange={onOrderChange}
    />
  );
};

export default ApplicantSortList;
