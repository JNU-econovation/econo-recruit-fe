"use client";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/signin");
  };
  return (
    <button
      className="ml-4 text-sm border-b-2 border-white hover:border-secondary-200 hover:text-secondary-200 transition ease-in-out duration-150"
      onClick={() => logout()}
    >
      로그아웃 &rarr;
    </button>
  );
}
