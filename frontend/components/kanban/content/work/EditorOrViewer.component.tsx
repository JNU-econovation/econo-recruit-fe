import { Viewer, Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Work, putWork } from "@/src/apis/work";

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
  const viwerRef = useRef<Viewer>(null);
  const [content, setContent] = useState(initContent);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => putWork({ cardId, content }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["work"],
        refetchType: "active",
      }),
  });

  const onEdit = () => {
    setContent(editorRef.current?.getInstance().getMarkdown());
    setIsEdit(false);
    mutate();
  };

  useEffect(() => {
    if (editorRef.current) {
      document.querySelector(".toastui-editor-toolbar")?.remove();
      document.querySelector(".toastui-editor-mode-switch")?.remove();
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [isEdit]);

  useEffect(() => {
    setContent(initContent);
    viwerRef.current?.getInstance().setMarkdown(initContent);
  }, [initContent]);

  return (
    <>
      {!isEdit ? (
        <Viewer
          className="text-sm"
          initialEditType="markdown"
          initialValue={content || ""}
          ref={viwerRef}
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
