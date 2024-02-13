"use client";

import Txt from "@/components/common/Txt.component";
import {
  ApplicationNode,
  ApplicationTextarea,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";

interface ApplicationTextareaProps {
  data: ApplicationNode;
}

const ApplicationTexarea = ({ data }: ApplicationTextareaProps) => {
  const textData = data as ApplicationTextarea;
  const [value, setValue] = useLocalStorage(textData.name, "");

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
      <textarea
        className="my-2 border rounded-lg p-4 w-full resize-none"
        rows={20}
        name={textData.name}
        value={value}
        maxLength={1000}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </>
  );
};

export default ApplicationTexarea;
