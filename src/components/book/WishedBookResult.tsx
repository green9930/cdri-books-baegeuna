import { BookList } from "@/components/book/BookList";
import { EmptyState } from "@/components/elements/EmptyState";
import { useWishedBooks } from "@/hooks/useWishedBooks";
import { SEARCH_TEXTS } from "@/constants/searchConstants";
import { WISHLIST_TEXTS } from "@/constants/wishConstants";

export const WishedBookResult = () => {
  const { books, totalCount, hasNextPage, handleNextPage } = useWishedBooks();

  return (
    <div className="flex flex-col gap-9">
      <p className="text-caption-medium text-textPrimary">
        찜한 책 총 <span className="text-primary">{totalCount}</span>건
      </p>
      {books.length === 0 ? (
        <div className="py-21">
          <EmptyState message={WISHLIST_TEXTS.noContent} />
        </div>
      ) : (
        <BookList
          books={books}
          hasNextPage={hasNextPage}
          isFetchingNextPage={false} // API fetch X
          handleNextPage={handleNextPage}
          endMessage={SEARCH_TEXTS.endOfResults}
        />
      )}
    </div>
  );
};
