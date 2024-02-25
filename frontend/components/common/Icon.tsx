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
import TrashSquareFill from "/public/icons/trash.square.fill.svg";
import ThreeDots from "/public/icons/three-dogs.svg";
import { ComponentProps } from "react";

interface IconProps extends ComponentProps<"img"> {
  className?: string;
  icon: keyof typeof icons;
}

const icons = {
  arrowForwardCircleFill: {
    image: ArrowForwardCircleFill,
    alt: "allow forward circle fill",
  },
  bubbleRight: {
    image: BubbleRight,
    alt: "bubble right",
  },
  chevronBackward: {
    image: ChevronBackward,
    alt: "chevron backward",
  },
  chevronDown: {
    image: ChevronDown,
    alt: "chevron down",
  },
  ellipsisBubble: {
    image: EllipsisBubble,
    alt: "ellipsis bubble",
  },
  ellipsisMultiply: {
    image: EllipsisMultiply,
    alt: "ellipsis multiply",
  },
  ellipsisPlus: {
    image: EllipsisPlus,
    alt: "ellipsis plus",
  },
  ellipsisPlusBlue: {
    image: EllipsisPlusBlue,
    alt: "ellipsis plus blue",
  },
  faceSmiling: {
    image: FaceSmiling,
    alt: "empty smile face",
  },
  faceSmilingFill: {
    image: FaceSmilingFill,
    alt: "filling smile face",
  },
  heart: {
    image: Heart,
    alt: "empty heart drawn with outline",
  },
  heartPoint: {
    image: HeartPoint,
    alt: "filling heart",
  },
  search: {
    image: Search,
    alt: "reading glasses for search",
  },
  trashSquareFill: {
    image: TrashSquareFill,
    alt: "trash bin describe with box",
  },
  threeDots: {
    image: ThreeDots,
    alt: "three dots icon",
  },
} as const;

const Icon = ({ className, icon, ...props }: IconProps) => {
  const { image, alt } = icons[icon];
  return <img src={image.src} alt={alt} {...props} className={className} />;
};

export default Icon;
