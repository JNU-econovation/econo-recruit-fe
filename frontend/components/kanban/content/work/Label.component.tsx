"use client";

import {
  WorkLabelReq,
  getWorkLabel,
  postWorkLabel,
} from "@/src/apis/work/work";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";

interface WorkLabelProps {
  cardId: number;
  generation: string;
}

const WorkLabel: FC<WorkLabelProps> = ({ cardId, generation }) => {
  const [openAdditional, setOpenAdditional] = useState(false);

  const { data, error, isLoading } = useQuery<WorkLabelReq[]>(
    ["workLabel", cardId],
    () => getWorkLabel(cardId),
    {
      enabled: !!cardId,
    }
  );

  if (!data || isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  const toggleOpen = () => {
    setOpenAdditional((prev) => !prev);
  };

  return (
    <div className="my-12">
      <div className="text-lg font-semibold">
        라벨링
        <span className="text-base font-normal ml-2">
          {data.filter((label) => label.active).length}개
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="grid grid-cols-6 gap-2 my-4 w-fit">
          {openAdditional
            ? data.map((label) => (
                <WorkLabelButton
                  generation={generation}
                  key={label.name}
                  label={label}
                  cardId={cardId}
                />
              ))
            : data
                .map((label) => (
                  <WorkLabelButton
                    generation={generation}
                    key={label.name}
                    label={label}
                    cardId={cardId}
                  />
                ))
                .slice(0, 6)}
        </div>
        <button
          onClick={toggleOpen}
          className={classNames(
            "text-primary bg-[#E8EFFF] translate-y-[2px] h-8 w-8 rounded-full flex items-center justify-center transition-all",
            { "rotate-45 ": openAdditional }
          )}
        >
          <img src="/icons/ellipsis.plus.blue.svg" alt="plus" />
        </button>
      </div>
    </div>
  );
};

interface WorkLabelButtonProps {
  label: WorkLabelReq;
  cardId: number;
  generation: string;
}

const WorkLabelButton: FC<WorkLabelButtonProps> = ({
  label,
  cardId,
  generation,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(postWorkLabel, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["workLabel", cardId] });
      queryClient.invalidateQueries({
        queryKey: ["kanbanDataArray", generation],
      });
    },
  });

  const onLabelClick = () => {
    mutate(cardId);
  };

  return (
    <button
      key={label.name}
      className={classNames(
        "py-1 px-4 rounded-full w-max",
        label.active
          ? "text-primary bg-[#E8EFFF]"
          : "text-secondary-200 bg-light"
      )}
      onClick={onLabelClick}
    >
      {label.name}
    </button>
  );
};

export default WorkLabel;
