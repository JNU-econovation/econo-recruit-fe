"use client";

import {
  applicationIndexAtom,
  applicationNavbarAtom,
} from "@/src/stores/application";
import { useAtom, useAtomValue } from "jotai";
import Txt from "@/components/common/Txt.component";
import { cn } from "@/src/utils/cn";
import { useApplication } from "@/src/hooks/useApplication";
// import { useEffect, useState } from "react";

const ApplicationNavbar = () => {
  const [applicationIndex, setApplicationIndex] = useAtom(applicationIndexAtom);
  const applicationNavbar = useAtomValue(applicationNavbarAtom);

  const { validateRequiredQuestion } = useApplication();

  const onNavbarClick = (id: number) => setApplicationIndex(id - 1);

  return (
    <nav className="pl-12 w-full h-full flex-1">
      {applicationNavbar.map(({ id, title }, index) => {
        const isActive = id <= applicationIndex + 1;
        const isWritten = validateRequiredQuestion(id);

        return (
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
                isActive ? "before:bg-black" : "before:bg-gray-300"
              )}
            >
              <Txt
                className={cn(
                  "transition-all",
                  isWritten ? "text-black" : "text-gray-300"
                )}
              >
                {title}
              </Txt>
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default ApplicationNavbar;
