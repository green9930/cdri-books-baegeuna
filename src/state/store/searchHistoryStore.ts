import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BOOK_SEARCH_RULES } from "@/constants/bookConstants";
import { LOCALSTORAGE_KEYS } from "@/constants/commonConstants";

interface UseSearchHistoryStoreProps {
  histories: string[];
  addHistory: (keyword: string) => void;
  removeHistory: (keyword: string) => void;
}

export const useSearchHistoryStore = create(
  persist<UseSearchHistoryStoreProps>(
    (set) => ({
      histories: [],
      addHistory: (keyword: string) =>
        set((state) => ({
          histories: [
            keyword,
            ...state.histories.filter((history) => history !== keyword), // 겹칠 경우 기존 검색어 지우고 최상단 이동
          ].slice(0, BOOK_SEARCH_RULES.maxSearchHistory),
        })),
      removeHistory: (keyword: string) =>
        set((state) => ({
          histories: state.histories.filter((history) => history !== keyword),
        })),
    }),
    {
      name: LOCALSTORAGE_KEYS.searchHistoryStore,
    },
  ),
);
