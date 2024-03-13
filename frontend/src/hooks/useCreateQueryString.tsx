import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string[], value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      name.forEach((el, index) => params.set(el, value[index] || ""));

      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
