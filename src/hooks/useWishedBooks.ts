import { useMemo, useState } from "react";

import { useWishStore } from "@/state/store/wishStore";
import { PAGE_SIZE } from "@/constants/searchConstants";

export const useWishedBooks = () => {
  const wishedBooks = useWishStore((state) => state.wishedBooks);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedBooks = useMemo(
    () => Object.values(wishedBooks).sort((a, b) => b.wishedAt - a.wishedAt), // 최신 순 정렬
    [wishedBooks],
  ); // 스크롤할 때마다 목록 재정렬 방지

  const handleNextPage = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return {
    books: sortedBooks.slice(0, visibleCount),
    totalCount: sortedBooks.length,
    hasNextPage: visibleCount < sortedBooks.length,
    handleNextPage,
  };
};
