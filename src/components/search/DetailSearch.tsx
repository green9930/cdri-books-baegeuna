import { useRef } from "react";

import { Button } from "@/components/elements/Button";
import { DetailSearchPopover } from "@/components/search/DetailSearchPopover";
import { useDismiss } from "@/hooks/useDismiss";
import { BTN_TEXTS } from "@/constants/commonConstants";
import type { TSearchTarget } from "@/types/bookTypes";

interface DetailSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSearch: (query: string, target: TSearchTarget) => void; // trim된 검색어 전달
}

export const DetailSearch = ({
  isOpen,
  setIsOpen,
  handleSearch,
}: DetailSearchProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* 팝업: Esc or 외곽(상세검색 버튼 포함) 클릭 시 닫힘 */
  useDismiss({
    enabled: isOpen,
    targetRef: containerRef,
    handleDismiss: () => setIsOpen(false),
  });

  return (
    <div ref={containerRef} className="relative w-18 shrink-0">
      <Button
        btnSize="md"
        btnText="body2"
        btnColor="subtitleOutline"
        ariaExpanded={isOpen}
        handleClick={() => setIsOpen(!isOpen)}
      >
        {BTN_TEXTS.detailSearch}
      </Button>
      {isOpen && (
        <DetailSearchPopover
          handleClose={() => setIsOpen(false)}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
