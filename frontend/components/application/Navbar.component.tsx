"use client";

import {
  applicationIndexAtom,
  applicationNavbarAtom,
} from "@/src/stores/application";
import { useAtom, useAtomValue } from "jotai";
import Txt from "@/components/common/Txt.component";
import { cn } from "@/src/utils/cn";

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

  return (
    <nav className={cn("pl-12 w-full h-full", className)}>
      {applicationNavbar.map((navItem, index) => (
        <button
          className={"text-left p-4 relative"}
          onClick={() => setApplicationIndex(navItem.id - 1)}
          key={navItem.id}
        >
          {/* 마지막 선은 그리지 않기 */}
          {index !== applicationNavbar.length - 1 && (
            <div
              className={cn(
                "absolute border-l-2 h-full -left-[13px] top-8 -z-10",
                {
                  "border-black": applicationIndex > navItem.id - 1,
                  "border-gray-300": applicationIndex <= navItem.id - 1,
                }
              )}
            ></div>
          )}
          <Txt
            className={cn(
              "relative transition-all before:h-2 before:w-2 before:rounded-full before:absolute before:translate-y-full before:-translate-x-8",
              {
                "before:bg-black text-black":
                  applicationIndex >= navItem.id - 1,
                "before:bg-gray-300 text-gray-300":
                  applicationIndex < navItem.id - 1,
              }
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
