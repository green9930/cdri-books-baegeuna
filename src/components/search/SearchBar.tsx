import { useRef, useState } from "react";

import { SearchInput } from "@/components/elements/SearchInput";
import { SearchHistoryList } from "@/components/search/SearchHistoryList";
import { useDismiss } from "@/hooks/useDismiss";
import { useSearchHistoryStore } from "@/state/store/searchHistoryStore";
import { PLACEHOLDER_TEXTS, SUBTEXTS } from "@/constants/commonConstants";
import { SEARCH_INPUT_MAX_LENGTH } from "@/constants/searchConstants";

interface SearchBarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearch: (query: string) => void; // trim된 검색어 전달
}

export const SearchBar = ({
  keyword,
  setKeyword,
  handleSearch,
}: SearchBarProps) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEmptyKeyword, setIsEmptyKeyword] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const histories = useSearchHistoryStore((state) => state.histories);
  const removeHistory = useSearchHistoryStore((state) => state.removeHistory);

  const isHistoryVisible = isHistoryOpen && histories.length > 0;

  /* 검색 기록: Esc or 외곽 클릭 시 닫힘 */
  useDismiss({
    enabled: isHistoryVisible,
    targetRef: containerRef,
    handleDismiss: () => setIsHistoryOpen(false),
  });

  const handleChange = (value: string) => {
    setKeyword(value);
    setIsHistoryOpen(value === "");
    setIsEmptyKeyword(false);
  };

  const handleFocus = () => {
    setIsHistoryOpen(keyword === ""); // 검색어 없을 경우에만 검색 기록 열림
    setIsEmptyKeyword(false);
  };

  /* Enter로 검색 요청 */
  const handleEnter = () => {
    const query = keyword.trim();
    if (!query) {
      setIsHistoryOpen(false); // 안내 문구가 검색 기록에 가려지지 않도록 비활성화
      setIsEmptyKeyword(true);
      return;
    }

    handleSearch(query);
  };

  const handleSelectHistory = (history: string) => {
    setKeyword(history);
    setIsHistoryOpen(false);
    handleSearch(history);
  };

  return (
    <div ref={containerRef} className="relative z-20 w-120 max-w-full">
      {isHistoryVisible && (
        <SearchHistoryList
          histories={histories}
          handleSelect={handleSelectHistory}
          handleDelete={removeHistory}
        />
      )}
      <div className="relative">
        <SearchInput
          value={keyword}
          setValue={handleChange}
          placeholder={PLACEHOLDER_TEXTS.searchBar}
          maxLength={SEARCH_INPUT_MAX_LENGTH}
          handleFocus={handleFocus}
          handleEnterKeyDown={handleEnter}
        />
      </div>
      {isEmptyKeyword && (
        <p className="absolute -bottom-6 left-0 pl-12.5 text-caption-medium text-red">
          {SUBTEXTS.emptySearch}
        </p>
      )}
    </div>
  );
};
