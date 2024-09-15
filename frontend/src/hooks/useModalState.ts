import { useState } from "react";

const useModalState = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  };
};

export default useModalState;
