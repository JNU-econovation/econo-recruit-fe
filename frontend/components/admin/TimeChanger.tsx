"use client";

import { useState } from "react";
import Txt from "@/components/common/Txt.component";
import LabeledInput from "@/components/common/LabeledInput.component";

const TimeChanger = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateFormatRegex = /^\d{4}-\d{1,2}-\d{1,2}-\d{2}-\d{2}-\d{2}$/;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isStartValid = dateFormatRegex.test(startDate);
    const isEndValid = dateFormatRegex.test(endDate);

    if (!isStartValid || !isEndValid) {
      alert("날짜 형식이 올바르지 않습니다. 예시: 2025-3-7-00-00-00");
      return;
    }

    // 여기에 실제 서버 전송 로직 또는 상태 업데이트 추가
    alert("유효한 입력입니다!");
  };

  return (
    <div className="mt-20">
      <Txt typography="h3">지원기간 변경</Txt>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-1/2"
        >
          <LabeledInput
            id="start"
            type="text"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            label="지원 시작시간"
            placeholder="2025-3-7-00-00-00"
          />
          <LabeledInput
            id="start"
            type="text"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            label="1차 합격자 발표"
            placeholder="2025-3-7-00-00-00"
          />
          <LabeledInput
            id="start"
            type="text"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            label="1차 합격자 논의 종료 기간"
            placeholder="2025-3-7-00-00-00"
          />
          <LabeledInput
            id="start"
            type="text"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            label="최종 합격자 논의 종료 기간"
            placeholder="2025-3-7-00-00-00"
          />
          <LabeledInput
            id="end"
            type="text"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            label="지원 종료시간"
            placeholder="2025-3-12-23-59-59"
          />
          {/* <button
            type="submit"
            className="-mb-16 w-[12rem] bg-slate-900 text-white px-6 py-4 rounded-md flex items-center justify-center"
          >
            변경하기
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default TimeChanger;
