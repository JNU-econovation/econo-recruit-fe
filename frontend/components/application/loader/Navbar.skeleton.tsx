const NavbarSkeleton = () => {
  const questions = Array.from({ length: 12 });
  return (
    <nav className="pl-12 max-w-[444px] h-full flex-1 max-h-screen overflow-y-hidden">
      {questions.map((_, index) => (
        <button className={"text-left p-4 relative block"}>
          {index !== questions.length - 1 && (
            <div className="absolute border-l-2 h-full -left-[13px] top-8 -z-10 transition-all border-gray-300" />
          )}
          <div className="before:h-2 before:w-2 before:rounded-full before:absolute before:translate-y-full before:-translate-x-8 transition-all before:bg-gray-300">
            <div className="transition-all bg-gray-100 h-9 w-96 rounded-lg animate-pulse" />
          </div>
        </button>
      ))}
    </nav>
  );
};

export default NavbarSkeleton;
