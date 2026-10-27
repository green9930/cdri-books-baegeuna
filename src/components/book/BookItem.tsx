import { memo, useEffect, useRef, useState } from "react";

import { BookDetail } from "@/components/book/BookDetail";
import { BookThumbnail } from "@/components/book/BookThumbnail";
import { DetailToggleButton } from "@/components/book/DetailToggleButton";
import { PurchaseButton } from "@/components/book/PurchaseButton";
import {
  convertAuthors,
  convertPrice,
  convertTextVal,
  hasDiscount,
} from "@/utils/bookUtils";
import type { TBookData } from "@/types/bookTypes";

interface BookItemProps {
  book: TBookData;
}

const EXPAND_TRANSITION = "transition-[height] duration-500 ease-in-out";

const BookItemComponent = ({ book }: BookItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heights, setHeights] = useState({ summary: 0, detail: 0 });

  const summaryRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  /* summary-detail 간 transition을 위해 height observe */
  useEffect(() => {
    const summaryElement = summaryRef.current;
    const detailElement = detailRef.current;
    if (!summaryElement || !detailElement) return;

    const resizeObserver = new ResizeObserver(() =>
      setHeights({
        summary: summaryElement.offsetHeight,
        detail: detailElement.offsetHeight,
      }),
    );
    resizeObserver.observe(summaryElement);
    resizeObserver.observe(detailElement);

    return () => resizeObserver.disconnect();
  }, []);

  /* 첫 번째 렌더링 시 auto height */
  const itemHeight = heights.summary
    ? isOpen
      ? heights.detail
      : heights.summary
    : undefined;

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handlePurchase = () =>
    window.open(book.url, "_blank", "noopener,noreferrer");

  return (
    <li className="border-b border-gray">
      <div
        style={{ height: itemHeight }}
        className={`isolate grid grid-cols-1 overflow-hidden ${EXPAND_TRANSITION}`}
      >
        <div
          ref={summaryRef}
          inert={isOpen}
          className="col-start-1 row-start-1 self-start"
        >
          <div className="flex items-center py-4 sm:pr-4 sm:pl-6 md:pl-12">
            <BookThumbnail book={book} size="sm" />
            <div className="flex min-w-0 flex-1 flex-col gap-2 pr-3 pl-6 sm:contents">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-1 sm:flex-row sm:items-center sm:gap-2 sm:pr-3 sm:pl-6 md:gap-4 md:pr-5.5 md:pl-12">
                <p className="truncate text-body2-bold text-textPrimary md:text-title3">
                  {convertTextVal(book.title)}
                </p>
                <p className="shrink-0 truncate text-small text-textSecondary sm:max-w-1/3 md:text-body2">
                  {convertAuthors(book.authors)}
                </p>
              </div>
              <p className="shrink-0 text-body2 text-textPrimary sm:pr-6 md:pr-14 md:text-title3">
                {convertPrice(hasDiscount(book) ? book.sale_price : book.price)}
              </p>
            </div>
            <div className="flex flex-col-reverse gap-1 md:flex-row md:gap-2">
              <div className="w-28.75">
                <PurchaseButton handlePurchase={handlePurchase} />
              </div>
              <div className="w-28.75">
                <DetailToggleButton
                  isOpen={isOpen}
                  handleToggle={handleToggle}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          inert={!isOpen} // accessibility
          style={{ height: isOpen ? heights.detail : 0 }}
          className={`z-10 col-start-1 row-start-1 self-start overflow-hidden bg-white ${EXPAND_TRANSITION}`}
        >
          <div ref={detailRef}>
            <BookDetail
              book={book}
              isOpen={isOpen}
              handleToggle={handleToggle}
              handlePurchase={handlePurchase}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

/* book 참조가 같으면 리렌더 생략 → 다음 페이지 추가·찜 해제 시 기존 항목 리렌더 방지
 * - props에 인라인 함수·객체를 추가하면 매번 새 참조가 되어 memo 효과 없음 */
export const BookItem = memo(BookItemComponent);
