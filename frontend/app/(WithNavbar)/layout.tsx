import CommonNavbar from "@/components/common/navbar/Navbar";
import { PropsWithChildren } from "react";

interface WithNavbarLayout extends PropsWithChildren {}

const ApplicantPage = ({ children }: WithNavbarLayout) => {
  return (
    <div className="px-24 min-w-[1280px] flex p-12">
      <CommonNavbar />
      {children}
    </div>
  );
};

export default ApplicantPage;
