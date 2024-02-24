"use client";
import { useQueryClient } from "@tanstack/react-query";
import SortListComponent from "../common/SortList.component";
import { useSearchParams } from "next/navigation";

const ApplicantSortList = () => {
  const queryClient = useQueryClient();
  const searchParmas = useSearchParams();
  const orderMenu = [
    { type: "newest", string: "최신순" },
    { type: "name", string: "이름순" },
  ];
  const order = searchParmas.get("order") ?? "newest";
  const pageIndex = searchParmas.get("page") || "1";

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
