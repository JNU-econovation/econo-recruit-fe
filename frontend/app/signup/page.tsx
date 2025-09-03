"use client";

import SignUpForm from "@/components/user/SignUpForm.component";
import { signUp } from "@/src/apis/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useReducer } from "react";

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

  const { mutate: submitSignUp, isLoading } = useMutation({
    mutationFn: (data: SignUpData) =>
      signUp({
        email: data.email,
        password: data.password,
        name: data.username,
        year: Number(data.generation),
      }),

    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate.push("/signin");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();

    submitSignUp(signUpData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignUpForm
        onSubmit={onSubmit}
        data={signUpData}
        setForm={setForm}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignUpPage;
