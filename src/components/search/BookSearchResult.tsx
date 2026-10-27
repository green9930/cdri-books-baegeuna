import { BookResult } from "@/components/book/BookResult";
import { Spinner } from "@/components/elements/Spinner";
import { useBookSearch } from "@/hooks/useBookSearch";
import { useErrorModalStore } from "@/state/store/errorModalStore";
import {
  BOOK_SEARCH_RULES,
  BOOK_SEARCH_TEXTS,
} from "@/constants/bookConstants";
import type { TBookSearchParams } from "@/types/bookTypes";

interface BookSearchResultProps {
  params: TBookSearchParams | null; // null = 검색 초기 화면
}

export const BookSearchResult = ({ params }: BookSearchResultProps) => {
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBookSearch(params);
  const isErrorModalOpen = useErrorModalStore(
    (state) => state.errorStatus !== null,
  );

  if (params && isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = data?.pages[0].meta.total_count ?? 0;
  const lastPageParam = data?.pageParams.at(-1);
  /* 최대 페이지까지 불러왔는데 총 검색 결과가 더 많을 경우 */
  const isMaxReached =
    lastPageParam === BOOK_SEARCH_RULES.maxPage && totalCount > books.length;

  return (
    <div className="pt-2">
      <BookResult
        countLabel={BOOK_SEARCH_TEXTS.resultCountLabel}
        totalCount={totalCount}
        emptyMessage={BOOK_SEARCH_TEXTS.noResults}
        books={books}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        handleNextPage={fetchNextPage}
        isNextPagePaused={isErrorModalOpen}
        endMessage={
          isMaxReached
            ? BOOK_SEARCH_TEXTS.maxResults
            : BOOK_SEARCH_TEXTS.endOfResults
        }
      />
    </div>
  );
};
