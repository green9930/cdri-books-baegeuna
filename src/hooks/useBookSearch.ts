import { useInfiniteQuery } from "@tanstack/react-query";

import { getBooks } from "@/api/bookAPIs";
import { QUERY_KEYS } from "@/constants/commonConstants";
import { MAX_PAGE, PAGE_SIZE } from "@/constants/searchConstants";
import type { TBookSearchParams } from "@/types/bookTypes";

export const useBookSearch = (params: TBookSearchParams | null) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.books, params],
    queryFn: ({ pageParam, signal }) =>
      getBooks(
        {
          query: params!.query, // enabled 조건으로 params가 있을 때만 실행
          target: params!.mode === "detail" ? params!.target : undefined,
          page: pageParam,
          size: PAGE_SIZE,
        },
        signal,
      ),
    initialPageParam: 1,
    /* 마지막 페이지 or 최대 페이지 or 빈 페이지일 경우 다음 요청 없음 */
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (
        lastPage.meta.is_end ||
        lastPageParam >= MAX_PAGE ||
        lastPage.documents.length === 0
      )
        return undefined;

      return lastPageParam + 1;
    },
    enabled: params !== null,
  });
};
