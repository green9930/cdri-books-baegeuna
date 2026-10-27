import { useEffect, useEffectEvent } from "react";

interface UseDismissProps {
  enabled: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
  handleDismiss: () => void;
}

/* Esc or targetRef 외곽 마우스 클릭 시 handleDismiss 실행 */
export const useDismiss = ({
  enabled,
  targetRef,
  handleDismiss,
}: UseDismissProps) => {
  /* 렌더링 시 listener 재등록 방지: 최신 handleDismiss를 참조하나 useeffect deps 제외 */
  const handleDismissEvent = useEffectEvent(handleDismiss);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismissEvent();
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (!targetRef.current?.contains(e.target as Node)) handleDismissEvent();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [enabled, targetRef]);
};
