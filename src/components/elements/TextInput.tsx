interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxLength: number;
  ariaLabel?: string;
}

export const TextInput = ({
  value,
  setValue,
  placeholder,
  maxLength,
  ariaLabel,
}: TextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-label={ariaLabel}
      onChange={(e) => setValue(e.target.value)}
      className="h-9 w-full border-b border-gray px-2.5 pb-1.25 text-caption-medium text-textPrimary placeholder:text-textSubtitle focus:border-primary"
    />
  );
};
