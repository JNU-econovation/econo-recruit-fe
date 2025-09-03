import { ChangeEvent, FormEvent, useContext, useState } from "react";
import InputFormItem from "../common/InputFormItem.component";
import { isPassword } from "@/src/functions/validator";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/src/apis/user";
import { PageStatusContext } from "@/app/password-reset/page";

export default function PasswordSetForm() {
  const router = useRouter();
  const [password, setPassword] = useState({
    value: "",
    isError: false,
    errorMsg: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    isError: false,
    errorMsg: "",
  });

  const { verifiedEmail } = useContext(PageStatusContext);

  const isPasswordMatch = passwordConfirm.value === password.value;
  const isSubmitButtonDisabled =
    password.isError ||
    passwordConfirm.isError ||
    !password.value ||
    !passwordConfirm.value;

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (result) => {
      if (result) {
        alert("비밀번호 재설정에 성공했습니다.");
        router.push("/");
        return;
      }
      alert("비밀번호 재설정에 실패했습니다.");
    },
  });

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 형식에 맞지 않을때
    if (!isPassword(e.target.value)) {
      setPassword({
        value: e.target.value,
        isError: true,
        errorMsg:
          "비밀번호는 10자 이상이어야 하며, 최소 1개의 숫자와 1개의 특수문자를 포함해야 합니다.",
      });
      return;
    }
    // 다 일치할 때
    setPassword({ value: e.target.value, isError: false, errorMsg: "" });
  };

  const passwordConfirmHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm({ value: e.target.value, isError: false, errorMsg: "" });
  };

  const onSubmitPasswordSet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      email: verifiedEmail,
      password: password.value,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">비밀번호 재설정</h1>
        <p className="text-base">재설정 할 비밀번호를 입력해주세요.</p>
      </div>
      <form
        onSubmit={onSubmitPasswordSet}
        className="flex flex-col w-[40rem] mt-12 gap-3"
      >
        <InputFormItem
          placeholder={"**********"}
          type="password"
          label="비밀번호"
          value={password.value}
          onChange={passwordHandler}
          isWrong={password.isError}
          wrongMessage={password.errorMsg}
        />
        <InputFormItem
          placeholder={"**********"}
          type="password"
          label="비밀번호 확인"
          value={passwordConfirm.value}
          onChange={passwordConfirmHandler}
        />
        <div className="w-full mt-8">
          <button
            className="w-full p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
            확인
          </button>
          {!isPasswordMatch && (
            <p className="text-red-500">비밀번호 확인이 일치하지 않습니다.</p>
          )}
        </div>
      </form>
    </>
  );
}
