import CommonNavbar from "@/components/common/navbar/Navbar";
import { PropsWithChildren } from "react";
import { headers } from "next/headers";

interface WithNavbarLayout extends PropsWithChildren {}

const ApplicantPage = ({ children }: WithNavbarLayout) => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const [_, __, ___, generation, ____] = header_url.split(/[/?]+/);

  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <CommonNavbar generation={generation} />
      {children}
    </div>
  );
};

export default ApplicantPage;
