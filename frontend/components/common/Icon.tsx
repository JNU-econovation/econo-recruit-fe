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
  className?: string;
  icon: keyof typeof icons;
}

const icons = {
  arrowForwardCircleFill: {
    image: ArrowForwardCircleFill,
    alt: "allow forward circle fill icon",
  },
  bubbleRight: {
    image: BubbleRight,
    alt: "bubble right icon",
  },
  chevronBackward: {
    image: ChevronBackward,
    alt: "chevron backward icon",
  },
  chevronDown: {
    image: ChevronDown,
    alt: "chevron down icon",
  },
  ellipsisBubble: {
    image: EllipsisBubble,
    alt: "ellipsis bubble icon",
  },
  ellipsisMultiply: {
    image: EllipsisMultiply,
    alt: "ellipsis multiply icon",
  },
  ellipsisPlus: {
    image: EllipsisPlus,
    alt: "ellipsis plus icon",
  },
  ellipsisPlusBlue: {
    image: EllipsisPlusBlue,
    alt: "ellipsis plus blue icon",
  },
  faceSmiling: {
    image: FaceSmiling,
    alt: "face smiling icon",
  },
  faceSmilingFill: {
    image: FaceSmilingFill,
    alt: "face smiling fill icon",
  },
  heart: {
    image: Heart,
    alt: "heart icon",
  },
  heartPoint: {
    image: HeartPoint,
    alt: "heart point icon",
  },
  search: {
    image: Search,
    alt: "search icon",
  },
} as const;

const Icon = ({ className, icon, ...props }: IconProps) => {
  const { image, alt } = icons[icon];
  return <img src={image.src} alt={alt} {...props} className={className} />;
};

export default Icon;
