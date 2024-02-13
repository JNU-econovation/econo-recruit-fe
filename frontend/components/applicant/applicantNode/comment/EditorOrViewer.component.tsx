import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { putComment } from "../../../../src/apis/comment/comment";

interface ApplicantCommentEditorOrViewerProps {
  content: string;
  isEdit?: boolean;
  commentId: string;
  setIsEdit: (isEdit: boolean) => void;
}

const ApplicantCommentEditorOrViewer = ({
  content: initContent,
  isEdit = false,
  commentId,
  setIsEdit,
}: ApplicantCommentEditorOrViewerProps) => {
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState(initContent);

  const { mutate } = useMutation(() => putComment({ commentId, content }));

  const onEdit = () => {
    setContent(editorRef.current?.getInstance().getMarkdown());
    mutate();
    setIsEdit(false);
  };

  useEffect(() => {
    if (editorRef.current) {
      document.querySelector(".toastui-editor-toolbar")?.remove();
      document.querySelector(".toastui-editor-mode-switch")?.remove();
      editorRef.current.getInstance().setMarkdown(initContent);
    }
  }, [isEdit]);

  return (
    <>
      {!isEdit ? (
        <Viewer
          className="text-sm"
          initialEditType="markdown"
          initialValue={content || ""}
        />
      ) : (
        <>
          <div className="my-4">
            <Editor
              className="w-full my-4 border-[1px] rounded border-[#DBDBDB] p-3 text-sm"
              height="6rem"
              initialEditType="markdown"
              usageStatistics={false}
              language="ko-KR"
              ref={editorRef}
            />
          </div>
          <button
            className="py-2 px-4 bg-slate-100 my-2 rounded-md border"
            onClick={onEdit}
          >
            수정완료
          </button>
        </>
      )}
    </>
  );
};

export default ApplicantCommentEditorOrViewer;
