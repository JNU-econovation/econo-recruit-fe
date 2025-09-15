import { useMutation } from "@tanstack/react-query";
import { useState, ChangeEvent, useContext, FormEvent } from "react";
import InputFormItem from "../common/InputFormItem.component";
import { PageStatusContext } from "@/src/context";
import { verifyCode, verifyEmail } from "@/src/apis/user";

export default function EmailCodeForm() {
  // 인증코드 입력
  const [emailCode, setEmailCode] = useState("");
  // 인증코드 확인 상태
  const [isEmailCodeWrong, setIsEmailCodeWrong] = useState(false);

  const emailCodeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
  };

  const { verifiedEmail, handlePageStatus } = useContext(PageStatusContext);

  const { mutate: mutateEmailCode, isLoading } = useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      if (data) {
        handlePageStatus("PASSWORD_SET");
      } else {
        setIsEmailCodeWrong(true);
      }
    },
    onError: () => {
      setIsEmailCodeWrong(true);
    },
  });

  const { mutate: mutateSendEmailCode } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (result) => {
      // TODO: data를 받아서 성공/실패 여부를 결정하고
      // TODO: 분기처리
      if (result) {
        alert("인증번호가 발송되었습니다.");
        return;
      }
      alert("인증번호 재발송에 실패했습니다.");
    },
  });

  const onSubmitEmailCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateEmailCode({
      email: verifiedEmail,
      code: emailCode,
    });
  };

  const onClickResendEmailCode = () => {
    mutateSendEmailCode({
      email: verifiedEmail,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">이메일 인증코드 입력</h1>
        <p className="text-base">이메일로 받은 인증번호를 입력해주세요.</p>
      </div>
      <div>
        <form onSubmit={onSubmitEmailCode} className="w-[40rem] mt-12">
          <InputFormItem
            placeholder={"1234@"}
            type="text"
            label="인증번호 입력"
            value={emailCode}
            onChange={emailCodeHandler}
            isWrong={isEmailCodeWrong}
            wrongMessage={"인증코드가 올바르지 않습니다."}
          />
          <div className="w-full mt-8">
            <button
              className="w-full p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
            >
              확인
            </button>
          </div>
        </form>
        <div className="flex gap-3 text-base mt-4 w-[40rem]">
          <p>인증번호가 오지 않으셨나요?</p>
          <button
            className="text-[#989898]"
            disabled={isLoading}
            onClick={onClickResendEmailCode}
          >
            인증코드 다시 받기
          </button>
        </div>
      </div>
    </>
  );
}
