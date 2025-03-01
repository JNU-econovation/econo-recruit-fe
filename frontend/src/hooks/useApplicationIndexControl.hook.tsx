import { applicationIndexAtom } from "@/src/stores/application";
import { useAtom } from "jotai";

const useApplicationIndexControl = () => {
  const [applicationIndex, setIndex] = useAtom(applicationIndexAtom);
  const goNextIndex = () => {
    setIndex((index) => index + 1);
  };
  const goPrevIndex = () => {
    setIndex((index) => (index - 1 < 0 ? 0 : index - 1));
  };
  return { applicationIndex, goNextIndex, goPrevIndex };
};

export default useApplicationIndexControl;
