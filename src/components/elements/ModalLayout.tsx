import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalLayoutProps {
  title: string;
  /* Esc: [닫기]·[취소]와 같은 동작일 때만 전달 */
  handleEscape?: () => void;
  children: React.ReactNode;
}

export const ModalLayout = ({
  title,
  handleEscape,
  children,
}: ModalLayoutProps) => {
  /* 배경 스크롤 & 레이아웃 이동 방지 */
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  /* Esc 키 제어 */
  useEffect(() => {
    if (!handleEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEscape();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleEscape]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div className="pointer-events-none fixed inset-0 bg-black/20" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[80dvh] min-h-80 w-[min(30rem,calc(100vw-40px))] flex-col items-center gap-8 overflow-y-auto rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="w-full text-center text-title3 text-black">{title}</h2>
        <div className="flex h-full w-full flex-1 flex-col justify-between gap-8">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
