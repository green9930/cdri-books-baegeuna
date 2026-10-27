#!/usr/bin/env bash
# 로컬 실행 스크립트: 실행 환경 확인 → 의존성 설치 → 개발 서버(또는 build + preview) 실행
#   ./dev_local.sh              개발 서버 (기본 포트 5173)
#   ./dev_local.sh --preview    production build 후 preview (기본 포트 4173)
#   PORT=5174 ./dev_local.sh    포트 지정
# macOS / Linux / WSL / Git Bash 지원

set -u

REQUIRED_NODE_MAJOR=22
REQUIRED_NODE_MINOR=22
REQUIRED_PNPM_MAJOR=10
ENV_KEY_NAME="VITE_KAKAO_REST_API_KEY"
KAKAO_CHECK_URL="https://dapi.kakao.com/v3/search/book?query=test&size=1"

MODE="dev"

ok() { printf "  \033[32m✓\033[0m %s\n" "$1"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$1"; }
fail() {
  printf "  \033[31m✗\033[0m %s\n" "$1"
  shift
  for hint in "$@"; do printf "      → %s\n" "$hint"; done
  exit 1
}
step() { printf "\n\033[1m[%s]\033[0m\n" "$1"; }

print_help() {
  sed -n '2,6p' "$0" | sed 's/^# \{0,1\}//'
}

for arg in "$@"; do
  case "$arg" in
    --preview) MODE="preview" ;;
    -h | --help)
      print_help
      exit 0
      ;;
    *) fail "알 수 없는 옵션: $arg" "./dev_local.sh --help 로 사용법 확인" ;;
  esac
done

if [ "$MODE" = "preview" ]; then
  PORT="${PORT:-4173}"
else
  PORT="${PORT:-5173}"
fi

# 스크립트 위치(프로젝트 루트)에서 실행
cd "$(dirname "$0")" || fail "프로젝트 폴더로 이동할 수 없습니다."

step "1. 프로젝트 확인"
[ -f package.json ] || fail "package.json이 없습니다." "dev_local.sh가 프로젝트 루트에 있는지 확인"
ok "프로젝트 루트: $(pwd)"

step "2. Node.js 확인"
command -v node >/dev/null 2>&1 ||
  fail "Node.js가 설치되어 있지 않습니다." \
    "Node.js ${REQUIRED_NODE_MAJOR}.${REQUIRED_NODE_MINOR} 이상 설치 (https://nodejs.org)" \
    "nvm 사용 시: nvm install (.nvmrc 기준)"

NODE_VERSION="$(node -v | sed 's/^v//')"
NODE_MAJOR="${NODE_VERSION%%.*}"
NODE_MINOR="$(echo "$NODE_VERSION" | cut -d. -f2)"
if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ] ||
  { [ "$NODE_MAJOR" -eq "$REQUIRED_NODE_MAJOR" ] && [ "$NODE_MINOR" -lt "$REQUIRED_NODE_MINOR" ]; }; then
  fail "Node.js 버전이 낮습니다. (현재 v${NODE_VERSION}, 필요 ${REQUIRED_NODE_MAJOR}.${REQUIRED_NODE_MINOR} 이상)" \
    "nvm 사용 시: nvm install && nvm use (.nvmrc 기준)" \
    "또는 https://nodejs.org 에서 최신 LTS 설치"
fi
ok "Node.js v${NODE_VERSION}"

step "3. pnpm 확인"
if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    fail "pnpm이 활성화되어 있지 않습니다." "corepack enable 실행 후 다시 실행"
  fi
  fail "pnpm과 corepack이 모두 없습니다. (Node.js 25부터 corepack 기본 미포함)" \
    "npm install -g corepack && corepack enable" \
    "또는 npm install -g pnpm@${REQUIRED_PNPM_MAJOR}"
fi

PNPM_VERSION="$(pnpm -v 2>/dev/null)" ||
  fail "pnpm을 실행할 수 없습니다." "corepack enable 실행 후 다시 실행"
