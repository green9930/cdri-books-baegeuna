import { useEffect, useRef, useState } from "react";
import { IconChevron } from "@/assets";

import { BookDetail } from "@/components/book/BookDetail";
import { BookThumbnail } from "@/components/book/BookThumbnail";
import { Button } from "@/components/elements/Button";
import {
  convertAuthors,
  convertPrice,
  convertTextVal,
  hasDiscount,
} from "@/utils/bookUtils";
import { BTN_TEXTS } from "@/constants/commonConstants";
import { CHEVRON_TRANSITION } from "@/constants/styleConstants";
import type { TBookData } from "@/types/bookTypes";

interface BookItemProps {
  book: TBookData;
}

const EXPAND_TRANSITION = "transition-[height] duration-500 ease-in-out";

export const BookItem = ({ book }: BookItemProps) => {
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
            <div className="flex min-w-0 flex-1 items-center gap-2 pr-3 pl-6 md:gap-4 md:pr-5.5 md:pl-12">
              <p className="truncate text-body2-bold text-textPrimary md:text-title3">
                {convertTextVal(book.title)}
              </p>
              <p className="max-w-1/3 shrink-0 truncate text-small text-textSecondary md:text-body2">
                {convertAuthors(book.authors)}
              </p>
            </div>
            <p className="hidden shrink-0 pr-6 text-body2 text-textPrimary sm:block md:pr-14 md:text-title3">
              {convertPrice(hasDiscount(book) ? book.sale_price : book.price)}
            </p>
            <div className="flex flex-col-reverse gap-1 md:flex-row md:gap-2">
              <div className="w-28.75">
                <Button
                  btnSize="lg"
                  btnText="caption"
                  btnColor="primaryFilled"
                  handleClick={handlePurchase}
                >
                  {BTN_TEXTS.purchase}
                </Button>
              </div>
              <div className="w-28.75">
                <Button
                  btnSize="lg"
                  btnText="caption"
                  btnColor="lightGrayFilled"
                  handleClick={handleToggle}
                >
                  {BTN_TEXTS.detail}
                  <IconChevron
                    className={`${CHEVRON_TRANSITION} ${isOpen ? "" : "rotate-180"}`}
                  />
                </Button>
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
