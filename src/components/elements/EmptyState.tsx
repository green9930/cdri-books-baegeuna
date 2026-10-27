import { imgBook } from "@/assets";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <img src={imgBook} alt="" className="size-20" />
      <p className="text-caption text-textSecondary">{message}</p>
    </div>
  );
};
