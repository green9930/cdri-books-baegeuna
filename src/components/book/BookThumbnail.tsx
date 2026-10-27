import { useState } from "react";

import { WishButton } from "@/components/book/WishButton";
import { ImagePlaceholder } from "@/components/elements/ImagePlaceholder";
import type { TBookData } from "@/types/bookTypes";

const THUMBNAIL_SIZE_VAR = {
  sm: { container: "h-17 w-12", icon: "size-4", position: "top-0 right-0" },
  lg: {
    container: "h-28 sm:h-40 md:h-70 w-21 sm:w-30 md:w-52.5",
    icon: "size-6",
    position: "top-1 right-2 md:top-2 md:right-2",
  },
} as const;

interface BookThumbnailProps {
  book: TBookData;
  size: keyof typeof THUMBNAIL_SIZE_VAR;
}

export const BookThumbnail = ({ book, size }: BookThumbnailProps) => {
  /* 썸네일 이미지가 없거나 불러오기 실패할 경우 ImagePlaceholder로 대체 */
  const [isError, setIsError] = useState(false);
  const { container, icon, position } = THUMBNAIL_SIZE_VAR[size];

  return (
    <div className={`relative shrink-0 ${container}`}>
      {book.thumbnail && !isError ? (
        <img
          src={book.thumbnail}
          alt={book.title}
          loading="lazy"
          onError={() => setIsError(true)}
          className="size-full object-cover"
        />
      ) : (
        <ImagePlaceholder />
      )}
      <div className={`absolute ${position}`}>
        <WishButton book={book} iconSize={icon} />
      </div>
    </div>
  );
};
