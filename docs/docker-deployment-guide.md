# Docker Deployment Guide

## 1) Build image

**레포지토리 루트**에서 실행하세요. 먼저, 반드시 .env.production 파일을 준비해야 합니다.

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t leeyunseong/econo-recruit-fe:<version> \
  -f frontend/Dockerfile frontend \
  --push
```

## 2) Run locally

```bash
docker run -d \
  --name econo-recruit-fe \
  -p 3000:3000 \
  econo-recruit-fe:<version>
```

## 3) Push to registry

먼저 Docker Hub Push 권한을 관리자에게 요청 부탁드립니다.

```bash
docker tag econo-recruit-fe:<version> leeyunseong/econo-recruit-fe:<version>
docker push leeyunseong/econo-recruit-fe:<version>
```

## 4) Run on EC2

```bash
docker pull leeyunseong/econo-recruit-fe:<version>
docker run -d \
  --name econo-recruit-fe \
  --restart unless-stopped \
  -p 3000:3000 \
  leeyunseong/econo-recruit-fe:<version>
```

## Notes

- Default app port in container: `3000`.
- `NEXT_PUBLIC_*` values are baked into assets at image build time.
- Docker build will fail fast if required public vars are missing.
- Keep runtime `--env-file` as well if server routes read non-public env values.
- Ensure EC2 Security Group allows inbound traffic on the service port (for example `80` or `3000`).
