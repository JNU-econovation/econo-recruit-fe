import Txt from "@/components/common/Txt.component";
import { CURRENT_GENERATION } from "@/src/constants";
import { FIANL_DATE } from "@/src/constants/application/27";
import { dateReplacer } from "@/src/functions/replacer";

const ApplicationConsentPage = () => {
  const generation = `${CURRENT_GENERATION}`;
  const finalDate = `${FIANL_DATE.year}.${dateReplacer(
    FIANL_DATE.month
  )}.${dateReplacer(FIANL_DATE.date)}`;

  return (
    <>
      <section className="mx-48 my-32" id="common">
        <h1 className="font-extrabold text-4xl mb-8">
          <a href="#common">개인정보 수집(공통)에 대한 안내</a>
        </h1>
        <article className="leading-relaxed">
          <Txt typography="h6">
            ECONOVATION은 개인정보보호법 등 관련 법규에 의거하여
            ‘ECONOVATION&nbsp;{generation}기 신입 모집 지원서’ 수집을 위해
            아래와 같이 개인 정보를 수집, 이용하고자 합니다.
            <br /> 내용을 면밀히 읽으신 후 동의 여부를 결정하여 주십시오.
          </Txt>
          <p className="py-8">
            1. 수집 이용 항목 : 전화 번호, 이메일, 이름, 전공, 학번
            <br /> 2. 수집 이용 목적 : 지원 절차 진행 및 연락
            <br />
            3. 보유 기간 : 신입 선발 완료(
            {finalDate}) 후 1년까지
          </p>
          <p>
            위의 개인 정보 수집 이용에 대한 동의를 거부할 권리가 있습니다.
            <br />
            그러나 동의를 거부할 경우 모집 절차를 원활하게 진행할 수 없어 선발에
            제한을 받을 수 있습니다.
          </p>
        </article>
      </section>
      <section className="mx-48 my-32" id="portfolio">
        <h1 className="font-extrabold text-4xl mb-8">
          <a href="#portfolio">개인정보 수집(포트폴리오)에 대한 안내</a>
        </h1>
        <article className="leading-relaxed">
          <Txt typography="h6">
            ECONOVATION은 개인정보보호법 등 관련 법규에 의거하여
            ‘ECONOVATION&nbsp;{generation}기 신입 모집 지원서’ 수집을 위해
            아래와 같이 개인 정보를 수집, 이용하고자 합니다.
            <br /> 내용을 면밀히 읽으신 후 동의 여부를 결정하여 주십시오.
          </Txt>
          <p className="py-8">
            1. 서류 이름: 포트폴리오
            <br /> 2. 수집 이용 항목: 이력, 학력, 경력 등 정보 및 저작권
            <br />
            3. 수집 이용 목적: 지원 절차 수행
            <br /> 4. 보유 기간 : 신입 선발 완료(
            {finalDate}) 후 1년까지
          </p>
          <p>
            위의 개인 정보 수집 이용에 대한 동의를 거부할 권리가 있습니다.
            <br />
            그러나 동의를 거부할 경우 포트폴리오에 대한 심사는 제외되므로 관련
            잘차에서 불이익을 받을 수 있습니다.
          </p>
        </article>
      </section>
    </>
  );
};

export default ApplicationConsentPage;
