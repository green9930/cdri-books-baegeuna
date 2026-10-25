import { imgBook } from "@/assets";

import { NO_RESULTS_MESSAGE } from "@/constants/searchConstants";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({
  message = NO_RESULTS_MESSAGE,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <img src={imgBook} alt="" className="size-20" />
      <p className="text-caption text-textSecondary">{message}</p>
    </div>
  );
};
