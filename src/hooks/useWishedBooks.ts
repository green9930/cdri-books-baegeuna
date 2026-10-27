import { useMemo, useState } from "react";

import { useWishStore } from "@/state/store/wishStore";
import { BOOK_SEARCH_RULES } from "@/constants/bookConstants";

export const useWishedBooks = () => {
  const wishedBooks = useWishStore((state) => state.wishedBooks);
  const [visibleCount, setVisibleCount] = useState(BOOK_SEARCH_RULES.pageSize);

  const sortedBooks = useMemo(
    () => Object.values(wishedBooks).sort((a, b) => b.wishedAt - a.wishedAt), // 최신 순 정렬
    [wishedBooks],
  ); // 스크롤할 때마다 목록 재정렬 방지

  const handleNextPage = () =>
    setVisibleCount((prev) => prev + BOOK_SEARCH_RULES.pageSize);

  return {
    books: sortedBooks.slice(0, visibleCount),
    totalCount: sortedBooks.length,
    hasNextPage: visibleCount < sortedBooks.length,
    handleNextPage,
  };
};
