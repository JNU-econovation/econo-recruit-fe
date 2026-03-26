# 질문/지원서 도메인 통합을 위한 기존 타입 정리 및 공통 모델 초안

## 개요 (Overview)

현재 질문 데이터는 **지원서 작성 도메인(`application`)**과 **지원서 조회 도메인(`applicant`)**으로 분리되어 있습니다.

- 작성 도메인: 입력 UI 렌더링, 필수 여부/검증, 제출 payload 생성에 최적화됨
- 조회 도메인: 저장된 answer를 읽기 좋은 형태로 재구성하는 데 최적화됨

즉, 두 도메인은 동일한 비즈니스 대상(지원 질문)을 다루지만, 책임(Responsibility)이 다르기 때문에 표현 모델도 달라졌습니다.

- 작성 모델 중심 파일
  - `frontend/src/constants/application/type.d.ts`
  - `frontend/src/constants/application/*`
  - `frontend/src/hooks/useApplication.tsx`
- 조회 모델 중심 파일
  - `frontend/src/constants/applicant/type.d.ts`
  - `frontend/src/constants/applicant/*`
  - `frontend/components/applicant/DetailRight.component.tsx`

---

## 현재 동작/구조 정리 (Behavior)

### 1) 작성 도메인(`application`)의 타입 성격

`ApplicationQuestion` + `ApplicationNode` 유니온으로 구성되어, “어떤 입력 컴포넌트를 렌더링할지”를 중심으로 모델링되어 있습니다.

- 노드 타입 예시: `text`, `textarea`, `radio`, `checkboxWithEtc`, `timeline`, `booleanTextarea` 등
- 노드 속성 예시: `name`, `require`, `validate`, `replace`, `errorMessages`, `maxLength`
- 재귀 구조: `nodes`, `subNodes`를 통해 복합 질문을 표현

이 구조는 **표현 계층(UI) + 입력 제약(Validation)** 에 강합니다.

### 2) 조회 도메인(`applicant`)의 타입 성격

`ApplicantNode`는 “조회 화면에서 어떻게 묶어서 보여줄지” 중심으로 모델링되어 있습니다.

- 노드 타입 예시: `customField`, `customHuman`, `shortSplit`, `textarea`, `timeline`
- 핵심은 입력 위젯 정보가 아니라, answer key를 어떤 그룹으로 보여줄지(`value`, `subValue`)입니다.

이 구조는 **읽기/검토 화면(View Model)** 에 강합니다.

### 3) 분리가 생긴 직접 원인

- 작성 화면은 직군 선택(`field`) 시점에 질문 집합을 동적으로 합성합니다.
  - 공통 질문 + 직군별 질문을 atom에 병합
- 조회 화면도 동일하게 직군별 조회 노드를 병합하지만, 조회 목적에 맞는 별도 타입을 사용합니다.
- 결국 같은 질문의 원천 데이터가 아니라, 두 개의 “용도별 투영(projection)”이 따로 유지됩니다.

### 4) 현재 구조의 유지보수 리스크

- 질문 추가/수정 시 `application`과 `applicant`를 동시 변경해야 함
- 일부 검증/예외 로직이 질문 ID와 직군에 강하게 결합되어 있음
  - 예: `questionId === 4`, 개발자만 포트폴리오 체크 등
- 특정 세대(31기) 경로를 컴포넌트에서 직접 import하는 코드가 있어, 세대 전환 시 변경 지점이 늘어남

---

## 질문 타입 vs 조회 화면 타입이 분리되어 보이는 이유

객체지향 관점에서 보면, 현재는 “질문(도메인 엔티티)”보다 “화면 책임(작성/조회)”이 우선된 설계입니다.

- 장점: 각 화면이 단순하고 빠르게 구현됨
- 단점: **단일 책임 원칙(SRP)** 은 지켰지만, 질문 자체의 **단일 진실 공급원(SSOT)** 이 약해짐

즉, 지금의 분리는 잘못이라기보다 “View 최적화가 Entity 정합성보다 우선된 결과”입니다.

---

## 공통 모델 초안 (application + applicant 통합 준비)

아래는 질문 자체를 중심으로 한 **중립 도메인 모델(Domain Question)** 초안입니다.

