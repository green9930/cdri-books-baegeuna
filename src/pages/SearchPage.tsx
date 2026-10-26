import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { BookSearchResult } from "@/components/search/BookSearchResult";
import { SearchBar } from "@/components/search/SearchBar";
import { useSearchHistoryStore } from "@/state/store/searchHistoryStore";
import { QUERY_KEYS, QUERY_STALE_TIME } from "@/constants/commonConstants";
import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";
import type { TBookSearchParams } from "@/types/bookTypes";

export const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [params, setParams] = useState<TBookSearchParams | null>(null); // null = 검색 초기 화면

  const queryClient = useQueryClient();
  const addHistory = useSearchHistoryStore((state) => state.addHistory);

  const handleSearchRequest = (nextParams: TBookSearchParams) => {
    const queryKey = [QUERY_KEYS.books, nextParams];
    const cachedQuery = queryClient
      .getQueryCache()
      .find({ queryKey, exact: true });
    /* 캐시 데이터 유효성 체크 */
    if (cachedQuery?.isStaleByTime(QUERY_STALE_TIME))
      queryClient.resetQueries({ queryKey, exact: true });

    setParams(nextParams);
    window.scrollTo({ top: 0 });
  };

  /* 전체 검색 & 검색 기록 저장 */
  const handleAllSearch = (query: string) => {
    handleSearchRequest({ mode: "all", query });
    addHistory(query);
  };

  return (
    <>
      <title>{`${NAV_LABEL_LIST.search} | ${SERVICE_NAME}`}</title>

      <section className="flex flex-col gap-4">
        <h2 className="text-title2">{NAV_LABEL_LIST.search}</h2>
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={handleAllSearch}
        />

        <BookSearchResult params={params} />
      </section>
    </>
  );
};
