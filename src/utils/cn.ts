import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 조건부 className을 합치고, 충돌하는 Tailwind 클래스는 뒤의 값으로 정리한다 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
