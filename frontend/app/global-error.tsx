"use client";
import Icon from "@/components/common/Icon";
import { managementTeam } from "@/src/constants";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="w-full flex items-end justify-center gap-20 absolute top-1/2 transform -translate-y-1/2">
      <section>
        <Icon icon="threeDots" />
        <div className="flex mt-10 justify-between pr-3 w-10/12 mx-auto">
          {managementTeam.position.map((occupation) => (
            <div className="text-[#6d6d6d] text-center" key={occupation}>
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
        <h1 className="text-black text-[65.97px] font-bold">이런!</h1>
        <h2 className="text-black text-[44.89px] font-medium">
          오류가 발생했군요.
        </h2>
        <p className="text-zinc-800 mt-7 text-xl font-semibold">
          우리에게 연락줘요. 빠르게 처리해드립니다.
        </p>
        <button
          className="bg-black text-white text-xl px-6 py-2 rounded-full mt-6"
          onClick={reset}
        >
          앗, 이전 페이지로 돌아가기
        </button>
      </section>
    </section>
  );
}
