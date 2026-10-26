import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  enabled: boolean;
  handleIntersect: () => void;
}

/* 목록 하단 targetRef가 화면 하단 200px 이내로 들어오면 다음 페이지 요청
 * - enabled: 다음 페이지가 있고 요청 중이 아닐 경우 true
 * - 요청이 끝난 뒤 enabled가 다시 true가 되면 observer를 새로 만들어 즉시 한 번 검사
 * - 불러온 목록이 화면을 다 채우지 못해 targetRef가 계속 보이는 경우에도 다음 페이지 요청
 * */
export const useInfiniteScroll = ({
  enabled,
  handleIntersect,
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!enabled || !targetElement) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handleIntersect();
      },
      { rootMargin: "0px 0px 200px 0px" }, // 하단 200px 스크롤 들어올 경우
    );
    intersectionObserver.observe(targetElement);

    return () => intersectionObserver.disconnect();
  }, [enabled, handleIntersect]);

  return targetRef;
};
