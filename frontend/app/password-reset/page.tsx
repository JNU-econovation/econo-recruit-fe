"use client";

import { PropsWithChildren, useState } from "react";
import PasswordResetFunnel from "@/components/password-reset/PasswordResetFunnel";
import { PageStatus, PageStatusContext } from "@/src/context";

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
