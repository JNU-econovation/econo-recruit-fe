"use client";

import { FC, useState } from "react";
import ApplicantCommentInputForm from "./InputForm.component";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentById } from "@/src/apis/comment/comment";

interface ApplicantCommentProps {
  postId: string;
}

const ApplicantComment: FC<ApplicantCommentProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const onSubmit = () => {};

  const { data, error, isLoading } = useQuery(
    ["applicantComment", postId],
    () => getAllCommentById(postId),
    {
      enabled: !!postId,
    }
  );

  if (!data || isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="text-lg font-semibold">댓글</div>
          <div className="text-sm">{data.length}개</div>
        </div>
        <button>
          <img src="/icons/arrow.forward.circle.fill.svg" alt="" />
        </button>
      </div>
      <ApplicantCommentInputForm
        onChange={(value) => setComment(value)}
        onSubmit={onSubmit}
      />
      <div className="flex flex-col gap-8 pt-8">
        //TODO: comment
        {/* {data.map((comment) => (
          <ApplicantCommentDetail comment={comment} key={comment.createAt} />
        ))} */}
      </div>
    </>
  );
};

export default ApplicantComment;