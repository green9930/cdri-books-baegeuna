import type { TBookSearchParams } from "@/types/bookTypes";

export const QUERY_KEYS = {
  books: (params: TBookSearchParams | null) => ["books", params] as const,
};

export const QUERY_STALE_TIME = 5 * 60 * 1000; // caching - 5min

export const BTN_TEXTS = {
  purchase: "구매하기",
  detail: "상세보기",
  detailSearch: "상세검색",
  search: "검색하기",
  close: "닫기",
};

export const ARIA_LABELS = {
  wish: "찜하기",
  closeDetailSearch: "상세 검색 닫기",
  deleteHistory: (keyword: string) => `${keyword} 검색 기록 삭제`,
  searchInput: "도서 검색어",
  detailSearchInput: "상세 검색어",
  loading: "불러오는 중",
};

export const PLACEHOLDER_TEXTS = {
  searchBar: "검색어를 입력하세요",
  detailSearch: "검색어 입력",
};

export const SUBTEXTS = {
  emptySearch: "검색어를 입력해 주세요",
};

export const HTTP_ERROR_STATUS = {
  unauthorized: 401,
  tooManyRequests: 429,
  serverError: 500, // 5xx 처리
} as const;

export const MAX_RETRY_COUNT = 2; // 5xx error 재시도 횟수

export const ERROR_MODAL_TEXTS = {
  title: "요청이 실패했습니다.",
  unauthorized: "API Key 설정을 확인해 주세요.",
  tooManyRequests: "요청이 많아 잠시 후 다시 시도해 주세요.",
  serverError: "요청 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
};

export const LOCALSTORAGE_KEYS = {
  wishStore: "certicos-books.wish",
  searchHistoryStore: "certicos-books.search-history",
} as const;
