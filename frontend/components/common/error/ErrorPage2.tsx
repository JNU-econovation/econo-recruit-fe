import { managementTeam } from "@/src/constants";
import ErrorBtn from "./ErrorBtn";

const ErrorPage1 = () => {
  return (
    <div className="absolute h-full left-0 top-0 w-full flex justify-center items-center">
      <div className="flex items-end gap-20 relative -translate-y-56">
        <div>
          <div className="flex flex-col">
            <h1 className="text-black text-7xl font-bold">이런!</h1>
            <h2 className="text-black text-5xl font-medium mt-4">
              오류가 발생했군요.
            </h2>
            <h3 className="text-3xl font-semibold mt-8">Please Call Us.</h3>
            <p className="text-dark text-xl font-semibold my-2">
              우리에게 연락줘요. 빠르게 처리해드립니다.
            </p>
          </div>
          <ErrorBtn text="go back" />
        </div>
        <div className="translate-y-64">
          <section>
            <img src="/images/error2.png" alt="error page" />
            <div className="flex mt-10 justify-between pr-3 w-10/12 mx-auto">
              {managementTeam.position.map((occupation) => (
                <div
                  className="text-secondary-100 text-center"
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage1;
