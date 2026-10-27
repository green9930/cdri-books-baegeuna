# CERTICOS BOOKS

카카오 책 검색 API 기반 도서 검색·찜 목록 웹 애플리케이션

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [실행 방법 및 환경 설정](#2-실행-방법-및-환경-설정)
3. [폴더 구조 및 주요 코드 설명](#3-폴더-구조-및-주요-코드-설명)
4. [라이브러리 선택 이유](#4-라이브러리-선택-이유)
5. [강조하고 싶은 기능](#5-강조하고-싶은-기능)

## 1. 프로젝트 개요

- 화면: 도서 검색, 내가 찜한 책, 404 Not Found
- 주요 기능
  - 도서 전체 검색 및 제목, 저자명, 출판사 상세 검색
  - 검색 기록 최대 8개 보관 (최신순, 중복 시 최상단 이동, 브라우저 재시작 후 유지)
  - 검색 결과 10건 단위 무한 스크롤, 최대 1000건(Kakao API 호출 상한)
  - accordion UI로 상세보기 제공
  - 찜하기 / 찜 해제, 찜 목록 조회 (최근 찜한 순 정렬)
  - API 에러 모달 (401 / 429 / 5xx error)
  - 반응형 UI
- 개발 요구사항 정리 및 화면 명세: [docs/CERTICOS_BOOKS_FEATURES.md](docs/CERTICOS_BOOKS_FEATURES.md)

## 2. 실행 방법 및 환경 설정

### 요구 환경

- Node.js 22.22 이상 (`.nvmrc`: 24)
- pnpm 10 (`package.json`의 `packageManager`, corepack으로 설치)

### 실행

```bash
# 1. pnpm 활성화
corepack enable

# 2. 의존성 설치
pnpm install

# 3. 환경 변수: .env 파일을 프로젝트 루트에 위치 (형식은 .env.example 참고)

# 4. 개발 서버 실행 → http://localhost:5173
pnpm dev
```

### 실행 스크립트 (선택, macOS / Linux / WSL / Git Bash)

실행 환경 확인 → 의존성 설치 → 실행을 한 번에 진행합니다.

```bash
./dev_local.sh              # 개발 서버 (기본 포트 5173)
./dev_local.sh --preview    # production build 후 preview (기본 포트 4173)
PORT=5174 ./dev_local.sh    # 포트 지정
```

| 확인 항목                                      | 실패 시 안내                                        |
| ---------------------------------------------- | --------------------------------------------------- |
| Node.js 설치·버전 (22.22 이상)                 | 설치 / `nvm use`                                    |
| pnpm 설치·버전 (10.x)                          | `corepack enable` / corepack 설치 (Node.js 25 이상) |
| `.env` 파일, API 키 값                         | `.env` 위치, 키 형식                                |
| 카카오 API 키 유효성 (HTTP 상태 코드만 확인)   | 401: 키 확인 / 429·네트워크 오류: 경고 후 계속 실행 |
| 의존성 설치 (`pnpm install --frozen-lockfile`) | 네트워크, `pnpm-lock.yaml` 변경 여부                |
| 포트 사용 여부                                 | 사용 중인 프로세스 표시, 다음 빈 포트로 실행        |
| build (`--preview`)                            | 에러 위치 확인                                      |

### 환경 변수

| 이름                      | 설명               |
| ------------------------- | ------------------ |
| `VITE_KAKAO_REST_API_KEY` | 카카오 REST API 키 |

### 스크립트

| 명령         | 설명                        |
| ------------ | --------------------------- |
| `pnpm dev`   | 개발 서버                   |
| `pnpm build` | 타입 검사 + production 빌드 |

## 3. 폴더 구조 및 주요 코드 설명

### 폴더 구조

```
src
├── api/            # fetch 래퍼, 도서 검색 API, 응답 에러 처리
├── app/            # QueryClient 설정, 라우터
├── assets/         # 아이콘(SVG → React 컴포넌트), 이미지
├── components/
│   ├── book/       # 책 목록·항목·상세·썸네일·찜 버튼 등 책 단위 컴포넌트
│   ├── elements/   # Button, Select, Input, Modal, Spinner 등 공통 UI
│   ├── layout/     # 공통 레이아웃, 네비게이션
│   ├── search/     # 검색바, 검색 기록, 상세 검색, 검색 결과
│   └── wishlist/   # 찜 목록 결과
├── constants/      # 도서·공통·네비게이션·스타일 상수
├── hooks/          # 도서 검색, 무한 스크롤, 찜 목록, 외부 클릭·Esc 닫기
├── pages/          # 도서 검색, 내가 찜한 책, 404
├── state/store/    # Zustand store (찜, 검색 기록, 에러 모달)
├── styles/         # Tailwind 테마 토큰
├── types/          # 도서·스타일 타입
└── utils/          # 도서 표시값 변환, 에러 상태 판별
```

### 주요 코드

| 파일                                | 역할                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------ |
| `api/createFetch.ts`                | 카카오 API base URL, 인증 헤더를 붙이는 fetch 래퍼                       |
| `api/bookAPIs.ts`                   | 도서 검색 요청 (`query`, `target`, `page`, `size`, `signal`)             |
| `api/apiError.ts`                   | HTTP 상태 코드를 담은 `ApiError`, 응답 파싱                              |
| `app/queryClient.ts`                | 5xx만 최대 2회 재시도, 401 / 429 / 5xx 발생 시 에러 모달 활성화          |
| `hooks/useBookSearch.ts`            | 도서 검색 infinite query, stale cache 초기화 (`useResetStaleBookSearch`) |
| `hooks/useInfiniteScroll.ts`        | IntersectionObserver 기반으로 다음 페이지 요청                           |
| `hooks/useWishedBooks.ts`           | 찜 목록 정렬 노출                                                        |
| `hooks/useDismiss.ts`               | Esc 또는 외부 클릭 시 닫기 기능 제공 커스텀 훅                           |
| `components/book/BookResult.tsx`    | 결과 건수 + 빈 상태 or 목록 (검색 결과·찜 목록 공통)                     |
| `components/book/BookList.tsx`      | 책 목록 (검색 목록, 찜 목록 재사용)                                      |
| `components/book/BookItem.tsx`      | 책 목록 내 item 컴포넌트                                                 |
| `state/store/searchHistoryStore.ts` | 검색 기록 관리 zustand store (localStorage persist)                      |
| `state/store/wishStore.ts`          | 찜 목록 관리 zustand store (localStorage persist)                        |

## 4. 라이브러리 선택 이유

| 라이브러리            | 용도            | 선택 이유                                                                                  |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------ |
| React 19 + TypeScript | UI, 타입        | *필수 스택                                                                                 |
| Vite 8                | 개발 서버, 빌드 | 빠른 개발 서버 속도, 간단한 설정                                                           |
| TanStack Query 5      | 서버 상태       | *필수 스택                                                                                 |
| Zustand 5             | 클라이언트 상태 | 필요한 컴포넌트만 리렌더 가능, `persist`로 localStorage 저장 기능 제공, 가벼운 번들 사이즈 |
| React Router 8        | 라우팅          | `createBrowserRouter`, `ScrollRestoration`, 활성 메뉴 표시(`NavLink`)                      |
| Tailwind CSS 4        | 스타일          | `@theme` 토큰으로 디자인 값(색상·타이포·간격) 관리, 반응형 클래스                          |
| vite-plugin-svgr      | 아이콘          | SVG를 React 컴포넌트로 사용 가능                                                           |

## 5. 강조하고 싶은 기능

### 무한 스크롤

- IntersectionObserver로 책 목록 하단 200px 이내 진입 시 다음 페이지 요청
- 마지막 페이지 / 최대 페이지 / 빈 응답일 때 다음 요청 중단
- 다음 페이지 추가 시 신규 10건만 렌더링되고 기존 항목 리렌더 생략
  - `export const BookItem = memo(BookItemComponent);`
- 찜 목록은 메모리의 목록을 10건씩 늘려 노출 (서버 요청 없음)

### 캐시·요청 관리

- query key 생성 함수(`QUERY_KEYS.books`) 하나로 조회·캐시 확인 key 통일
- 같은 검색어 재검색
  - 5분 이내: 캐시 재사용 (요청 없음)
  - 5분 경과: 캐시 초기화 후 1페이지부터 새로 요청 (`isStaleByTime` + `resetQueries`)
  - 화면에서 쓰이지 않는 쿼리는 `isStale()`이 시간을 기준으로 판단하지 않아 `isStaleByTime` 사용
- `skipToken`: 검색 전에는 요청 생략, 요청 함수 안에서 검색 조건 타입 확정 (non-null 단언 없음)
- `signal`: 응답 전에 다른 검색을 하거나 페이지를 이동하면 이전 요청 취소

### 에러 처리

- `QueryCache.onError`에서 401 / 429 / 5xx만 공통 에러 모달로 처리 → 화면 컴포넌트에 에러 처리 코드 없음
- 모달 활성화시 다음 페이지 요청 중지 → 실패한 요청의 무한 반복 방지, 모달을 비활성화할 경우 다시 요청

### 찜하기

- 책 ID: 책 제목 + ISBN 첫 번째 값으로 고유값 설정
- 찜 버튼이 자기 책의 찜 여부만 구독 → 찜 클릭 시 해당 버튼만 리렌더

### 반응형·접근성

- 상세보기: 요약/상세 높이를 측정해 높이 전환 애니메이션 구현
- mobile/tablet/desktop 반응형 UI 구현
  - 지원화면: 최소 너비 360px
  - 반응형 breakpoint: 640px (sm), 768px (md)
- 아이콘 버튼 `aria-label`, 찜 버튼 `aria-pressed`, 상세보기·상세검색 버튼 `aria-expanded`, 로딩 `role="status"`
