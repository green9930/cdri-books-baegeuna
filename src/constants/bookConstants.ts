import type { TSearchTargetOption } from "@/types/bookTypes";

export const BOOK_SEARCH_RULES = {
  pageSize: 10,
  maxPage: 100,
  maxSearchInputLength: 100,
  minSearchInputLength: 1,
  maxSearchHistory: 8,
};

export const SEARCH_TARGET_OPTION_VALS = {
  title: "title",
  person: "person",
  publisher: "publisher",
} as const;

export const SEARCH_TARGET_OPTIONS: TSearchTargetOption[] = [
  { value: SEARCH_TARGET_OPTION_VALS.title, label: "제목" },
  { value: SEARCH_TARGET_OPTION_VALS.person, label: "저자명" },
  { value: SEARCH_TARGET_OPTION_VALS.publisher, label: "출판사" },
];

export const BOOK_SEARCH_TEXTS = {
  resultCountLabel: "도서 검색 결과",
  noResults: "검색된 결과가 없습니다.",
  endOfResults: "결과를 모두 불러왔습니다.",
  maxResults: `검색 결과는 최대 ${BOOK_SEARCH_RULES.pageSize * BOOK_SEARCH_RULES.maxPage}건까지 확인할 수 있습니다.`,
};

export const BOOK_DETAIL_TEXTS = {
  contents: "책 소개",
  price: "원가",
  salePrice: "할인가",
};

export const WISHLIST_TEXTS = {
  resultCountLabel: "찜한 책",
  noContent: "찜한 책이 없습니다.",
};
