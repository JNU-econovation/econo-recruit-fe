"use client";

import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  localStorage.remove("accessToken");
  localStorage.remove("refreshToken");
  router.replace("/signin");
}
