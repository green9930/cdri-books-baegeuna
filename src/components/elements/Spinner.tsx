import { ARIA_LABELS } from "@/constants/commonConstants";
import { IconLoadingSpinner } from "@/assets";

export const Spinner = () => {
  return (
    <span role="status" className="flex">
      <IconLoadingSpinner
        aria-hidden
        className="size-6 animate-spin text-primary"
      />
      <span className="sr-only">{ARIA_LABELS.loading}</span>
    </span>
  );
};
