"use client";

import SignInForm from "@/components/user/SignInForm.component";
import { signIn } from "@/src/apis/user";
import { localStorage } from "@/src/functions/localstorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

interface setFormAction {
  name: keyof typeof initState;
  value: string;
}

const initState = {
  email: "",
  password: "",
};

const formDataReducer = (state: typeof initState, action: setFormAction) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const SignInPage = () => {
  const navigate = useRouter();
  const [signInData, setForm] = useReducer(formDataReducer, initState);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (await signIn(signInData)) {
      setError("");
      navigate.push("/");
      return;
    }
    setError("로그인이 실패했습니다.");
    localStorage.remove("accessToken");
    localStorage.remove("refreshToken");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/images/econo-3d-logo.png" />
      <SignInForm onSubmit={onSubmit} data={signInData} setForm={setForm} />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
      <div className="mt-4 flex gap-2">
        <span>계정이 없으신가요?</span>
        <Link className="text-gray-400" href="/signup">
          회원가입
        </Link>
      </div>
      <div className="mt-2 flex gap-2">
        <span>비밀번호를 잊어버리셨나요?</span>
        <Link className="text-gray-400" href="/password-reset">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
