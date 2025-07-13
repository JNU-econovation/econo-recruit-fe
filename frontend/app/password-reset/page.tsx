"use client";

import { createContext, PropsWithChildren, useState } from "react";
import PasswordResetFunnel from "@/components/password-reset/PasswordResetFunnel";

export type PageStatus = "EMAIL_CODE" | "PASSWORD_SET" | "EMAIL_ENTRY";

interface PageStatusContextProps {
  pageStatus: PageStatus;
  handlePageStatus: (status: PageStatus) => void;
  verifiedEmail: string;
  handleVerifiedEmail: (email: string) => void;
}

export const PageStatusContext = createContext<PageStatusContextProps>({
  pageStatus: "EMAIL_CODE",
  handlePageStatus: (status: PageStatus) => {},
  verifiedEmail: "",
  handleVerifiedEmail: (email: string) => {},
});

const PageStatusContextProvider = ({ children }: PropsWithChildren) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>("EMAIL_ENTRY");
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const handlePageStatus = (status: PageStatus) => {
    setPageStatus(status);
  };

  const handleVerifiedEmail = (email: string) => {
    setVerifiedEmail(email);
  };
  return (
    <PageStatusContext.Provider
      value={{
        pageStatus,
        handlePageStatus,
        verifiedEmail,
        handleVerifiedEmail,
      }}
    >
      {children}
    </PageStatusContext.Provider>
  );
};

const PasswordResetPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <PageStatusContextProvider>
        <PasswordResetFunnel />
      </PageStatusContextProvider>
    </div>
  );
};

export default PasswordResetPage;
