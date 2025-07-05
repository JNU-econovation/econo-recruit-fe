"use client";

import { ChangeEvent, useState } from "react";
import InputFormItem from "@/components/common/InputFormItem.component";
import { useMutation } from "@tanstack/react-query";

type PageStatus = "EMAIL_CODE" | "PASSWORD_SET";

const PasswordResetPage = () => {
  // 페이지 상태 "EMAIL_CODE" | "PASSWORD_SET"
  const [pageStatus, setPageStatus] = useState<PageStatus>("EMAIL_CODE");
  // 인증코드 입력
  const [emailCode, setEmailCode] = useState("");
  // 인증코드 확인 상태
  const [isEmailCodeWrong, setIsEmailCodeWrong] = useState(false);

  const emailCodeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
  };

  const { mutate } = useMutation({
    // FIXME: API 넣기
    mutationFn: async () => {
      return new Promise((res, _) => {
        setTimeout(() => {
          res(123456);
        }, 2000);
      });
    },
    onSuccess: () => {
      setPageStatus("PASSWORD_SET");
    },
    onError: () => {
      // TODO: 에러 처리
      setIsEmailCodeWrong(true);
    },
  });

  const onSubmitEmailCode = () => {
    mutate();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">비밀번호 재설정</h1>
        <p className="text-base">이메일로 받은 인증번호를 입력해주세요.</p>
      </div>
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
        <button className="text-[#989898]">인증코드 다시 받기</button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
