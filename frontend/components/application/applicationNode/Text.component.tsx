"use client";

import Txt from "@/components/common/Txt.component";
import {
  ApplicationNode,
  type ApplicationText,
} from "@/src/constants/application/type";
import { replacer } from "@/src/functions/replacer";
import { validator } from "@/src/functions/validator";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import { cn } from "@/src/utils/cn";
import { useId, useState } from "react";

interface ApplicationTextProps {
  data: ApplicationNode;
}

const ApplicationText = ({ data }: ApplicationTextProps) => {
  const textData = data as ApplicationText;
  const id = useId();
  const [value, setValue] = useLocalStorage(textData.name, "");
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative">
      {textData.title && (
        <label>
          <Txt typography="h6">{`${textData.title}${
            textData.require ? "*" : ""
          }`}</Txt>
          {textData.subtitle && <Txt>{` ${textData.subtitle}`}</Txt>}
        </label>
      )}
      <input
        className={cn("my-2 border rounded-lg p-4 w-full", {
          "border-error": isError,
        })}
        type="text"
        id={id}
        value={value}
        onInput={(e) => {
          const value = textData.replace
            ? replacer(e.currentTarget.value, textData.replace)
            : e.currentTarget.value;
          const isError = textData.validate
            ? !validator(value, textData.validate)
            : false;
          setIsError(isError);
          setValue(value);
        }}
        maxLength={textData.maxLength ?? 1000}
        minLength={textData.minLength ?? 0}
      />
      {isError && textData.errorMessages ? (
        <div className="absolute w-full translate-x-[100%]">
          <div className="w-fit text-error -translate-x-[calc(100%+1rem)] -translate-y-12">
            {textData.errorMessages}
          </div>
        </div>
      ) : (
        ""
      )}
      {textData.example?.map((example, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-sm p-2 pl-4 pr-4 my-2 text-gray-400 w-fit"
          >
            {example}
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationText;
