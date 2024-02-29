"use client";

import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/src/apis/comment";
import Icon from "@/components/common/Icon";
type InputCheckBoxProps = {
  name: string;
  id: string;
  title: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCheckBox = ({
  name,
  id,
  title,
  checked,
  onChange,
}: InputCheckBoxProps) => {
  return (
    <div className="flex items-center gap-2 text-sm font-normal my-2">
      <input
        className="accent-black"
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{title}</label>
    </div>
  );
};

interface ApplicantCommentInputFormProps {
  applicantId: string;
  commentLength: number;
  generation: string;
  cardId: number;
}

const ApplicantCommentInputForm = ({
  applicantId,
  commentLength,
  generation,
  cardId,
}: ApplicantCommentInputFormProps) => {
  const [isNocomment, setIsNocomment] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(false);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const editorRef = React.useRef<Editor>(null);

  const { mutate } = useMutation(
    () => {
      return postComment({
        content,
        applicantId,
        cardId,
        parentCommentId: 0,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["applicantComment", applicantId, cardId],
        });
        queryClient.invalidateQueries({
          queryKey: ["kanbanDataArray", generation],
        });
      },
    }
  );

  const onNocommentCheck = useCallback(() => {
    setIsNocomment(!isNocomment);
    if (editorRef.current) {
      editorRef.current
        .getInstance()
        .setMarkdown(isNocomment ? "" : "지인이므로 코멘트 삼가겠습니다.");
    }
  }, [isNocomment]);

  const isPrevSubmit = () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    if (!content) {
      alert("댓글을 입력해주세요.");
      return false;
    }

    const newContent = (hasQuestion ? "**[질문]** " : "") + content;
    setContent(newContent);
    return newContent;
  };

  const onSubmit = () => {
    const newContent = isPrevSubmit();
    if (newContent) {
      mutate();
      editorRef.current?.getInstance().reset();
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      document.querySelector(".toastui-editor-toolbar")?.remove();
      document.querySelector(".toastui-editor-mode-switch")?.remove();
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex justify-between items-center pb-2">
        <div className="flex gap-4 items-center">
          <div className="text-lg font-semibold">댓글</div>
          <div className="text-sm">{commentLength}개</div>
        </div>
        <button>
          <Icon icon="arrowForwardCircleFill" />
        </button>
      </div>
      <div className="py-4">
        <Editor
          className="w-full my-4 border-[1px] rounded border-secondary-100 p-3 text-sm"
          height="6rem"
          initialEditType="markdown"
          usageStatistics={false}
          language="ko-KR"
          onChange={() => {
            isNocomment &&
              editorRef.current?.getInstance().getMarkdown() !==
                "지인이므로 코멘트 삼가겠습니다." &&
              editorRef.current
                ?.getInstance()
                .setMarkdown("지인이므로 코멘트 삼가겠습니다.");
          }}
          ref={editorRef}
        />
      </div>
      {applicantId !== "" && (
        <div className="font-normal">
          <InputCheckBox
            name="question"
            id="question"
            title="질문드립니다."
            onChange={() => setHasQuestion((prev) => !prev)}
          />
          <InputCheckBox
            name="nocomment"
            id="nocomment"
            title="지인이므로 코멘트 삼가겠습니다."
            checked={isNocomment}
            onChange={onNocommentCheck}
          />
        </div>
      )}
    </form>
  );
};

export default ApplicantCommentInputForm;
