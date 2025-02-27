import Txt from "@/components/common/Txt.component";
import type {
  ApplicationQuestion,
  ApplicationRadioForCheck,
} from "@/src/constants/application/type";
import { cn } from "@/src/utils/cn";
import Link from "next/link";
import { ChangeEvent } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

interface RadioCellProps {
  applicationQuestion: ApplicationQuestion;
  radioForCheckData: ApplicationRadioForCheck;
}

const RadioCell = ({
  applicationQuestion,
  radioForCheckData,
}: RadioCellProps) => {
  const [radio, setRadio] = useLocalStorage<string>(
    radioForCheckData.name,
    "동의하지 않습니다."
  );

  const onSelectRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  return (
    <div className="flex-1">
      <Link
        href={
          radioForCheckData.name === "personalInformationAgree"
            ? "/application/consent#common"
            : radioForCheckData.name === "personalInformationAgreeForPortfolio"
              ? "/application/consent#portfolio"
              : ""
        }
        target="_blank"
      >
        <Txt
          typography="h6"
          className="mb-4 flex-1 block underline underline-offset-4"
        >
          {radioForCheckData.title}
        </Txt>
      </Link>
      <input
        className="mr-2"
        type="radio"
        name={radioForCheckData.name}
        id={radioForCheckData.name + radioForCheckData.value[0]}
        checked={radio === radioForCheckData.value[0]}
        value={radioForCheckData.value[0]}
        onChange={onSelectRadio}
      />
      <label
        className="mr-4"
        htmlFor={radioForCheckData.name + radioForCheckData.value[0]}
      >
        {radioForCheckData.value[0]}
      </label>
      <input
        className="mr-2"
        type="radio"
        name={radioForCheckData.name}
        id={radioForCheckData.name + radioForCheckData.value[1]}
        checked={radio === radioForCheckData.value[1]}
        value={radioForCheckData.value[1]}
        onChange={onSelectRadio}
      />
      <label
        className="mr-4"
        htmlFor={radioForCheckData.name + radioForCheckData.value[1]}
      >
        {radioForCheckData.value[1]}
      </label>
    </div>
  );
};

interface ApplicationRadioForCheckProps {
  applicationQuestion: ApplicationQuestion;
}

const ApplicationRadioForCheckLayout = ({
  applicationQuestion,
}: ApplicationRadioForCheckProps) => {
  return (
    <div className={cn({ "pr-12": applicationQuestion.id !== -1 })}>
      {applicationQuestion.id !== -1 && applicationQuestion.title && (
        <>
          <Txt typography="h6">{`${applicationQuestion.id}. `}</Txt>
          <Txt typography="h6" className="break-all">{`${
            applicationQuestion.title
          }${applicationQuestion.require ? "*" : ""}`}</Txt>
        </>
      )}
      <div className="flex py-8 pl-12">
        {applicationQuestion.nodes.map((node, index) => {
          const radioForCheckData = node as ApplicationRadioForCheck;
          return (
            <RadioCell
              applicationQuestion={applicationQuestion}
              radioForCheckData={radioForCheckData}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationRadioForCheckLayout;
