import ArrowForwardCircleFill from "/public/icons/arrow.forward.circle.fill.svg";
import BubbleRight from "/public/icons/bubble.right.svg";
import ChevronBackward from "/public/icons/chevron.backward.svg";
import ChevronDown from "/public/icons/chevron-down.svg";
import EllipsisBubble from "/public/icons/ellipsis.bubble.svg";
import EllipsisMultiply from "/public/icons/ellipsis.multiply.svg";
import EllipsisPlus from "/public/icons/ellipsis.plus.svg";
import EllipsisPlusBlue from "/public/icons/ellipsis.plus.blue.svg";
import FaceSmiling from "/public/icons/face.smiling.svg";
import FaceSmilingFill from "/public/icons/face.smiling.fill.svg";
import Heart from "/public/icons/heart.svg";
import HeartPoint from "/public/icons/heart.point.svg";
import Search from "/public/icons/search-icon.svg";

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className: string;
  icon: string; // TODO: need to change specific type
}

const icons = {
  arrowForwardCircleFill: {
    src: ArrowForwardCircleFill,
  },
  bubbleRight: {
    src: BubbleRight,
  },
  chevronBackward: {
    src: ChevronBackward,
  },
  chevronDown: {
    src: ChevronDown,
  },
  ellipsisBubble: {
    src: EllipsisBubble,
  },
  ellipsisMultiply: {
    src: EllipsisMultiply,
  },
  ellipsisPlus: {
    src: EllipsisPlus,
  },
  ellipsisPlusBlue: {
    src: EllipsisPlusBlue,
  },
  faceSmiling: {
    src: FaceSmiling,
  },
  faceSmilingFill: {
    src: FaceSmilingFill,
  },
  heart: {
    src: Heart,
  },
  heartPoint: {
    src: HeartPoint,
  },
  search: {
    src: Search,
  },
};
const Icon = ({ className, icon, ...props }: IconProps) => {
  return <img />;
};

export default Icon;
