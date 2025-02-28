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
import { useApplication } from "@/src/hooks/useApplication";

interface ApplicationNavbarProps {
  generation: string;
  className?: string;
}

const ApplicationNavbar = ({
  generation,
  className,
}: ApplicationNavbarProps) => {
  const [applicationIndex, setApplicationIndex] = useAtom(applicationIndexAtom);
  const applicationNavbar = useAtomValue(applicationNavbarAtom);
  const applicationData = useAtomValue(applicationDataAtom);
  const { canApplicationNext } = useApplication();

  const onNavbarClick = (id: number) => {
    const applicationName = Array.from({ length: id - 1 }, (_, i) =>
      Array.from(getApplicationNames(applicationData[i].nodes))
    ).flat();
    if (!canApplicationNext(applicationName)) {
      return;
    }
    setApplicationIndex(id - 1);
  };

  return (
    <nav className={cn("pl-12 w-full h-full", className)}>
      {applicationNavbar.map((navItem, index) => (
        <button
          className={"text-left p-4 relative w-full"}
          onClick={() => onNavbarClick(navItem.id)}
          key={navItem.id}
        >
          {/* 마지막 선은 그리지 않기 */}
          {index !== applicationNavbar.length - 1 && (
            <div
              className={cn(
                "absolute border-l-2 h-full -left-[13px] top-8 -z-10",
                applicationIndex > navItem.id - 1
                  ? "border-black"
                  : "border-gray-300"
              )}
            ></div>
          )}
          <Txt
            className={cn(
              "relative transition-all before:h-2 before:w-2 before:rounded-full before:absolute before:translate-y-full before:-translate-x-8",
              applicationIndex >= navItem.id - 1
                ? "before:bg-black text-black"
                : "before:bg-gray-300 text-gray-300"
            )}
          >
            {navItem.title}
          </Txt>
        </button>
      ))}
    </nav>
  );
};

export default ApplicationNavbar;
