import {
  skipToken,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getBooks } from "@/api/bookAPIs";
import { BOOK_SEARCH_RULES } from "@/constants/bookConstants";
import { QUERY_KEYS, QUERY_STALE_TIME } from "@/constants/commonConstants";
import type { TBookSearchParams } from "@/types/bookTypes";

export const useBookSearch = (params: TBookSearchParams | null) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.books(params),
    /* params가 없으면(e.g. 검색 초기 화면) skipToken으로 요청 생략 */
    queryFn: params
      ? ({ pageParam, signal }) =>
          getBooks(
            {
              query: params.query,
              target: params.mode === "detail" ? params.target : undefined,
              page: pageParam,
              size: BOOK_SEARCH_RULES.pageSize,
            },
            signal,
          )
      : skipToken,
    initialPageParam: 1,
    /* 마지막 페이지 or 최대 페이지 or 빈 페이지일 경우 다음 요청 없음 */
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (
        lastPage.meta.is_end ||
        lastPageParam >= BOOK_SEARCH_RULES.maxPage ||
        lastPage.documents.length === 0
      )
        return undefined;

      return lastPageParam + 1;
    },
  });
};

export const useResetStaleBookSearch = () => {
  const queryClient = useQueryClient();

  return (params: TBookSearchParams) => {
    const queryKey = QUERY_KEYS.books(params);
    const cachedQuery = queryClient
      .getQueryCache()
      .find({ queryKey, exact: true });
    /* 캐시 데이터 유효성 체크 */
    if (cachedQuery?.isStaleByTime(QUERY_STALE_TIME))
      queryClient.resetQueries({ queryKey, exact: true });
  };
};
