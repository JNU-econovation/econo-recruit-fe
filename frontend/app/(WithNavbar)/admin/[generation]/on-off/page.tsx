"use client";

import { RecruitmentStatusSection } from "@/components/recruitment/RecruitmentStatusSection";
import { RecruitmentForm } from "@/components/recruitment/RecruitmentForm";
import { useRecruitmentMutations } from "@/src/hooks/useRecruitmentMutations";
import { findCurrentRecruitment } from "@/src/functions/recruitment";
import { useRecruitmentData } from "@/src/hooks/useRecruitmentData";

export default function Page() {
  const {
    createRecruitmentMutation,
    deleteRecruitmentMutation,
    handleCreateRecruitment,
    handleDeleteRecruitment,
  } = useRecruitmentMutations();

  const {
    recruitments,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    handlePageChange,
  } = useRecruitmentData();

  const currentRecruitment = findCurrentRecruitment(recruitments);

  const handleCancel = () => {
    if (!currentRecruitment) {
      alert("현재 진행 중인 모집이 없습니다.");
      return;
    }

    handleDeleteRecruitment(currentRecruitment.recruitmentId.toString());
  };

  const handleFormSubmit = (data: {
    year: number;
    startDate: number;
    endDate: number;
  }) => {
    handleCreateRecruitment(data);
  };

  return (
    <div className="flex flex-col gap-6 mt-10">
      <RecruitmentStatusSection
        recruitments={recruitments}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onCancel={handleCancel}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isCancelLoading={deleteRecruitmentMutation.isLoading}
      />

      <RecruitmentForm
        onSubmit={handleFormSubmit}
        isLoading={createRecruitmentMutation.isLoading}
      />
    </div>
  );
}
