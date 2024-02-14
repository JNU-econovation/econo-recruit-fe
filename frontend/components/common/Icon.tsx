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
import { ComponentProps } from "react";

interface IconProps extends ComponentProps<"img"> {
  className: string;
  icon: keyof typeof icons;
}

const icons = {
  arrowForwardCircleFill: {
    src: ArrowForwardCircleFill,
    alt: "allow forward circle fill icon",
  },
  bubbleRight: {
    src: BubbleRight,
    alt: "bubble right icon",
  },
  chevronBackward: {
    src: ChevronBackward,
    alt: "chevron backward icon",
  },
  chevronDown: {
    src: ChevronDown,
    alt: "chevron down icon",
  },
  ellipsisBubble: {
    src: EllipsisBubble,
    alt: "ellipsis bubble icon",
  },
  ellipsisMultiply: {
    src: EllipsisMultiply,
    alt: "ellipsis multiply icon",
  },
  ellipsisPlus: {
    src: EllipsisPlus,
    alt: "ellipsis plus icon",
  },
  ellipsisPlusBlue: {
    src: EllipsisPlusBlue,
    alt: "ellipsis plus blue icon",
  },
  faceSmiling: {
    src: FaceSmiling,
    alt: "face smiling icon",
  },
  faceSmilingFill: {
    src: FaceSmilingFill,
    alt: "face smiling fill icon",
  },
  heart: {
    src: Heart,
    alt: "heart icon",
  },
  heartPoint: {
    src: HeartPoint,
    alt: "heart point icon",
  },
  search: {
    src: Search,
    alt: "search icon",
  },
} as const;

const Icon = ({ className, icon, ...props }: IconProps) => {
  const { src, alt } = icons[icon];
  return <img src={src} alt={alt} {...props} className={className} />;
};

export default Icon;
