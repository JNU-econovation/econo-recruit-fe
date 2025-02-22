import { isEmail, isPassword } from "@/src/functions/validator";
import { useState } from "react";
import InputFormItem from "../common/InputFormItem.component";

const resetWarning = {
  email: false,
  password: false,
  response: false,
} as const;

interface SignInProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: {
    email: string;
    password: string;
  };
  setForm: (action: { name: "email" | "password"; value: string }) => void;
}

/**
 * SignUpForm component
 * @component
 * @param {function} onSubmit - form의 submit 이벤트를 처리하는 함수
 * @param {object} data - form의 input value를 담고 있는 객체
 * @param {function} setForm - form의 input value를 변경하는 함수
 * @returns {JSX.Element} - SignUpForm component
 * @constructor
 */
const SignInForm = ({ onSubmit, data, setForm }: SignInProps) => {
  const [isWarning, setWarning] = useState({
    email: false,
    password: false,
  });

  const { email, password } = data;

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
    onSubmit(e);

    setWarning(resetWarning);
    setForm({ name: "email", value: "" });
    setForm({ name: "password", value: "" });
  };

  return (
    <form className="flex flex-col gap-4 w-[40rem]" onSubmit={onSubmitPrevent}>
      <InputFormItem
        placeholder={"example@econovation.kr"}
        type="text"
        value={email}
        onChange={(e) => setForm({ name: "email", value: e.target.value })}
        isWrong={isWarning.email}
        wrongMessage={"이메일 형식이 올바르지 않습니다."}
      />
      <InputFormItem
        placeholder={"**********"}
        type="password"
        value={password}
        onChange={(e) => setForm({ name: "password", value: e.target.value })}
        isWrong={isWarning.password}
        wrongMessage={
          "비밀번호는 10자이상, 숫자 최소 1자 이상, 특수문자 최소 1자 이상이어야 합니다."
        }
      />
      <div className="w-full mt-8">
        <button
          className="w-full p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          type="submit"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
