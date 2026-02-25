"use client";

import {
  getCommentsDisclosure,
  postCommentsDisclosure,
} from "@/src/apis/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["comments-disclosure"];

export default function CommentsDisclosurePage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    QUERY_KEY,
    getCommentsDisclosure
  );

  const { mutate: updateDisclosure, isLoading: isUpdating } = useMutation(
    postCommentsDisclosure,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: () => {
        alert("댓글 공개 상태 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
      },
    }
  );

  if (isLoading) {
    return <div className="mt-10">로딩중...</div>;
  }

  if (isError || data === undefined) {
    return <div className="mt-10">에러 발생</div>;
  }

  const nextDisclosure = !data;

  return (
    <section className="mt-10 flex flex-col gap-4 max-w-xl">
      <h2 className="text-xl font-semibold">댓글 전체 공개 상태 관리</h2>
      <div className="rounded-lg border p-6 flex items-center justify-between">
        <div className="text-lg font-medium">
          현재 상태:{" "}
          <span className={data ? "text-primary" : "text-gray-500"}>
            {data ? "활성화" : "비활성화"}
          </span>
        </div>
        <button
          type="button"
          className={`rounded-md text-white px-4 py-2 disabled:bg-gray-300 ${
            nextDisclosure
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
          onClick={() => updateDisclosure(nextDisclosure)}
          disabled={isUpdating}
        >
          {nextDisclosure ? "활성화" : "비활성화"}
        </button>
      </div>
    </section>
  );
}
