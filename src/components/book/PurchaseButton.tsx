import { Button } from "@/components/elements/Button";
import { BTN_TEXTS } from "@/constants/commonConstants";

interface PurchaseButtonProps {
  handlePurchase: () => void;
}

export const PurchaseButton = ({ handlePurchase }: PurchaseButtonProps) => {
  return (
    <Button
      btnSize="lg"
      btnText="caption"
      btnColor="primaryFilled"
      handleClick={handlePurchase}
    >
      {BTN_TEXTS.purchase}
    </Button>
  );
};
