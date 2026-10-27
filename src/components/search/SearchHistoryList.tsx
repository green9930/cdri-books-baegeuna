import { ARIA_LABELS } from "@/constants/commonConstants";
import { IconClose } from "@/assets";

interface SearchHistoryListProps {
  histories: string[];
  handleSelect: (keyword: string) => void;
  handleDelete: (keyword: string) => void;
}

export const SearchHistoryList = ({
  histories,
  handleSelect,
  handleDelete,
}: SearchHistoryListProps) => {
  return (
    <ul
      onMouseDown={(e) => e.preventDefault()}
      className="absolute top-0 left-0 w-full rounded-3xl bg-lightGray pt-13.75 pb-3.75"
    >
      {histories.map((keyword) => (
        <li
          key={keyword}
          className="flex h-10 items-center justify-between gap-2 pr-6.25 pl-12.5"
        >
          <button
            type="button"
            onClick={() => handleSelect(keyword)}
            className="w-full cursor-pointer truncate text-left text-caption text-textSubtitle hover:text-textPrimary"
          >
            {keyword}
          </button>
          <button
            type="button"
            aria-label={ARIA_LABELS.deleteHistory(keyword)}
            onClick={() => handleDelete(keyword)}
            className="size-6 shrink-0 cursor-pointer text-black"
          >
            <IconClose className="size-6" />
          </button>
        </li>
      ))}
    </ul>
  );
};
