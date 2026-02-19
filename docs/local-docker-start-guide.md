# 로컬 실행 가이드 for BE

이 문서는 백엔드 개발자를 위해 로컬에서 도커를 실행시켜 API를 테스트 해볼 수 있게 로컬에서 구축할 수 있는 방법을 제공합니다.

# 실행 환경

- 실행하려는 machine에 docker가 준비되어있어야 합니다.

## 1. 환경변수 세팅

먼저, `/frontend` 디렉토리에 `.env.production` 파일을 다음과 같이 생성하세요.

```text
NEXT_PUBLIC_API_URL="<YOUR_API_ENDPOINT>/api/v1"
NEXT_PUBLIC_API_URL_V2="<YOUR_API_ENDPOINT>/api/v2"
NEXT_PUBLIC_STAGE="development"
```

예를 들어 서버가 localhost:8080에서 실행되고 있다면, 환경변수는 다음과 같습니다.

```bash
NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1"
NEXT_PUBLIC_API_URL_V2="http://localhost:8080/api/v2"
...
```

## 2. Docker 이미지 빌드

그다음 **레포지토리 루트**에서 docker image를 빌드합니다.

주의사항: platform은 본인 운영체제에 맞는 버전으로 빌드해야합니다. 따라서 자유롭게 수정해주시기 바랍니다.

```sh
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t econo-recruit-fe:<version> \
  -f frontend/Dockerfile frontend \
```

## 3. 컨테이너 올리기

컨테이너를 실행시킵니다.

```sh
docker run -d \
  --name econo-recruit-fe \
  -p 3000:3000 \
  econo-recruit-fe:<version>
```
