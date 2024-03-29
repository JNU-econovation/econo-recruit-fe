"use client";

import { ChangeEvent, useId } from "react";
import { cn } from "@/src/utils/cn";

interface RadioProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isCheck: boolean;
  onClick?: () => void;
}

const Radio = ({
  label,
  name,
  value,
  onChange,
  isCheck,
  disabled,
  onClick,
}: RadioProps) => {
  const id = useId();
  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          "flex items-center justify-center w-full py-4 border rounded-md cursor-pointer",
          isCheck
            ? "bg-dark text-white border-black"
            : "border-gray-300 text-black bg-white",
          { "bg-gray-200 text-gray-400 cursor-not-allowed": disabled }
        )}
        onClick={() => {
          typeof onClick === "function" && onClick();
        }}
      >
        {label}
      </label>
      <input
        type="radio"
        id={id}
        name={name}
        checked={isCheck}
        value={value}
        onChange={onChange}
        className="hidden"
        disabled={disabled}
      />
    </>
  );
};

interface RadioGroupProps {
  name: string;
  value: string;
  disableValue?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  radioList: string[];
  splitNumber?: 2 | 3 | 4;
  isSpaned?: boolean;
  onClick?: () => void;
}

const gridCols = ["", "", "grid-cols-2", "grid-cols-3", "grid-cols-4"];

const RadioGroup = ({
  name,
  value,
  onChange,
  radioList,
  disableValue,
  splitNumber = 2,
  onClick,
}: RadioGroupProps) => (
  <div
    className={cn(
      "grid gap-2 col-end-auto font-semibold",
      gridCols[splitNumber]
    )}
  >
    {radioList.map((radioData, index) => (
      <Radio
        key={index}
        label={radioData}
        name={name}
        value={radioData}
        onChange={onChange}
        disabled={disableValue === radioData}
        isCheck={radioData === value}
        onClick={onClick}
      />
    ))}
  </div>
);
export default RadioGroup;
