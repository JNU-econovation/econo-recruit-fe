"use client";

import classNames from "classnames";
import { ChangeEvent, useId } from "react";

interface CheckboxProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  isLast?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Checkbox = ({
  label,
  name,
  value,
  onChange,
  checked,
  disabled,
  isLast,
  onClick,
  className,
}: CheckboxProps) => {
  const id = useId();
  return (
    <div
      className={classNames(isLast && "col-start-1 col-end-[-1]", className)}
    >
      <label
        htmlFor={id}
        className={classNames(
          "flex items-center justify-center w-full py-4 border rounded-md cursor-pointer",
          checked
            ? "bg-[#303030] text-white border-black"
            : "border-gray-300 text-black bg-white",
          disabled && "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
        onClick={() => {
          if (typeof onClick === "function") onClick();
        }}
      >
        {label}
      </label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

interface CheckboxGroupProps {
  name: string;
  value: string[];
  disableValues?: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checkboxList: string[];
  splitNumber?: number;
  isSpaned?: boolean;
  onClick?: () => void;
}

const CheckboxGroup = ({
  name,
  value,
  onChange,
  checkboxList,
  disableValues,
  splitNumber = 2,
  isSpaned = false,
  onClick,
}: CheckboxGroupProps) => (
  <div
    className={`grid gap-2 grid-cols-${splitNumber} col-end-auto font-semibold`}
  >
    {checkboxList.map((checkboxData, index) => (
      <Checkbox
        key={index}
        label={checkboxData}
        name={name}
        value={checkboxData}
        onChange={onChange}
        disabled={
          disableValues?.find((disabledValue) => disabledValue !== checkboxData)
            ? true
            : false
        }
        checked={value?.find((value) => value === checkboxData) ? true : false}
        isLast={
          isSpaned &&
          index % splitNumber === 0 &&
          index === checkboxList.length - 1
        }
        onClick={onClick}
      />
    ))}
  </div>
);
export default CheckboxGroup;
