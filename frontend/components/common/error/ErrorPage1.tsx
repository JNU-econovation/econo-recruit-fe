import ErrorBtn from "./ErrorBtn";
import { managementTeam } from "@/src/constants";

const ErrorPage2 = () => {
  return (
    <div className="absolute h-full left-0 top-0 w-full flex justify-center items-center">
      <div className="flex items-end gap-20">
        <section>
          <img src="/images/error1.png" alt="error page" />
          <div className="flex mt-10 justify-between pr-3 w-10/12 mx-auto">
            {managementTeam.position.map((occupation) => (
              <div className="text-secondary-100 text-center" key={occupation}>
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
        <section className="flex flex-col justify-end items-start h-full pb-7">
          <div className="flex flex-col">
            <h1 className="text-black text-7xl font-bold">이런!</h1>
            <h2 className="text-black text-5xl font-medium mt-4">
              오류가 발생했군요.
            </h2>
            <p className="text-dark mt-7 text-xl font-semibold">
              우리에게 연락줘요. 빠르게 처리해드립니다.
            </p>
          </div>
          <ErrorBtn text="앗, 이전 페이지로 돌아가기" />
        </section>
      </div>
    </div>
  );
};

export default ErrorPage2;
