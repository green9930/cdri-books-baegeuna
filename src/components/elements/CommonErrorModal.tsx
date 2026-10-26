import { Button } from "@/components/elements/Button";
import { ModalLayout } from "@/components/elements/ModalLayout";
import { useErrorModalStore } from "@/state/store/errorModalStore";
import { handleErrorMessage } from "@/utils/errorUtils";
import { BTN_TEXTS, ERROR_MODAL_TEXTS } from "@/constants/commonConstants";

/* API 요청 실패 공통 에러 처리 */
export const CommonErrorModal = () => {
  const errorStatus = useErrorModalStore((state) => state.errorStatus);
  const closeErrorModal = useErrorModalStore((state) => state.closeErrorModal);

  if (errorStatus === null) return null;

  return (
    <ModalLayout title={ERROR_MODAL_TEXTS.title} handleEscape={closeErrorModal}>
      <p className="text-center text-caption text-textSecondary">
        {handleErrorMessage(errorStatus)}
      </p>
      <Button
        btnSize="lg"
        btnText="caption"
        btnColor="primaryFilled"
        handleClick={closeErrorModal}
      >
        {BTN_TEXTS.close}
      </Button>
    </ModalLayout>
  );
};
