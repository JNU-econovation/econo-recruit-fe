# Contribution Guidelines

먼저, 에코노베이션 신입모집 플랫폼에 기여해주셔서 감사합니다! 이 문서는 기여를 하기 위해 지켜야 할 규칙에 대해 나타납니다.

## Contributor

이 프로젝트는 에코노 회원들에 의해서만 기여를 할 수 있습니다. 에코노 회원이 아닌 제3자가 기여할 시, reject될 수 있음을 유의해주세요.

## Documentation

아래 문서들은 여러분의 기여에 도움을 주는 문서들 입니다.

- [Discussions](https://github.com/JNU-econovation/econo-recruit-fe/discussions)
  - 프로젝트에 관련된 여러 논의를 볼 수 있습니다.
- [Wiki](https://github.com/JNU-econovation/econo-recruit-fe/wiki)
  - 코딩컨벤션, 테스트 작성 가이드 등을 참고할 수 있습니다.
- Econovation Recruit Manual
  - 이 문서는 동아리 원이 아닌 외부인은 열람이 불가합니다. 따라서, 관리부 혹은 프로젝트 관리자에게 문의해주시기 바랍니다.

## Project Setup

1. 프로젝트 루트 디렉토리 기준으로, `/frontend` 디렉토리로 이동합니다.

```
cd frontend
```

2. pnpm을 통해 설치합니다.(사전에 node 또한 설치되어야 합니다.) 이 때 권장되는 버전은 다음과 같습니다.

- `pnpm`: 8.10.2
- `node`: v20.9.0

\*\*빌드 시, `bun`등 다른 런타임을 사용해도 되나, 권장하지 않습니다.

```
pnpm install
```

3. 적절한 `.env`를 `/frontend` 디렉토리에 저장합니다. 이 때, `.env`에 관한 내용은 관리자에게 문의해주세요.

4-1. 프로젝트를 개발환경에서 실행하고 싶을 시, 다음의 명령어를 수행합니다.

```
pnpm run dev
```

4-2. 프로젝트를 로컬에서 운영환경으로 서빙하고 싶을 시, 다음의 명령어를 수행합니다.

```
pnpm run build
pnpm start
```

> ⚠️ 모든 명령어는 `/frontend` 디렉토리 내에서 수행되어야 함을 주의하세요.

## Open Issues

프로젝트에 어떤 이슈를 열고 싶을 때는, [Issue Template](https://github.com/JNU-econovation/econo-recruit-fe/issues/new/choose) 를 꼭 따라주세요.

원하는 이슈 템플릿이 없다면 자유롭게 [Discussions](https://github.com/JNU-econovation/econo-recruit-fe/discussions)에 발의 해주시기 바랍니다.

## Committing and Pushing changes

이 프로젝트는 Github Flow를 통해 관리되고 있습니다.

### Creating Branch

원하는 이슈를 통해 브랜치를 생성해주세요. 브랜치 이름은 다음의 형식을 권장합니다.

```
<작업유형>/<issue_number>-<작업에 대한 제목>
```

**예시**

```
feat/123-pass-status-page-markup
docs/234-enhancement-readme-content
```

### Create Commit

커밋 컨벤션은 다음과 같습니다.

- `feat`: 기능 추가/개선 등
- `refactor`: 리팩터링(기존과 동일한 동작을 하되 코드 구조가 변경된 경우)
- `fix`: 버그에 대한 수정
- `style`: 린팅, 프리티어, 코드 스타일 등의 수정
- `test`: 테스트 파일 작성
- `docs`: 문서에 관한 수정
- `build`: Github Action, 의존성 추가 등 빌드에 관련된 작업
- `chore`: 정적 파일 추가 제거 등 기타 작업

### Merge Stage

Merge는 관리자들의 코드리뷰를 통해 이뤄집니다.
Pull Request의 Stage는 다음과 같습니다.

> 💡 해당 상태는 base브랜치가 main 일 때만 적용되는 규칙입니다.

#### Reviewing

- PR 리뷰가 진행중인 상태입니다.

#### Approve

- 모든 관리자에게 Approve 상태 일 때, 해당 상태로 변경합니다.

#### Resolving Merge Confilct

- PR이 Approve 상태이나, Merge Confilct가 해결되지 않은 상태입니다.

#### Ready for Merge

- Approve 상태이면서 Resolving Merge Confilct 상태가 해결되었을 때 나타냅니다.

PR은 `Ready for Merge` 상태일 때 Merge 합니다. Merge는 `Create Merge Commit`을 통해 진행하고, 이 때 커밋명은 다음과 같습니다.

```
<type>: <PR-title> (#pr-number)
```

**커밋명 예시**

```
fix: 합불 상태 변경 요청 method가 올바르지 않았던 버그 수정 (#222)
feat: 합/불 상태관리 페이지 추가 (#205)
```

## Release Note

우리는 운영환경에 배포될 때, Release note를 작성합니다. 그 이유는 임의의 버전을 검증한 이후에 운영환경에 올리기 때문입니다.

따라서, main에 merge가 되었다고 배포가 되는 것이 아닌, 내부 논의를 통해서 운영 배포 커밋을 결정합니다.

이를 통해 배포를 하였다면, 배포된 커밋에 릴리즈 노트를 작성해야 합니다.

### Semantic Versioning

먼저, 우리는 유의적 버저닝을 통해 버전을 관리합니다.
아래는 간단한 버저닝 기준을 나타냅니다.

#### Major Version(주)

- 신입모집 프로세스의 변경
- 프레임워크의 변경

#### Minor Version(부)

- 기존에 없던 신규 페이지 생성
- 라이브러리 버전 업으로 인해 하위호환성을 유지할 수 없는 상황
- 프로젝트 구조의 큰 변경

#### Patch Version(수)

- 간단한 버그, 오타 수정
- 기존 페이지 내에서 API 수정 및 추가

\*\* 문서 수정 커밋은 버저닝 태그가 될 수 없습니다. 다음 배포 릴리즈 태그에 포함시켜주세요.
