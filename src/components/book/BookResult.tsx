import type { ComponentProps } from "react";

import { BookList } from "@/components/book/BookList";
import { EmptyState } from "@/components/elements/EmptyState";

interface BookResultProps extends ComponentProps<typeof BookList> {
  countLabel: string;
  totalCount: number;
  emptyMessage: string;
}

export const BookResult = ({
  countLabel,
  totalCount,
  emptyMessage,
  ...bookListProps
}: BookResultProps) => {
  return (
    <div className="flex flex-col gap-9">
      <p className="text-caption-medium text-textPrimary">
        {countLabel} 총 <span className="text-primary">{totalCount}</span>건
      </p>
      {bookListProps.books.length === 0 ? (
        <div className="py-21">
          <EmptyState message={emptyMessage} />
        </div>
      ) : (
        <BookList {...bookListProps} />
      )}
    </div>
  );
};
