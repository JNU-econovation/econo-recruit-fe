import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const useModalState = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const router = useRouter();
  const pathname = usePathname();

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    router.push(pathname);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModalState;
