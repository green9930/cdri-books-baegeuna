import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { BookSearchResult } from "@/components/search/BookSearchResult";
import { DetailSearch } from "@/components/search/DetailSearch";
import { SearchBar } from "@/components/search/SearchBar";
import { useSearchHistoryStore } from "@/state/store/searchHistoryStore";
import { QUERY_KEYS, QUERY_STALE_TIME } from "@/constants/commonConstants";
import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";
import type { TBookSearchParams, TSearchTarget } from "@/types/bookTypes";

export const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [params, setParams] = useState<TBookSearchParams | null>(null); // null = 검색 초기 화면
  const [isEmptyKeyword, setIsEmptyKeyword] = useState(false); // 도서 검색 필드 공백 Enter 안내 문구
  const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세 검색 팝업

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

  /* 전체 검색 & 검색 기록 저장
   * - 전체·상세 검색 동시 진행 불가: 상세 검색 팝업 비활성화 - 검색 조건 초기화
   * */
  const handleAllSearch = (query: string) => {
    setIsDetailOpen(false);
    handleSearchRequest({ mode: "all", query });
    addHistory(query);
  };

  /* 상세 검색
   * - 도서 검색 필드 입력값·안내 문구 초기화
   * - 검색 기록 저장 X
   * */
  const handleDetailSearch = (query: string, target: TSearchTarget) => {
    setKeyword("");
    setIsEmptyKeyword(false);
    setIsDetailOpen(false);
    handleSearchRequest({ mode: "detail", query, target });
  };

  return (
    <>
      <title>{`${NAV_LABEL_LIST.search} | ${SERVICE_NAME}`}</title>

      <section className="flex flex-col gap-4">
        <h2 className="text-title2">{NAV_LABEL_LIST.search}</h2>
        <div className="flex items-center gap-4">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleAllSearch}
            isEmptyKeyword={isEmptyKeyword}
            setIsEmptyKeyword={setIsEmptyKeyword}
          />
          <DetailSearch
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
            handleSearch={handleDetailSearch}
          />
        </div>

        <BookSearchResult params={params} />
      </section>
    </>
  );
};
