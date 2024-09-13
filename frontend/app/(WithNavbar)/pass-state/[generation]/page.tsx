import Txt from "@/components/common/Txt.component";
import { CURRENT_GENERATION } from "@/src/constants";

const PassStatePage = () => {
  return (
    <div className="flex-1 ml-32 min-w-[46rem] mb-12">
      <div className="mt-20" />
      <Txt typography="h3">
        {CURRENT_GENERATION}기 지원자 합격 상태 관리 페이지
      </Txt>
      <div className="mt-10" />
      {/* main section */}
      <section className="flex flex-col">
        <div className="border-b mb-4">
          <div className="flex py-4 justify-between">
            <Txt
              typography="h6"
              className="flex-[1_0_0] text-left text-secondary-100"
            >
              Member Name
            </Txt>
            <Txt className="flex-[2_0_0] text-left text-secondary-100">
              기수
            </Txt>
            <Txt className="w-[28.5rem] text-left text-secondary-100">
              Status
            </Txt>
          </div>
        </div>
        {/* {userData.map((user, index) => (
        <div className="flex py-4 justify-between" key={index}>
        <Txt typography="h6" className="flex-[1_0_0] text-left truncate">
        {user.name}
        </Txt>
        <Txt className="flex-[2_0_0] text-left truncate">{`${user.year}기`}</Txt>
        <div className="flex gap-6">
        {roleKeys.map((role, index) => (
          <InterViewerUpdateButton role={role} user={user} key={index} />
          ))}
          <button onClick={() => onUserDelete(user.name, user.id)}>
          <Icon icon="trashSquareFill" />
          </button>
          </div>
          </div>
          ))} */}
      </section>
    </div>
  );
};

export default PassStatePage;
