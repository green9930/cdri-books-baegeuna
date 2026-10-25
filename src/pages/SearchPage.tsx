import { useState } from "react";

import { SearchInput } from "@/components/elements/SearchInput";
import { BookSearchResult } from "@/components/search/BookSearchResult";
import { SearchHistoryList } from "@/components/search/SearchHistoryList";
import { NAV_LABEL_LIST, SERVICE_NAME } from "@/constants/navConstants";
import { SEARCH_INPUT_MAX_LENGTH } from "@/constants/searchConstants";
import type { TBookSearchParams } from "@/types/bookTypes";

export const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [params, setParams] = useState<TBookSearchParams | null>(null);
  /* test */
  const [histories, setHistories] = useState([
    "노르웨이 숲",
    "무라카미 하루키",
    "긴 검색어 입력시 말줄임 처리 테스트용 확인 테스트 테스트 테스트 테스트 테스트",
  ]);

  const isHistoryOpen = isFocused && keyword === "" && histories.length > 0;

  /* 임시: 5단계 확인용 전체 검색 (6단계 SearchBar에서 교체) */
  const handleSearch = () => {
    const query = keyword.trim();
    if (!query) return;

    setParams({ mode: "all", query });
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <title>{`${NAV_LABEL_LIST.search} | ${SERVICE_NAME}`}</title>

      <section className="flex flex-col gap-4">
        <h2 className="text-title2">{NAV_LABEL_LIST.search}</h2>
        <div className="relative z-20 w-120 max-w-full">
          {isHistoryOpen && (
            <SearchHistoryList
              histories={histories}
              handleSelect={setKeyword}
              handleDelete={(target) =>
                setHistories((prev) => prev.filter((item) => item !== target))
              }
            />
          )}
          <div className="relative">
            <SearchInput
              value={keyword}
              setValue={setKeyword}
              placeholder="검색어를 입력하세요"
              maxLength={SEARCH_INPUT_MAX_LENGTH}
              handleFocus={() => setIsFocused(true)}
              handleBlur={() => setIsFocused(false)}
              handleEnterKeyDown={handleSearch}
            />
          </div>
        </div>

        <BookSearchResult params={params} />
      </section>
    </>
  );
};
