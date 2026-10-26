import type { TSearchTargetOption } from "@/types/bookTypes";

export const PAGE_SIZE = 10;
export const MAX_PAGE = 50;
export const SEARCH_INPUT_MIN_LENGTH = 1;
export const SEARCH_INPUT_MAX_LENGTH = 100;
export const MAX_SEARCH_HISTORY = 8;

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

export const NO_RESULTS_MESSAGE = "검색된 결과가 없습니ㄴ다.";
export const END_OF_RESULTS_MESSAGE = "결과를 모두 불러왔습니다.";
export const MAX_RESULTS_MESSAGE =
  "검색 결과는 최대 500건까지 확인할 수 있습니다.";
