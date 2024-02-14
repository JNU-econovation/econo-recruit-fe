import { ComponentPropsWithoutRef, useId } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

interface InputFormItemProps extends InputProps {
  label?: string;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isWrong?: boolean;
  wrongMessage?: string;
}

/**
 * InputFormItem component
 * @param {string} label - input의 라벨
 * @param {string} type - input의 타입
 * @param {string} placeholder - input의 placeholder
 * @param {string} value - input의 값
 * @param {function} onChange - input의 값이 변경될 때 실행되는 함수
 * @param {boolean} isWrong - input의 값이 잘못되었는지 여부
 * @param {string} wrongMessage - input의 값이 잘못되었을 때 보여줄 메시지
 * @param {number} minlength - input의 최소 길이
 * @param {number} maxlength - input의 최대 길이
 * @returns {JSX.Element} - InputFormItem component
 * @constructor
 * @example
 * <InputFormItem
 * label="이메일"
 * type="email"
 * placeholder="이메일을 입력해주세요."
 * value={email}
 * onChange={(e) => setEmail(e.target.value)}
 * isWrong={isEmailWrong}
 * wrongMessage="이메일 형식이 잘못되었습니다."
 * />
 */
const InputFormItem = ({
  label = "",
  type,
  placeholder = "",
  value,
  onChange,
  isWrong,
  wrongMessage,
  ...inputProps
}: InputFormItemProps) => {
  const uid = useId();

  return (
    <div className="relative">
      <label
        className="w-full block text-gray-700 text-sm font-bold mb-2"
        htmlFor={uid}
      >
        {label}
      </label>
      {isWrong && (
        <p className="text-red-500 text-sm mb-2 absolute right-0 translate-y-[-100%]">
          {wrongMessage ?? "잘못된 형식입니다."}
        </p>
      )}
      <input
        className="w-full rounded-lg py-4 px-8 bg-gray-100 hover:bg-gray-200"
        id={uid}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

export default InputFormItem;
