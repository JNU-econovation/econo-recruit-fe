import { Viewer, Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { putWork } from "@/src/apis/work";

interface WorkEditorOrViewerProps {
  content: string;
  isEdit?: boolean;
  cardId: number;
  setIsEdit: (isEdit: boolean) => void;
}

const WorkEditorOrViewer = ({
  content: initContent,
  isEdit = false,
  cardId,
  setIsEdit,
}: WorkEditorOrViewerProps) => {
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState(initContent);

  const { mutate } = useMutation(() => putWork({ cardId, content }));

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
              className="w-full my-4 border-[1px] rounded border-secondary-100 p-3 text-sm"
              height="24rem"
              initialEditType="markdown"
              usageStatistics={false}
              language="ko-KR"
              ref={editorRef}
            />
          </div>
          <button
            className="py-2 px-4 bg-slate-100 my-2 rounded-md"
            onClick={onEdit}
          >
            수정완료
          </button>
        </>
      )}
    </>
  );
};

export default WorkEditorOrViewer;
