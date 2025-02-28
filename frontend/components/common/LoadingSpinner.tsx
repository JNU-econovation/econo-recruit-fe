import { cn } from "../../src/utils/cn";

interface LoadingSpinnerProps {
  size?: "s" | "m" | "l" | "xl";
}

const getSize = (size: "s" | "m" | "l" | "xl") => {
  switch (size) {
    case "s":
      return cn("w-6", "h-6");
    case "m":
      return cn("w-12", "h-12");
    case "l":
      return cn("w-18", "h-18");
    case "xl":
      return cn("w-24 h-24");
    default:
      throw new Error(
        "Error: Loading Spinner의 `size` Props는 s, m, l, xl 중 하나 입니다."
      );
  }
};

const LoadingSpinner = ({ size = "s" }: LoadingSpinnerProps) => {
  return (
    <div className={getSize(size)}>
      <svg
        className="mr-3 -ml-1 size-5 animate-spin text-black"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
