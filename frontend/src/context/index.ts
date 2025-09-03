import { createContext } from "react";

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
