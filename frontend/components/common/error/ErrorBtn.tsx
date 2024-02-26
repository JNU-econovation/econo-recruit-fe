"use client";

interface ErrorBtnProps {
  text: string;
}

const ErrorBtn = ({ text }: ErrorBtnProps) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <button
      className="bg-black text-white text-xl px-6 py-2 rounded-full mt-6"
      onClick={goBack}
    >
      {text}
    </button>
  );
};

export default ErrorBtn;