PNPM_MAJOR="${PNPM_VERSION%%.*}"
if [ "$PNPM_MAJOR" != "$REQUIRED_PNPM_MAJOR" ]; then
  fail "pnpm 버전이 다릅니다. (현재 ${PNPM_VERSION}, 필요 ${REQUIRED_PNPM_MAJOR}.x)" \
    "corepack enable 실행 → package.json의 packageManager 버전으로 자동 실행" \
    "또는 npm install -g pnpm@${REQUIRED_PNPM_MAJOR}"
fi
ok "pnpm ${PNPM_VERSION}"

step "4. 환경 변수 확인"
[ -f .env ] ||
  fail ".env 파일이 없습니다." \
    "전달된 .env 파일을 프로젝트 루트에 위치" \
    "형식: .env.example 참고"

# 키 값은 출력하지 않는다
API_KEY="$(grep -E "^${ENV_KEY_NAME}=" .env | tail -n 1 | cut -d= -f2- | tr -d "\"' \r")"
[ -n "$API_KEY" ] ||
  fail ".env에 ${ENV_KEY_NAME} 값이 없습니다." "${ENV_KEY_NAME}=발급받은_REST_API_키 형식으로 입력"
ok "${ENV_KEY_NAME} 설정됨"

if command -v curl >/dev/null 2>&1; then
  # 응답 본문에 키가 포함될 수 있어 상태 코드만 확인
  STATUS="$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 \
    -H "Authorization: KakaoAK ${API_KEY}" "$KAKAO_CHECK_URL")"
  case "$STATUS" in
    200) ok "카카오 API 키 확인 (HTTP 200)" ;;
    401) fail "카카오 API 키가 유효하지 않습니다. (HTTP 401)" "전달된 .env의 키 값 확인" ;;
    429) warn "카카오 API 요청 한도 초과 (HTTP 429). 실행은 계속하지만 검색이 실패할 수 있습니다." ;;
    000) warn "카카오 API에 연결할 수 없습니다. (네트워크·방화벽 확인) 실행은 계속합니다." ;;
    *) warn "카카오 API 응답 HTTP ${STATUS}. 실행은 계속하지만 검색이 실패할 수 있습니다." ;;
  esac
else
  warn "curl이 없어 API 키 확인을 건너뜁니다."
fi
unset API_KEY

step "5. 의존성 설치"
if [ ! -f node_modules/.modules.yaml ] || [ pnpm-lock.yaml -nt node_modules/.modules.yaml ]; then
  pnpm install --frozen-lockfile ||
    fail "의존성 설치에 실패했습니다." \
      "네트워크·프록시·npm 레지스트리 접근 확인" \
      "pnpm-lock.yaml이 변경되지 않았는지 확인 (git status)"
  ok "의존성 설치 완료"
else
  ok "의존성 설치되어 있음"
fi

step "6. 포트 확인"
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  PROCESS="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN | awk 'NR == 2 { print $1 " (PID " $2 ")" }')"
  warn "포트 ${PORT}를 ${PROCESS}이(가) 사용 중입니다. 다음 빈 포트로 자동 실행됩니다."
  printf "      → 실제 주소는 아래 Local 주소 확인 / 포트 지정: PORT=%s ./dev_local.sh\n" "$((PORT + 1))"
else
  ok "포트 ${PORT} 사용 가능"
fi

if [ "$MODE" = "preview" ]; then
  step "7. production build"
  pnpm build || fail "build에 실패했습니다." "위 에러 메시지의 파일·줄 확인" "pnpm lint 로 추가 확인"
  ok "build 완료"

  step "8. preview 실행 (종료: Ctrl + C)"
  exec pnpm preview --port "$PORT"
fi

step "7. 개발 서버 실행 (종료: Ctrl + C)"
exec pnpm dev --port "$PORT"
