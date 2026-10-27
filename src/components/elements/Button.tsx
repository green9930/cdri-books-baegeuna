import {
  BTN_COLOR_VAR,
  BTN_SIZE_VAR,
  BTN_TEXT_VAR,
} from "@/constants/styleConstants";
import type { TBtnColor, TBtnSize, TBtnText } from "@/types/styleTypes";

const BTN_BASE_STYLE =
  "flex w-full items-center justify-center gap-1 rounded-lg px-2 text-center";

interface ButtonProps {
  btnSize: TBtnSize;
  btnText: TBtnText;
  btnColor: TBtnColor;
  btnType?: "button" | "submit";
  disabled?: boolean;
  ariaExpanded?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button = ({
  btnSize,
  btnText,
  btnColor,
  btnType = "button",
  disabled = false,
  ariaExpanded,
  handleClick,
  children,
}: ButtonProps) => {
  return (
    <button
      type={btnType}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      onClick={handleClick}
      className={`${BTN_BASE_STYLE} ${BTN_SIZE_VAR[btnSize]} ${BTN_TEXT_VAR[btnText]} ${
        disabled
          ? `${BTN_COLOR_VAR.disabled} cursor-not-allowed`
          : `${BTN_COLOR_VAR[btnColor]} cursor-pointer hover:opacity-85 focus-visible:opacity-85`
      }`}
    >
      {children}
    </button>
  );
};
