"use client";
import ErrorPage1 from "@/components/common/error/ErrorPage1";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return <ErrorPage1 goBack={goBack} />;
}
