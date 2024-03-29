import CommonNavbar from "@/components/common/navbar/Navbar";
import { PropsWithChildren } from "react";
import { headers } from "next/headers";

interface WithNavbarLayout extends PropsWithChildren {}

const ApplicantPage = ({ children }: WithNavbarLayout) => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const [_, __, currentPath, generation, ___] = header_url.split(/[/?]+/);
  const isShort = currentPath === "kanban";

  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <CommonNavbar
        generation={generation}
        currentPath={currentPath}
        isShort={isShort}
      />
      {children}
    </div>
  );
};

export default ApplicantPage;
