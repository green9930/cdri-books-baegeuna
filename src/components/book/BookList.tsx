import { BookItem } from "@/components/book/BookItem";
import { handleBookKey } from "@/utils/bookUtils";
import type { TBookData } from "@/types/bookTypes";

interface BookListProps {
  books: TBookData[];
}

export const BookList = ({ books }: BookListProps) => {
  return (
    <ul>
      {books.map((book) => (
        <BookItem key={handleBookKey(book)} book={book} />
      ))}
    </ul>
  );
};
