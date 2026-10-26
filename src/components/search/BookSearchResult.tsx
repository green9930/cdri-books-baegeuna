import { BookList } from "@/components/book/BookList";
import { EmptyState } from "@/components/elements/EmptyState";
import { Spinner } from "@/components/elements/Spinner";
import { useBookSearch } from "@/hooks/useBookSearch";
import { useErrorModalStore } from "@/state/store/errorModalStore";
import { MAX_PAGE, SEARCH_TEXTS } from "@/constants/searchConstants";
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
  const isMaxReached = lastPageParam === MAX_PAGE && totalCount > books.length;

  return (
    <div className="flex flex-col gap-9 pt-2">
      <p className="text-caption-medium text-textPrimary">
        도서 검색 결과 총 <span className="text-primary">{totalCount}</span>건
      </p>
      {books.length === 0 ? (
        <div className="py-21">
          <EmptyState />
        </div>
      ) : (
        <BookList
          books={books}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          handleNextPage={fetchNextPage}
          isNextPagePaused={isErrorModalOpen}
          endMessage={
            isMaxReached ? SEARCH_TEXTS.maxResults : SEARCH_TEXTS.endOfResults
          }
        />
      )}
    </div>
  );
};
