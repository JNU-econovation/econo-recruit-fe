import { managementTeam } from "@/src/constants";
import ErrorBtn from "./ErrorBtn";

const ErrorPage3 = () => {
  return (
    <div className="absolute h-full left-0 top-0 w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-black text-7xl font-bold">이런!</h1>
        <h2 className="text-black text-5xl font-medium mt-4">
          오류가 발생했군요.
        </h2>
        <div className="flex items-end -translate-x-10">
          <div className="flex flex-col justify-between translate-x-12">
            {managementTeam.position.map((occupation) => (
              <div
                className="text-secondary-100 text-center my-10"
                key={occupation}
              >
                <h3>{occupation}</h3>
                {managementTeam.member.map(
                  ({ generation, name, position }, index) =>
                    position === occupation && (
                      <span
                        className="mx-1"
                        key={index}
                      >{`${generation}기 ${name}`}</span>
                    )
                )}
              </div>
            ))}
          </div>
          <img src="/images/error3.png" alt="error page" />
        </div>
        <p className="text-xl font-bold mt-4">그렇다면, 우리를 찾아줘요.</p>
        <ErrorBtn text="돌아가기" />
      </div>
    </div>
  );
};

export default ErrorPage3;
