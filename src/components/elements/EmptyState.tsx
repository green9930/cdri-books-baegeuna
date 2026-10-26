import { imgBook } from "@/assets";

import { SEARCH_TEXTS } from "@/constants/searchConstants";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({
  message = SEARCH_TEXTS.noResults,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <img src={imgBook} alt="" className="size-20" />
      <p className="text-caption text-textSecondary">{message}</p>
    </div>
  );
};
