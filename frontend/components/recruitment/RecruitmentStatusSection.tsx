"use client";

import { RecruitmentResponse } from "@/src/apis/recruitment";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  findCurrentRecruitment,
  filterPreviousRecruitments,
} from "@/src/functions/recruitment";
import { Pagination } from "../common/Pagination";

interface RecruitmentStatusSectionProps {
  recruitments: RecruitmentResponse[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onCancel: () => void;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isCancelLoading: boolean;
}

export function RecruitmentStatusSection({
  recruitments,
  currentPage,
  totalPages,
  totalCount,
  onCancel,
  onPageChange,
  isLoading,
  isCancelLoading,
}: RecruitmentStatusSectionProps) {
  const currentRecruitment = findCurrentRecruitment(recruitments);
  const previousRecruitments = filterPreviousRecruitments(recruitments);

  return (
    <div className="w-full bg-[#F9FAFB] rounded-md p-4 border border-[#ESE7EB]">
      <h3 className="text-sm mb-3">현재 접수 기간</h3>

      {currentRecruitment ? (
        <>
          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
              <h4 className="text-xs">년도</h4>
              <h3 className="text-base font-semibold">
                {new Date(currentRecruitment.startAt).getFullYear()}
              </h3>
            </div>
            <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
              <h4 className="text-xs">시작일</h4>
              <h3 className="text-base font-semibold">
                {new Date(currentRecruitment.startAt).toLocaleString("ko-KR")}
              </h3>
            </div>
            <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
              <h4 className="text-xs">종료일</h4>
              <h3 className="text-base font-semibold">
                {new Date(currentRecruitment.endAt).toLocaleString("ko-KR")}
              </h3>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onCancel}
              className="px-8 py-2 bg-[#2160FF] text-white text-xs rounded-md max-h-[30px]"
              disabled={isCancelLoading}
            >
              {isCancelLoading ? <LoadingSpinner size="s" /> : "취소하기"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white w-full rounded-sm border border-[#ESE7EB] py-4 px-3 mb-3">
          <div className="flex items-center justify-center h-16">
            <p className="text-gray-500 text-sm">현재 접수기간이 없습니다</p>
          </div>
        </div>
      )}

      {/* 이전 접수 기간 */}
      <h3 className="text-sm mb-3">이전 접수 기간</h3>
      <div className="flex flex-col gap-3">
        {previousRecruitments.length > 0 ? (
          previousRecruitments.map((recruitment) => (
            <div
              key={recruitment.recruitmentId}
              className="bg-white w-full rounded-md h-14 border border-[#ESE7EB] py-2 px-3"
            >
              <h4 className="text-xs">기간</h4>
              <h3 className="text-base">
                {new Date(recruitment.startAt).toLocaleDateString("ko-KR")} ~{" "}
                {new Date(recruitment.endAt).toLocaleDateString("ko-KR")}
              </h3>
            </div>
          ))
        ) : (
          <div className="bg-white w-full rounded-md h-14 border border-[#ESE7EB] py-2 px-3">
            <h4 className="text-xs">기간</h4>
            <h3 className="text-base">이전 접수 기간이 없습니다</h3>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
