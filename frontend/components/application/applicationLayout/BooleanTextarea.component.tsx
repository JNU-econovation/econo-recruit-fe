"use client";

import RadioGroup from "@/components/common/Radio.component";
import Txt from "@/components/common/Txt.component";
import {
  ApplicationBooleanTextarea,
  ApplicationQuestion,
} from "@/src/constants/application/type";
import { useLocalStorage } from "@/src/hooks/useLocalstorage.hook";

interface TextAreaProps {
  node: {
    type: "true" | "false";
    title?: string;
    subtitle?: string;
    require: boolean;
    name: string;
  };
  index: number;
}

const TextArea = ({ index, node }: TextAreaProps) => {
  const [textValue, setTextValue] = useLocalStorage(node.name, "");

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="pl-8">
          <Txt typography="h6" className="mb-4 block break-keep">
            {`1) ${node.title}`}
          </Txt>
          <Txt className="pl-4 block break-keep">{node.subtitle}</Txt>
        </div>
      </div>
      <div className="flex-1">
        <textarea
          className="my-2 border rounded-lg p-4 w-full resize-none"
          rows={20}
          maxLength={1000}
          name={node.name}
          value={textValue}
          onInput={(e) => setTextValue(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

interface ApplicationBooleanTextareaProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationBooleanTextareaLayout = ({
  applicationQuestion,
}: ApplicationBooleanTextareaProps) => {
  const booleanTextareaData = applicationQuestion
    .nodes[0] as ApplicationBooleanTextarea;
  const [selectedValue, setSelectedValue] = useLocalStorage(
    booleanTextareaData.name,
    "init"
  );

  return (
    <div className="w-full flex-1 pr-12">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-4 flex gap-2">
            <Txt typography="h6">{`${applicationQuestion.id}. `}</Txt>
            <Txt typography="h6" className="break-keep">{`${
              applicationQuestion.title
            }${applicationQuestion.require ? "*" : ""}`}</Txt>
          </div>
          {applicationQuestion.subtitle && (
            <div className="pl-6">
              <Txt className="text-sm break-keep">
                {applicationQuestion.subtitle}
              </Txt>
            </div>
          )}
        </div>
        <div className="flex-1">
          <RadioGroup
            name={booleanTextareaData.name}
            onChange={(e) => setSelectedValue(e.target.value)}
            radioList={booleanTextareaData.value}
            value={selectedValue}
          />
        </div>
      </div>
      {booleanTextareaData.subNodes.map((node, index) => {
        const findByIndex = booleanTextareaData.value.findIndex(
          (value) => value === selectedValue
        );
        if (findByIndex !== index) return;

        return <TextArea key={index} index={index} node={node} />;
      })}
    </div>
  );
};

export default ApplicationBooleanTextareaLayout;
