import { BookResult } from "@/components/book/BookResult";
import { useWishedBooks } from "@/hooks/useWishedBooks";
import { BOOK_SEARCH_TEXTS, WISHLIST_TEXTS } from "@/constants/bookConstants";

export const WishedBookResult = () => {
  const { books, totalCount, hasNextPage, handleNextPage } = useWishedBooks();

  return (
    <BookResult
      countLabel={WISHLIST_TEXTS.resultCountLabel}
      totalCount={totalCount}
      emptyMessage={WISHLIST_TEXTS.noContent}
      books={books}
      hasNextPage={hasNextPage}
      isFetchingNextPage={false} // API fetch X
      handleNextPage={handleNextPage}
      endMessage={BOOK_SEARCH_TEXTS.endOfResults}
    />
  );
};
