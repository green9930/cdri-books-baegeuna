import { useEffect } from "react";

interface UseDismissProps {
  enabled: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
  handleDismiss: () => void;
}

/* Esc or targetRef 외곽 마우스 클릭 시 handleDismis 실행 */
export const useDismiss = ({
  enabled,
  targetRef,
  handleDismiss,
}: UseDismissProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (!targetRef.current?.contains(e.target as Node)) handleDismiss();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [enabled, targetRef, handleDismiss]);
};
