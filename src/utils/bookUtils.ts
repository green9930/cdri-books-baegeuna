import type { TBookData } from "@/types/bookTypes";

const EMPTY_TEXT = "-";

export const convertTextVal = (target: string) => target.trim() || EMPTY_TEXT;

export const convertAuthors = (authors: string[]) =>
  authors.join(", ") || EMPTY_TEXT;

export const convertPrice = (price: number) => {
  if (price <= 0) return EMPTY_TEXT;

  return `${price.toLocaleString("ko-KR")}원`;
};

export const hasDiscount = (book: TBookData) => book.sale_price > 0;

/**
 * 찜 목록 식별용 ID: 책 제목 + ISBN 첫 번째 값
 * ISBN 값이 1개일 경우 앞 공백 문자 발생
 */
export const handleBookKey = (book: TBookData) => {
  const [firstIsbn = ""] = book.isbn.trim().split(/\s+/);

  return `${book.title}${firstIsbn}`.replace(/\s/g, "");
};
