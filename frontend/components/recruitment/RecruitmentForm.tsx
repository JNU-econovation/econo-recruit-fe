"use client";

import { useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface RecruitmentFormProps {
  onSubmit: (data: {
    year: number;
    startDate: number;
    endDate: number;
  }) => void;
  isLoading: boolean;
}

export function RecruitmentForm({ onSubmit, isLoading }: RecruitmentFormProps) {
  const [generation, setGeneration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!generation || !startDate || !endDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    console.log(typeof startDate, typeof endDate);

    try {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      onSubmit({
        year: Number(generation),
        startDate: startTimestamp,
        endDate: endTimestamp,
      });
      setGeneration("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      alert("날짜 형식이 올바르지 않습니다.");
    }
  };

  return (
    <div className="w-full h-44 border border-[#ESE7EB] rounded-md p-4">
      <h3 className="text-sm mb-3">새로운 접수 기간 등록</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-3 mb-3">
          <div className="flex flex-col gap-2 w-1/3">
            <label htmlFor="generation" className="text-xs">
              기수
            </label>
            <input
              id="generation"
              type="text"
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              placeholder="기수"
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
            className="px-4 py-2 bg-[#2160FF] text-white text-xs rounded-md max-h-[30px]"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="s" /> : "등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
