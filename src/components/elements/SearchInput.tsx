import { IconSearch } from "@/assets";

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxLength: number;
  ariaLabel?: string;
  handleFocus?: () => void;
  handleEnterKeyDown?: () => void;
}

export const SearchInput = ({
  value,
  setValue,
  placeholder,
  maxLength,
  ariaLabel,
  handleFocus,
  handleEnterKeyDown,
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return; // enter 중복 실행 방지

    handleEnterKeyDown?.();
  };

  return (
    <label className="flex h-12.5 w-full items-center gap-2.5 rounded-full bg-lightGray px-2.5">
      <IconSearch className="size-7.5 shrink-0 text-textPrimary" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label={ariaLabel}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className="h-full w-full bg-transparent text-caption text-textPrimary placeholder:text-textSubtitle"
      />
    </label>
  );
};
