import { managementTeam } from "@/src/constants";

const ErrorPage6 = () => {
  return (
    <div className="absolute h-full left-0 top-0 w-full flex justify-center items-center">
      <div className="flex items-end gap-20">
        <img src="/images/error6.png" alt="error page" />
        <div className="flex flex-col -translate-y-10">
          <h1 className="text-black text-7xl font-bold">이런!</h1>
          <h2 className="text-black text-5xl font-medium mt-4">
            오류가 발생했군요.
          </h2>
          <h3 className="text-2xl font-semibold mt-12">
            그렇다면, 우리를 찾아줘요.
          </h3>
          <div className="flex items-start flex-col mt-3">
            {managementTeam.position.map((occupation) => (
              <div className="text-secondary-100 text-center" key={occupation}>
                <span>{occupation}: </span>
                {managementTeam.member.map(
                  ({ generation, name, position }, index) =>
                    position === occupation && (
                      <span
                        className=""
                        key={index}
                      >{`${generation}기 ${name}`}</span>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage6;
