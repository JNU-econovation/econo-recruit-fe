"use client";

import {
  applicationDataAtom,
  applicationIndexAtom,
  applicationNavbarAtom,
} from "@/src/stores/application";
import { useAtom, useAtomValue } from "jotai";
import Txt from "@/components/common/Txt.component";
import { cn } from "@/src/utils/cn";
import { getApplicationNames } from "@/src/functions/getApplication";
import { localStorage } from "@/src/functions/localstorage";

interface ApplicationNavbarProps {
  className?: string;
}

const ApplicationNavbar = ({ className }: ApplicationNavbarProps) => {
  const [applicationIndex, setApplicationIndex] = useAtom(applicationIndexAtom);
  const applicationNavbar = useAtomValue(applicationNavbarAtom);
  const applicationData = useAtomValue(applicationDataAtom);

  const onNavbarClick = (id: number) => {
    // const applicationName = Array.from({ length: id - 1 }, (_, i) =>
    //   Array.from(getApplicationNames(applicationData[i].nodes))
    // ).flat();
    // if (!canApplicationNext(applicationName)) return;

    setApplicationIndex(id - 1);
  };

  const checkIsWritten = (id: number) => {
    const applicationName = getApplicationNames(applicationData[id - 1].nodes);
    const keys = Array.from(applicationName);

    return keys.every((key) => {
      const value = localStorage.get(key, "");
      return value !== "";
    });
  };

  return (
    <nav className="pl-12 w-full h-full flex-1">
      {applicationNavbar.map(({ id, title }, index) => (
        <button
          className={"text-left p-4 relative"}
          onClick={() => onNavbarClick(id)}
          key={id}
        >
          {/* 마지막 선은 그리지 않기 */}
          {index !== applicationNavbar.length - 1 && (
            <div
              className={cn(
                "absolute border-l-2 h-full -left-[13px] top-8 -z-10 transition-all",
                applicationIndex > id - 1 ? "border-black" : "border-gray-300"
              )}
            />
          )}
          <div
            className={cn(
              "before:h-2 before:w-2 before:rounded-full before:absolute before:translate-y-full before:-translate-x-8 transition-all",
              id <= applicationIndex + 1
                ? "before:bg-black text-black"
                : "before:bg-gray-300 text-gray-300"
            )}
          >
            <Txt
              className={cn(
                "transition-all",
                checkIsWritten(id)
                  ? "before:bg-black text-black"
                  : "before:bg-gray-300 text-gray-300"
              )}
            >
              {title}
            </Txt>
          </div>
        </button>
      ))}
    </nav>
  );
};

export default ApplicationNavbar;
