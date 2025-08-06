"use client";

import {
  deleteRecruitmentTime,
  getRecruitmentTime,
  postRecruitmentTime,
  RecruitmentListResponse,
} from "@/src/apis/recruitment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const queryClient = useQueryClient();

  const createRecruitmentMutation = useMutation({
    mutationFn: postRecruitmentTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentTime"] });
      setYear("");
      setStartDate("");
      setEndDate("");
      alert("모집 시간이 등록되었습니다.");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        alert("500에러");
      } else {
        alert("모집 시간 등록에 실패했습니다.");
      }
    },
  });

  const deleteRecruitmentMutation = useMutation({
    mutationFn: deleteRecruitmentTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentTime"] });
      alert("모집이 취소되었습니다.");
    },
    onError: () => {
      alert("모집 취소에 실패했습니다.");
    },
  });

  const { data: recruitmentData, isLoading } =
    useQuery<RecruitmentListResponse>({
      queryKey: ["recruitmentTime"],
      queryFn: () => getRecruitmentTime(1),
    });

  console.log(recruitmentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !startDate || !endDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      createRecruitmentMutation.mutate({
        year: Number(year),
        startDate: startTimestamp,
        endDate: endTimestamp,
      });
    } catch (error) {
      alert("날짜 형식이 올바르지 않습니다.");
    }
  };

  const handleCancel = () => {
    const currentRecruitment = recruitmentData?.responses.find(
      (r) => r.states === "ACTIVE" || "NON_START"
    );
    if (currentRecruitment) {
      deleteRecruitmentMutation.mutate(
        currentRecruitment.recruitmentId.toString()
      );
    }
  };

  const currentRecruitment = recruitmentData?.responses.find(
    (r) => r.states === "ACTIVE" || "NON_START"
  );
  console.log(currentRecruitment);

  const previousRecruitments =
    recruitmentData?.responses.filter((r) => r.states === "END") || [];
  return (
    <div className="flex flex-col gap-6">
      {/* 접수기간 표시 컴포넌트 */}
      <div className="w-full bg-[#F9FAFB] rounded-md p-4 mt-10 border border-[#ESE7EB]">
        <h3 className="text-sm mb-3">현재 접수 기간</h3>
        <div className="flex justify-between items-center gap-3 mb-3">
          <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
            <h4 className="text-xs">년도</h4>
            <h3 className="text-base font-semibold">
              {currentRecruitment
                ? new Date(currentRecruitment.startAt).getFullYear()
                : "-"}
            </h3>
          </div>
          <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
            <h4 className="text-xs">시작일</h4>
            <h3 className="text-base font-semibold">
              {currentRecruitment
                ? new Date(currentRecruitment.startAt).toLocaleString("ko-KR")
                : "-"}
            </h3>
          </div>
          <div className="h-16 bg-white w-1/3 rounded-sm border border-[#ESE7EB] py-2 px-3">
            <h4 className="text-xs">종료일</h4>
            <h3 className="text-base font-semibold">
              {currentRecruitment
                ? new Date(currentRecruitment.endAt).toLocaleString("ko-KR")
                : "-"}
            </h3>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="px-8 py-2 bg-[#2160FF] text-white text-xs rounded-md"
            disabled={!currentRecruitment}
          >
            취소하기
          </button>
        </div>
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
      </div>
      {/* 새로운 접수 기간 등록 컴포넌트 */}
      <div className="w-full h-44 border border-[#ESE7EB] rounded-md p-4">
        <h3 className="text-sm mb-3">새로운 접수 기간 등록</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="flex flex-col gap-2 w-1/3">
              <label htmlFor="year" className="text-xs">
                년도
              </label>
              <input
                id="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="년도"
                className="text-sm px-2 border boder-[#D1D5DB] rounded-md h-8"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label htmlFor="startDate" className="text-xs">
                시작일
              </label>
              <input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm px-2 border boder-[#D1D5DB] rounded-md h-8"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label htmlFor="endDate" className="text-xs">
                종료일
              </label>
              <input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm px-2 border boder-[#D1D5DB] rounded-md h-8"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#2160FF] text-white text-xs rounded-md"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
