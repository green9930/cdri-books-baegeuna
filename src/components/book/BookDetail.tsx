import { BookThumbnail } from "@/components/book/BookThumbnail";
import { DetailToggleButton } from "@/components/book/DetailToggleButton";
import { PurchaseButton } from "@/components/book/PurchaseButton";
import {
  convertAuthors,
  convertPrice,
  convertTextVal,
  hasDiscount,
} from "@/utils/bookUtils";
import { BOOK_DETAIL_TEXTS } from "@/constants/bookConstants";
import type { TBookData } from "@/types/bookTypes";

interface BookDetailProps {
  book: TBookData;
  isOpen: boolean;
  handleToggle: () => void;
  handlePurchase: () => void;
}

/* 원가: 할인가 노출 시 취소선 / 할인가: sale_price > 0 일 때만 노출 */
export const BookDetail = ({
  book,
  isOpen,
  handleToggle,
  handlePurchase,
}: BookDetailProps) => {
  const isDiscounted = hasDiscount(book);

  return (
    <div className="flex gap-8 pt-6 pr-4 pb-10 pl-4 md:pl-13.5">
      <BookThumbnail book={book} size="lg" />

      <div className="flex min-w-0 flex-1 flex-col gap-4 md:pt-5 md:pr-4">
        <div className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <p className="truncate text-title3 text-textPrimary md:max-w-2/3">
            {convertTextVal(book.title)}
          </p>
          <p className="shrink-0 truncate text-caption-medium text-textSubtitle md:max-w-1/3">
            {convertAuthors(book.authors)}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body2-bold text-textPrimary">
            {BOOK_DETAIL_TEXTS.contents}
          </p>
          <p className="text-small leading-4 text-textPrimary">
            {convertTextVal(book.contents)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between sm:w-50 md:w-60">
        <div className="w-28.75">
          <DetailToggleButton isOpen={isOpen} handleToggle={handleToggle} />
        </div>

        <div className="flex w-full flex-col items-end gap-2 md:gap-7">
          <dl className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <dt className="text-small text-textSubtitle">
                {BOOK_DETAIL_TEXTS.price}
              </dt>
              <dd
                className={`text-title3 text-textPrimary ${isDiscounted ? "font-light line-through" : "font-medium"}`}
              >
                {convertPrice(book.price)}
              </dd>
            </div>
            {isDiscounted && (
              <div className="flex items-center gap-2">
                <dt className="text-small text-textSubtitle">
                  {BOOK_DETAIL_TEXTS.salePrice}
                </dt>
                <dd className="text-title3 text-textPrimary">
                  {convertPrice(book.sale_price)}
                </dd>
              </div>
            )}
          </dl>
          <PurchaseButton handlePurchase={handlePurchase} />
        </div>
      </div>
    </div>
  );
};