```ts
interface DomainQuestion {
  id: string;                // 안정 식별자 (숫자 id 의존 완화)
  order: number;             // 화면 배치 순서
  stage: "common" | "developer" | "designer" | "manager";

  prompt: {
    title: string;
    subtitle?: string;
    alert?: string;
  };

  input: {
    kind:
      | "text"
      | "textarea"
      | "singleChoice"
      | "multiChoice"
      | "multiChoiceEtc"
      | "booleanTextarea"
      | "timeline";
    key: string;             // 저장 키(name)
    required: boolean;
    options?: string[];
    rules?: {
      validator?: string;
      replacer?: string;
      maxLength?: number;
      minLength?: number;
    };
  };

  review: {
    group: "customField" | "customHuman" | "shortSplit" | "default";
    label?: string;          // 조회 시 표시 라벨
    formatter?: string;      // 조회용 포맷터 키
  };

  policies?: {
    visibility?: string;     // 조건부 노출 식
    requiredWhen?: string;   // 조건부 필수 식
  };
}
```

### 설계 의도

- **개방-폐쇄 원칙(OCP)**: 노드 타입 추가 시 `input.kind` 확장만으로 대응
- **인터페이스 분리(ISP)**: 작성/조회는 `DomainQuestion`에서 각각 필요한 속성만 사용
- **의존성 역전(DIP)**: 화면은 상수 파일에 직접 의존하지 않고, 도메인 모델을 해석하는 어댑터에 의존

---

## 도메인 분리 시 고려사항 (지원자 작성 vs 면접관 검토)

### 공통으로 관리해야 하는 속성

- 질문 식별자(`id`, `key`)
- 질문 원문(`title`, `subtitle`)
- 직군/기수 적용 범위(`stage`, generation scope)
- 필수 여부/검증 정책(`required`, validator)
- 저장 규격(단일값/배열/시간표)

### 차이점이 생기는 속성

- 작성 도메인 전용
  - 위젯 배치(`direction`), UX 힌트(`example`, `errorMessages`), replace 정책
- 검토 도메인 전용
  - 묶음 단위(`customHuman` 등), 표시 라벨, 요약 포맷터

핵심은 “질문 정의는 공통”, “표현 방식은 도메인별 어댑터”입니다.

---

## 예시 (Examples)

### 예시 1) `channel`(지원 경로)

- 공통 질문 정의: `key=channel`, `kind=multiChoiceEtc`, `required=true`
- 작성 어댑터: 체크박스 + 기타 입력(`channelEtc`) 결합
- 조회 어댑터: 단일 문자열(콤마 구분) 혹은 배열을 읽기용 라벨로 변환

### 예시 2) 면접 시간(`timeline`)

- 공통 질문 정의: `key=timeline`, `kind=timeline`, `required=true`
- 작성 어댑터: 슬롯 선택 UI
- 조회 어댑터: 선택 슬롯을 인터뷰어가 읽기 좋은 시간 범위로 포맷

### 예시 3) 개인정보 동의

- 공통 질문 정의: `kind=singleChoice`, `required=true`, 옵션=`동의합니다/동의하지 않습니다`
- 작성 어댑터: radio 렌더링 + 제출 전 강제 검증
- 조회 어댑터: 동의 여부 배지/텍스트 표시

---

## 주의사항 (Caveats)

1. **질문 ID 하드코딩 제거 우선**
   - 현재는 `useApplication`에서 질문 ID 기반 분기 로직이 존재
   - 통합 전, `id` 대신 `key`/`policy` 기반 규칙으로 전환 필요

2. **세대/직군 경로 의존 축소**
   - 일부 컴포넌트가 `31` 경로를 직접 import
   - 세대 상수 기반 동적 로딩으로 일관화 필요

3. **API 저장 포맷 정합성 보장**
   - `channel`, `timeline`처럼 직렬화 규칙이 있는 필드는
   - 도메인 모델에 serializer/deserializer를 명시해 양방향 오차 방지 필요

4. **점진 이전 전략 권장**
   - 1단계: 공통 질문 정의 파일 도입
   - 2단계: 작성/조회 어댑터 레이어 도입
   - 3단계: 기존 `application/*`, `applicant/*`를 어댑터 생성 결과로 대체

---

## 결론

현재 구조는 화면별 최적화에는 유리하지만, 질문 자체의 변경 추적/재사용에는 불리합니다.

따라서 다음 목표는 “질문 도메인 엔티티의 통합”과 “작성/조회의 어댑터 분리”입니다. 이 방향은 확장성(새 질문 타입/새 직군), 유지보수성(중복 제거), 테스트 용이성(정책 단위 검증) 측면에서 가장 안전한 개선 경로입니다.
