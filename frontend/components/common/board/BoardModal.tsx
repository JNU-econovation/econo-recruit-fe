import Modal from "react-modal";
import CloseImage from "/public/icons/ellipsis.multiply.svg";
import Image from "next/image";
import { cn } from "@/src/utils/cn";

const modalStyle = {
  content: {
    width: "calc(100% - 12rem)",
    zIndex: "9999",
    height: "calc(100%)",
    margin: "3rem 6rem 0 6rem",
    minWidth: "1280px",
    boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.14)",
    border: "none",
    position: "relative",
    inset: "0",
    padding: "2.5rem 3rem",
  },
  overlay: {
    padding: "0",
    position: "absolute",
  },
} as const;

interface BoardModalProps extends Modal.Props {
  wrapperClassName?: string;
}

const BoardModal = ({
  wrapperClassName,
  style,
  children,
  ...props
}: BoardModalProps) => {
  return (
    <Modal style={{ ...modalStyle, ...style }} {...props}>
      <button className="absolute z-10" onClick={props.onRequestClose}>
        <Image src={CloseImage} alt="close" />
      </button>
      <div
        className={cn(
          "flex pt-8 absolute h-[calc(100%-6rem)] w-[calc(100%-6rem)]",
          wrapperClassName
        )}
      >
        {children}
      </div>
    </Modal>
  );
};

export default BoardModal;
