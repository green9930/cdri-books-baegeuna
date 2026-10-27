import { useRef, useState } from "react";

import { useDismiss } from "@/hooks/useDismiss";
import { IconChevron } from "@/assets";

interface SelectProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  handleChange: (value: T) => void;
}

export const Select = <T extends string>({
  value,
  options,
  handleChange,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((option) => option.value === value)?.label;
  const restOptions = options.filter((option) => option.value !== value);

  /* options: Esc or 외부 클릭 시 비활성화 */
  useDismiss({
    enabled: isOpen,
    targetRef: selectRef,
    handleDismiss: () => setIsOpen(false),
  });

  const handleSelect = (target: T) => {
    handleChange(target);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative w-25 shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-full cursor-pointer items-center justify-between border-b border-gray py-1 pr-1 pl-2 text-body2-bold text-textPrimary"
      >
        {selectedLabel}
        <span className="flex size-5 items-center justify-center text-iconGray">
          <IconChevron className="rotate-180" />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-1 w-full bg-white shadow-dropdown">
          {restOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className="flex h-7.5 w-full cursor-pointer items-center px-2 py-1 text-caption-medium text-textSubtitle hover:text-textSecondary"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
