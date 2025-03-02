import Txt from "@/components/common/Txt.component";
import React from "react";

const QuestionSkeleton = () => {
  return (
    <article className="flex flex-col justify-between flex-[3_0_0] animate-pulse">
      <div>
        <Txt typography="h1" className="uppercase">
          ECONOVATION 신입모집 신청
        </Txt>
        <div className="my-6 h-1 bg-gray-300 w-full" />
        <div className="flex gap-8 pr-10">
          <div className="flex-1 rounded-md ">
            <div className="w-1/2 h-4 rounded-md p-4 bg-gray-100" />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className="w-full h-16 rounded-md p-4 bg-gray-100" />
            <div className="w-1/2 h-16 rounded-md p-4 bg-gray-100" />
            <div className="mt-4" />
            <div className="w-full h-16 rounded-md p-4 bg-gray-100" />
            <div className="w-1/3 h-16 rounded-md p-4 bg-gray-100" />
            <div className="mt-4" />
            <div className="w-full h-16 rounded-md p-4 bg-gray-100" />
            <div className="w-2/3 h-16 rounded-md p-4 bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="translate-x-[calc(100%+1.5rem)] w-[calc(50%-2.3rem)]">
        <div className="flex gap-2 my-4">
          <div className="flex-1 rounded-md flex justify-center items-center p-4 bg-gray-100 h-16" />
          <div className="flex-1 rounded-md flex justify-center items-center p-4 bg-gray-100 h-16" />
        </div>
      </div>
    </article>
  );
};

export default QuestionSkeleton;
