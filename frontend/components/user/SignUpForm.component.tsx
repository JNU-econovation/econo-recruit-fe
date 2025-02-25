import { isEmail, isPassword } from "@/src/functions/validator";
import { useState } from "react";
import InputFormItem from "../common/InputFormItem.component";

const resetWarning = {
  email: false,
  password: false,
  passwordConfirm: false,
} as const;

interface SignUpProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: {
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
    generation: string;
  };
  setForm: (action: {
    name: "email" | "password" | "passwordConfirm" | "username" | "generation";
    value: string;
  }) => void;
}

/**
 * SignUpForm component
 * @param {function} onSubmit - form이 submit될 때 실행되는 함수
 * @param {object} data - form의 input value를 담고 있는 객체
 * @param {function} setForm - form의 input value를 변경하는 함수
 * @returns {JSX.Element} - SignUpForm component
 * @constructor
 */
const SignUpForm = ({ onSubmit, data, setForm }: SignUpProps) => {
  const [isWarning, setWarning] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const { email, username, password, passwordConfirm, generation } = data;

  const onSubmitPrevent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setWarning({ ...resetWarning, email: true });
      return;
    }

    if (!isPassword(password)) {
      setWarning({ ...resetWarning, password: true });
      return;
    }
    if (password !== passwordConfirm) {
      setWarning({ ...resetWarning, passwordConfirm: true });
      return;
    }
    onSubmit(e);
  };

  return (
    <form className="flex flex-col gap-4 w-[40rem] " onSubmit={onSubmitPrevent}>
      <InputFormItem
        label={"이메일 (아이디)"}
        placeholder={"example@econovation.kr"}
        type="text"
        value={email}
        onChange={(e) => setForm({ name: "email", value: e.target.value })}
        isWrong={isWarning.email}
        wrongMessage={"잘못된 이메일 형식입니다."}
      />
      <InputFormItem
        label={"이름"}
        placeholder={"에코노"}
        type="text"
        value={username}
        onChange={(e) => setForm({ name: "username", value: e.target.value })}
      />
      <InputFormItem
        label={"기수"}
        placeholder={"22"}
        type="text"
        value={generation}
        onChange={(e) => setForm({ name: "generation", value: e.target.value })}
      />
      <InputFormItem
        label={"비밀번호"}
        placeholder={"**********"}
        type="password"
        value={password}
        onChange={(e) => setForm({ name: "password", value: e.target.value })}
        isWrong={isWarning.password}
        wrongMessage={
          "비밀번호는 10자 이상이어야 하며, 최소 1개의 숫자와 1개의 특수문자를 포함해야 합니다."
        }
      />
      <InputFormItem
        label={"비밀번호 확인"}
        placeholder={"**********"}
        type="password"
        value={passwordConfirm ?? ""}
        onChange={(e) =>
          setForm({ name: "passwordConfirm", value: e.target.value })
        }
        isWrong={isWarning.passwordConfirm}
        wrongMessage={"비밀번호가 일치하지 않습니다."}
      />
      <div className="w-full mt-8">
        <button
          className="w-full p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          type="submit"
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
