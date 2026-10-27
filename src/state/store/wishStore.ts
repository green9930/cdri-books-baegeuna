import { create } from "zustand";
import { persist } from "zustand/middleware";

import { handleBookKey } from "@/utils/bookUtils";
import { LOCALSTORAGE_KEYS } from "@/constants/commonConstants";
import type { TBookData, TWishedBook } from "@/types/bookTypes";

/* key: handleBookKey(book). 찜 여부를 key로 바로 조회, 정렬은 wishedAt 기준 */
interface UseWishStoreProps {
  wishedBooks: Record<string, TWishedBook>;
  toggleWish: (book: TBookData) => void;
}

export const useWishStore = create(
  persist<UseWishStoreProps>(
    (set) => ({
      wishedBooks: {},
      toggleWish: (book: TBookData) =>
        set((state) => {
          const key = handleBookKey(book); // book ID
          const { [key]: wishedBook, ...restBooks } = state.wishedBooks; // wishedBooks 내 값 중 key가 일치하는 값을 wishedBook에 할당, 나머지는 restBooks

          if (wishedBook) return { wishedBooks: restBooks }; // wishedBook 이 있다면 찜하기 해제

          /* wishedBook 값이 없다면 wishedAt 값 추가해서 wishedBooks 목록에 추가 */
          return {
            wishedBooks: {
              ...state.wishedBooks,
              [key]: { ...book, wishedAt: Date.now() },
            },
          };
        }),
    }),
    {
      name: LOCALSTORAGE_KEYS.wishStore,
    },
  ),
);
