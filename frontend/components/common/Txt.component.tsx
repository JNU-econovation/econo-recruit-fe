import { PropsWithChildren } from "react";
import classNames from "classnames";

const typographyType = {
  head: "text-6xl",
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-bold",
  h4: "text-xl font-bold",
  h5: "text-lg font-bold",
  h6: "text-base font-bold",
  p: "text-base",
};

const colorType = {
  black: "text-black",
  gray: "text-[#666]",
  white: "text-white",
  blue: "text-[#2160FF]",
  light_gray: "text-[#8C8C8C]",
};

interface TxtProps extends PropsWithChildren {
  typography?: keyof typeof typographyType;
  color?: keyof typeof colorType;
  className?: string;
}

const Txt = ({
  color = "black",
  typography = "p",
  children,
  className,
}: TxtProps) => (
  <span
    className={classNames(
      colorType[color],
      typographyType[typography],
      className
    )}
  >
    {children}
  </span>
);

export default Txt;
