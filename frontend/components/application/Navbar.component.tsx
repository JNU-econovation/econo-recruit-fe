"use client";

import { applicationIndexAtom } from "@/src/stores/application";
import { useAtom } from "jotai";
import Txt from "@/components/common/Txt.component";
import { cn } from "@/src/utils/cn";

interface ApplicationNavbarProps {
  applicationNavbar: { id: number; title: string }[];
  className?: string;
}

const ApplicationNavbar = ({
  applicationNavbar,
  className,
}: ApplicationNavbarProps) => {
  const [applicationIndex, setApplicationIndex] = useAtom(applicationIndexAtom);

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
