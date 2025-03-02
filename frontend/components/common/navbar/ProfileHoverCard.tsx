"use client";

import Image from "next/image";
import econoLogo from "@/public/images/econo-3d-logo.png";

interface ProfileHoverCardProps {
  children: React.ReactNode;
}

const ProfileHoverCard = ({ children }: ProfileHoverCardProps) => {
  return (
    <div className="flex items-center">
      <div className="relative group">
        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
          <Image
            src={econoLogo}
            alt="Econo 3D Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute left-full top-0 ml-2 transition-all duration-300 ease-in-out opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileHoverCard;
