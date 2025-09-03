import { useContext } from "react";
import { PageStatusContext } from "@/src/context";
import EmailCodeForm from "./EmailCodeForm";
import PasswordSetForm from "./PasswordSetForm";
import EmailForm from "./EmailForm";

const PasswordResetFunnel = () => {
  const { pageStatus } = useContext(PageStatusContext);

  if (pageStatus === "EMAIL_ENTRY") return <EmailForm />;

  if (pageStatus === "EMAIL_CODE") return <EmailCodeForm />;

  if (pageStatus === "PASSWORD_SET") return <PasswordSetForm />;
};

export default PasswordResetFunnel;
