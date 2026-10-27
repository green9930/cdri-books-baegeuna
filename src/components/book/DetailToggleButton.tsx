import { Button } from "@/components/elements/Button";
import { BTN_TEXTS } from "@/constants/commonConstants";
import { CHEVRON_TRANSITION } from "@/constants/styleConstants";
import { IconChevron } from "@/assets";

interface DetailToggleButtonProps {
  isOpen: boolean;
  handleToggle: () => void;
}

export const DetailToggleButton = ({
  isOpen,
  handleToggle,
}: DetailToggleButtonProps) => {
  return (
    <Button
      btnSize="lg"
      btnText="caption"
      btnColor="lightGrayFilled"
      ariaExpanded={isOpen}
      handleClick={handleToggle}
    >
      {BTN_TEXTS.detail}
      <IconChevron
        className={`${CHEVRON_TRANSITION} ${isOpen ? "" : "rotate-180"}`}
      />
    </Button>
  );
};
