import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLocations, putColumnsLocations } from "@/src/apis/kanban";
import { DropResult } from "@hello-pangea/dnd";
import { KanbanColumnData } from "../stores/kanban/Kanban.atoms";
import {
  getFromToIndexColumn,
  getFromToIndexDefault,
} from "../functions/kanban";
import { useAtom } from "jotai";
import { KanbanSelectedButtonNumberState } from "../stores/kanban/Navbar.atoms";

const useDragDrop = () => {
  const queryClient = useQueryClient();
  const [navbarId] = useAtom(KanbanSelectedButtonNumberState);

  const { mutate: relocation } = useMutation(postLocations, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", navbarId],
      });
    },
  });

  const { mutate: relocationColumn } = useMutation(putColumnsLocations, {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", navbarId],
      });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const kanbanData = queryClient.getQueryData<KanbanColumnData[]>([
      "kanbanDataArray",
      navbarId,
    ]) as KanbanColumnData[];

    if (result.type === "card") {
      relocationColumn(getFromToIndexColumn(kanbanData, result));
    }
    if (result.type === "DEFAULT") {
      relocation(getFromToIndexDefault(kanbanData, result));
    }
  };
  // getMovedKanbanData(kanbanData, result);
  return { onDragEnd };
};

export default useDragDrop;
