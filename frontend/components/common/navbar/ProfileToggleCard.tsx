"use client";

import { useState } from "react";
import Image from "next/image";
import econoLogo from "@/public/images/econo-3d-logo.png";

interface ProfileToggleCardProps {
  children: React.ReactNode;
}

const ProfileToggleCard = ({ children }: ProfileToggleCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative flex items-center cursor-pointer"
      onClick={toggleContent}
    >
      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
        <Image
          src={econoLogo}
          alt="Econo 3D Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {isOpen && (
        <div className="absolute left-full top-0 ml-2 bg-white shadow-md rounded-lg px-3 py-2 transition-all duration-300 ease-in-out whitespace-nowrap">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileToggleCard;
