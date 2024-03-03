"use client";

import Txt from "@/components/common/Txt.component";
import { MAX_TEXT_LENGTH } from "@/src/constants";
import {
  ApplicationNode,
  ApplicationTextarea,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";
import { FormEvent } from "react";

interface ApplicationTextareaProps {
  data: ApplicationNode;
}

const ApplicationTexarea = ({ data }: ApplicationTextareaProps) => {
  const textData = data as ApplicationTextarea;
  const [value, setValue] = useLocalStorage(textData.name, "");

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value.slice(0, MAX_TEXT_LENGTH));
  };

  return (
    <>
      {textData.title && (
        <label>
          <Txt typography="h6">{`${textData.title}${
            textData.require ? "*" : ""
          }`}</Txt>
          {textData.subtitle && <Txt>{` ${textData.subtitle}`}</Txt>}
        </label>
      )}
      <div className="relative">
        <textarea
          className="border rounded-lg px-4 py-6 w-full resize-none"
          rows={20}
          name={textData.name}
          value={value}
          maxLength={1000}
          onInput={onInput}
        />
        <div className="absolute bottom-3 right-4 bg-white text-sm">{`(${value.length}/${MAX_TEXT_LENGTH})`}</div>
      </div>
    </>
  );
};

export default ApplicationTexarea;
