import { IconChevron } from "@/assets";

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
    <div className="flex gap-8 pt-6 pr-4 pb-10 pl-13.5">
      <BookThumbnail book={book} size="lg" />

      <div className="flex min-w-0 flex-1 flex-col gap-4 pt-5 pr-4">
        <div className="flex min-w-0 items-center gap-4">
          <p className="max-w-1/2 truncate text-title3 text-textPrimary">
            {convertTextVal(book.title)}
          </p>
          <p className="max-w-1/2 shrink-0 truncate text-caption-medium text-textSubtitle">
            {convertAuthors(book.authors)}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body2-bold text-textPrimary">책 소개</p>
          <p className="text-small leading-4 text-textPrimary">
            {convertTextVal(book.contents)}
          </p>
        </div>
      </div>

      <div className="flex w-60 shrink-0 flex-col items-end justify-between">
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

        <div className="flex w-full flex-col items-end gap-7">
          <dl className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <dt className="text-small text-textSubtitle">원가</dt>
              <dd
                className={`text-title3 text-textPrimary ${isDiscounted ? "font-light line-through" : "font-medium"}`}
              >
                {convertPrice(book.price)}
              </dd>
            </div>
            {isDiscounted && (
              <div className="flex items-center gap-2">
                <dt className="text-small text-textSubtitle">할인가</dt>
                <dd className="text-title3 text-textPrimary">
                  {convertPrice(book.sale_price)}
                </dd>
              </div>
            )}
          </dl>
          <Button
            btnSize="lg"
            btnText="caption"
            btnColor="primaryFilled"
            handleClick={handlePurchase}
          >
            {BTN_TEXTS.purchase}
          </Button>
        </div>
      </div>
    </div>
  );
};
