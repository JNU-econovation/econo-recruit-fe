"use client";

import SignUpForm from "@/components/user/SignUpForm.component";
import { signUp, verifyCode, verifySignUpEmail } from "@/src/apis/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

interface setFormAction {
  name: keyof typeof initState;
  value: string;
}

const initState = {
  email: "",
  password: "",
  passwordConfirm: "",
  username: "",
  generation: "",
};

const formDataReducer = (state: typeof initState, action: setFormAction) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

interface SignUpData {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  generation: string;
}

const SignUpPage = () => {
  const navigate = useRouter();
  const [signUpData, setForm] = useReducer(formDataReducer, initState);
  const [emailCode, setEmailCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailCodeWrong, setIsEmailCodeWrong] = useState(false);
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);

  const { mutate: submitSignUp, isLoading } = useMutation({
    mutationFn: (data: SignUpData) =>
      signUp({
        email: data.email,
        password: data.password,
        name: data.username,
        year: Number(data.generation),
      }),

    onSuccess: (result) => {
      if (result) {
        alert("회원가입이 완료되었습니다.");
        navigate.push("/signin");
        return;
      }
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const { mutate: sendEmailCode, isLoading: isSendingEmailCode } = useMutation({
    mutationFn: verifySignUpEmail,
    onSuccess: (result) => {
      if (result) {
        setIsVerificationRequested(true);
        setIsEmailCodeWrong(false);
        alert("인증번호가 발송되었습니다.");
        return;
      }
      alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    },
    onError: () => {
      alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const { mutate: confirmEmailCode, isLoading: isCheckingEmailCode } =
    useMutation({
      mutationFn: verifyCode,
      onSuccess: (result) => {
        if (result) {
          setIsEmailVerified(true);
          setIsEmailCodeWrong(false);
          alert("이메일 인증이 완료되었습니다.");
          return;
        }
        setIsEmailVerified(false);
        setIsEmailCodeWrong(true);
      },
      onError: () => {
        setIsEmailVerified(false);
        setIsEmailCodeWrong(true);
      },
    });

  const onSendVerificationCode = () => {
    setIsEmailVerified(false);
    sendEmailCode({ email: signUpData.email });
  };

  const onVerifyEmailCode = () => {
    confirmEmailCode({
      email: signUpData.email,
      code: emailCode,
    });
  };

  const onChangeEmailCode = (value: string) => {
    setEmailCode(value);
    setIsEmailCodeWrong(false);
  };

  const onChangeForm = (action: setFormAction) => {
    if (action.name === "email" && action.value !== signUpData.email) {
      setIsEmailVerified(false);
      setIsVerificationRequested(false);
      setEmailCode("");
      setIsEmailCodeWrong(false);
    }
    setForm(action);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    submitSignUp(signUpData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignUpForm
        onSubmit={onSubmit}
        data={signUpData}
        setForm={onChangeForm}
        emailCode={emailCode}
        onChangeEmailCode={onChangeEmailCode}
        onSendVerificationCode={onSendVerificationCode}
        onVerifyEmailCode={onVerifyEmailCode}
        isEmailVerified={isEmailVerified}
        isEmailCodeWrong={isEmailCodeWrong}
        isVerificationRequested={isVerificationRequested}
        isSendingEmailCode={isSendingEmailCode}
        isCheckingEmailCode={isCheckingEmailCode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignUpPage;
