export const BTN_SIZE_VAR = {
  lg: "h-9 md:h-12",
  md: "h-7 md:h-9",
} as const;

export const BTN_TEXT_VAR = {
  caption: "text-body2-bold md:text-caption",
  captionMedium: "text-caption-medium",
  body2: "text-body2",
} as const;

export const BTN_COLOR_VAR = {
  primaryFilled: "bg-primary text-white",
  lightGrayFilled: "bg-lightGray text-textSecondary",
  subtitleOutline: "border border-textSubtitle bg-white text-textSubtitle",
  disabled: "bg-textSubtitle text-white",
} as const;

export const CHEVRON_TRANSITION =
  "transition-transform duration-500 ease-in-out";
