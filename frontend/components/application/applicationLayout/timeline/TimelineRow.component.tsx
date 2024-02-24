"use client";

import Txt from "@/components/common/Txt.component";
import { minimumIntegerDigits } from "@/src/functions/replacer";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import { cn } from "@/src/utils/cn";

interface TimelineRowProps {
  date: Date;
  isLast: boolean;
  index: number;
}

const TimelineRow = ({ date, isLast, index }: TimelineRowProps) => {
  const dateString = `${minimumIntegerDigits(
    date.getHours(),
    2
  )}:${minimumIntegerDigits(date.getMinutes(), 2)}`;
  const [timeline, setTimeline] = useLocalStorage<number[]>("timeline", []);

  return (
    <span className="flex-1 border-l border-gray-300 translate-x-6 mb-8">
      <Txt
        className={cn("-translate-x-1/2 block w-fit -translate-y-6 h-2", {
          "opacity-0": minimumIntegerDigits(date.getMinutes(), 2) === "30",
        })}
      >
        {dateString}
      </Txt>
      {isLast && (
        <>
          <input
            type="checkbox"
            name="timeline"
            className="hidden peer"
            id={date.getTime().toString()}
            checked={timeline.includes(index)}
            onChange={() =>
              setTimeline((prev) => {
                if (prev.includes(index)) {
                  const filtered = new Set(prev);
                  filtered.delete(index);
                  return Array.from(filtered);
                }
                const filtered = new Set([...prev, index]);
                return Array.from(filtered);
              })
            }
          />
          <label
            htmlFor={date.getTime().toString()}
            className="h-8 block peer-checked:bg-primary bg-light"
          ></label>
        </>
      )}
    </span>
  );
};

export default TimelineRow;
