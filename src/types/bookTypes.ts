import type { SEARCH_TARGET_OPTION_VALS } from "@/constants/bookConstants";

export type TSearchTarget = keyof typeof SEARCH_TARGET_OPTION_VALS;

export type TSearchTargetOption = { value: TSearchTarget; label: string };

export type TBookSearchParams =
  | { mode: "all"; query: string }
  | { mode: "detail"; query: string; target: TSearchTarget };

export type TBookData = {
  title: string;
  contents: string;
  url: string;
  isbn: string; // ISBN10 ISBN13
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};

export type TWishedBook = TBookData & { wishedAt: number };

export type TBookSearchRequest = {
  query: string;
  target?: TSearchTarget;
  page: number;
  size: number;
};

export type TBookSearchMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type TBookSearchResponse = {
  meta: TBookSearchMeta;
  documents: TBookData[];
};
