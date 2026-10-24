import type { TSearchTargetOption } from "@/types/bookTypes";

export const PAGE_SIZE = 10;
export const MAX_PAGE = 50;
export const SEARCH_INPUT_MIN_LENGTH = 1;
export const SEARCH_INPUT_MAX_LENGTH = 100;
export const MAX_SEARCH_HISTORY = 8;

export const SEARCH_TARGET_OPTIONS: TSearchTargetOption[] = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자" },
  { value: "publisher", label: "출판사" },
];
