import { managementTeam } from "@/src/constants";

const ErrorPage4 = () => {
  return (
    <div className="absolute h-full left-0 top-0 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src="/images/error4.png" alt="error page" />
        <h1 className="text-black text-6xl font-bold mt-12">
          이 페이지를 본 당신,
        </h1>
        <p className="text-dark mt-10 text-2xl font-semibold">
          우리를 찾아봐요.
        </p>
        <div className="flex gap-12 mt-4 justify-between">
          {managementTeam.position.map((occupation) => (
            <div className="text-secondary-100 text-center" key={occupation}>
              <span>{occupation}: </span>
              {managementTeam.member.map(
                ({ generation, name, position }, index) =>
                  position === occupation && (
                    <span
                      className="mr-1"
                      key={index}
                    >{`${generation}기 ${name}`}</span>
                  )
              )}
            </div>
          ))}
        </div>
        <div className="translate-y-64"></div>
      </div>
    </div>
  );
};

export default ErrorPage4;
