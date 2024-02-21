import Txt from "@/components/common/Txt.component";
import {
  type ApplicationJustText,
  ApplicationNode,
} from "@/src/constants/application/type";

interface ApplicationJustTextProps {
  data: ApplicationNode;
}

const ApplicationJustText = ({ data }: ApplicationJustTextProps) => {
  const justTextData = data as ApplicationJustText;

  return (
    <>
      <Txt typography="h6" className="block break-keep">
        {justTextData.title}
      </Txt>
      <Txt className="break-keep">{justTextData.subtitle}</Txt>
    </>
  );
};

export default ApplicationJustText;
