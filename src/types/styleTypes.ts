import type {
  BTN_COLOR_VAR,
  BTN_SIZE_VAR,
  BTN_TEXT_VAR,
} from "@/constants/styleConstants";

export type TBtnSize = keyof typeof BTN_SIZE_VAR;
export type TBtnText = keyof typeof BTN_TEXT_VAR;
export type TBtnColor = Exclude<keyof typeof BTN_COLOR_VAR, "disabled">;
