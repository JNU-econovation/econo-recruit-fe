import { useMutation } from "@tanstack/react-query";
import { useState, ChangeEvent, useContext, FormEvent } from "react";
import InputFormItem from "../common/InputFormItem.component";
import { PageStatusContext } from "@/src/context";
import { verifyEmail } from "@/src/apis/user";
import { isEmail } from "@/src/functions/validator";

export default function EmailForm() {
  const { handlePageStatus, handleVerifiedEmail } =
    useContext(PageStatusContext);
  const [email, setEmail] = useState({
    value: "",
    isError: false,
    errorMsg: "",
  });

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEmail(e.target.value)) {
      setEmail({
        value: e.target.value,
        isError: true,
        errorMsg: "이메일 형식이 올바르지 않습니다.",
      });
      return;
    }
    setEmail({ value: e.target.value, isError: false, errorMsg: "" });
  };

  const { mutate: mutateEmailCode, isLoading } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      // TODO: data를 받아서 성공/실패 여부를 결정하고
      // TODO: 분기처리
      if (data) {
        handleVerifiedEmail(email.value);
        handlePageStatus("EMAIL_CODE");
      } else {
        setEmail((prev) => ({
          ...prev,
          isError: true,
          errorMsg: "유효하지 않은 이메일입니다.",
        }));
      }
    },
    onError: () => {
      setEmail((prev) => ({ ...prev, isError: true }));
    },
  });

  const onSubmitEmailCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateEmailCode({ email: email.value });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">비밀번호 찾기</h1>
        <p className="text-base">
          비밀번호를 찾고자 하는 이메일을 입력해주세요.
        </p>
      </div>
      <div>
        <form onSubmit={onSubmitEmailCode} className="w-[40rem] mt-12">
          <InputFormItem
            placeholder={"qwer@naver.com"}
            type="text"
            label="이메일"
            value={email.value}
            onChange={emailHandler}
            isWrong={email.isError}
            wrongMessage={email.errorMsg}
          />
          <div className="w-full mt-8">
            <button
              disabled={isLoading}
              className="disabled:bg-slate-300 disabled:cursor-not-allowed w-full p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
            >
              {isLoading ? "이메일 전송 중" : "다음"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
