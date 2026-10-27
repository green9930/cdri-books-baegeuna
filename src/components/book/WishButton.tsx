import { useWishStore } from "@/state/store/wishStore";
import { handleBookKey } from "@/utils/bookUtils";
import { ARIA_LABELS } from "@/constants/commonConstants";
import type { TBookData } from "@/types/bookTypes";
import { IconLikeEmpty, IconLikeFilled } from "@/assets";

interface WishButtonProps {
  book: TBookData;
  iconSize: string;
}

export const WishButton = ({ book, iconSize }: WishButtonProps) => {
  const bookKey = handleBookKey(book); // selector 밖에서 계산 → store 변경 시엔 조회만
  const isWished = useWishStore((state) => !!state.wishedBooks[bookKey]);
  const toggleWish = useWishStore((state) => state.toggleWish);

  return (
    <button
      type="button"
      aria-label={ARIA_LABELS.wish}
      aria-pressed={isWished}
      onClick={() => toggleWish(book)}
      className="cursor-pointer"
    >
      {isWished ? (
        <IconLikeFilled className={`${iconSize} text-red`} />
      ) : (
        <IconLikeEmpty className={`${iconSize} text-gray`} />
      )}
    </button>
  );
};
