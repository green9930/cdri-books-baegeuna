import { BookItem } from "@/components/book/BookItem";
import { Spinner } from "@/components/elements/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { handleBookKey } from "@/utils/bookUtils";
import type { TBookData } from "@/types/bookTypes";

interface BookListProps {
  books: TBookData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleNextPage: () => void;
  endMessage: string;
}

export const BookList = ({
  books,
  hasNextPage,
  isFetchingNextPage,
  handleNextPage,
  endMessage,
}: BookListProps) => {
  const targetRef = useInfiniteScroll({
    enabled: hasNextPage && !isFetchingNextPage,
    handleIntersect: handleNextPage,
  });

  return (
    <div className="flex flex-col">
      <ul>
        {books.map((book) => (
          <BookItem key={handleBookKey(book)} book={book} />
        ))}
      </ul>
      <div ref={targetRef} />
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
      {!hasNextPage && (
        <p className="py-6 text-center text-caption text-textSecondary">
          {endMessage}
        </p>
      )}
    </div>
  );
};
