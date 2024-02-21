import { PropsWithChildren } from "react";
import { cn } from "@/src/utils/cn";

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
  gray: "text-secondary-200",
  white: "text-white",
  blue: "text-primary",
  light_gray: "text-secondary-200",
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
    className={cn(
      "text-black text-base",
      { [colorType[color]]: color !== "black" },
      { [typographyType[typography]]: typography !== "p" },
      className
    )}
  >
    {children}
  </span>
);

export default Txt;
