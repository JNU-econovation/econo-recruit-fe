"use client";
import { signOut } from "@/src/apis/user";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const onLogout = async () => {
    await signOut();
    router.push("/signin");
  };
  return (
    <button
      className="ml-4 text-sm border-b-2 border-white text-secondary-100 hover:border-dark hover:text-dark transition ease-in-out duration-150"
      onClick={onLogout}
    >
      로그아웃 &rarr;
    </button>
  );
}
