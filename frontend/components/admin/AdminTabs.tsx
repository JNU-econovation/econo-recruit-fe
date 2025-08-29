"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTabs() {
  const pathname = usePathname();

  const match = pathname.match(/^\/admin\/([^\/]+)/);
  const generation = match ? match[1] : "";

  if (!generation) return null;

  const tabs = [
    { name: "멤버 권한 변경", href: `/admin/${generation}` },
    { name: "지원서 on/off", href: `/admin/${generation}/on-off` },
  ];

  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-200 ${
              isActive
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
