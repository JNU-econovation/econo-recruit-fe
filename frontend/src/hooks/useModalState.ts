import { useState } from "react";

const useModalState = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModalState;
