"use client";

import SignUpForm from "@/components/user/SignUpForm.component";
import { signUp } from "@/src/apis/user";
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

const SignUpPage = () => {
  const navigate = useRouter();
  const [signUpData, setForm] = useReducer(formDataReducer, initState);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (
      await signUp({
        email: signUpData.email,
        password: signUpData.password,
        name: signUpData.username,
        year: +signUpData.generation,
      })
    ) {
      setError("");
      navigate.push("/signin");
      alert("회원가입이 완료되었습니다.");
    }
    setError("회원가입이 실패했습니다.");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignUpForm onSubmit={onSubmit} data={signUpData} setForm={setForm} />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </div>
  );
};

export default SignUpPage;
