"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getRecruitmentTime,
  RecruitmentListResponse,
} from "@/src/apis/recruitment";

export const useRecruitmentData = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: recruitmentData,
    isLoading,
    error,
  } = useQuery<RecruitmentListResponse>({
    queryKey: ["recruitmentTime", currentPage],
    queryFn: () => getRecruitmentTime(currentPage),
  });

  const recruitments = recruitmentData?.responses || [];
  const pageInfo = recruitmentData?.pageInfo;

  const totalPages = pageInfo?.endPage || 1;
  const totalCount = pageInfo?.listCount || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    recruitments,
    currentPage,
    totalPages,
    totalCount,
    pageInfo,
    isLoading,
    error,
    handlePageChange,
  };
};
