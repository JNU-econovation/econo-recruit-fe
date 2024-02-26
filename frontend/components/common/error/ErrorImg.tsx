import { managementTeam } from "@/src/constants";

export default function ErrorImg() {
  return (
    <section>
      <img src="/images/error2.png" alt="error page" />
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
  );
}
