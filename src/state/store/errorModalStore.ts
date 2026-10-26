import { create } from "zustand";

interface UseErrorModalStoreProps {
  errorStatus: number | null; // null = 모달 비활성화
  openErrorModal: (status: number) => void;
  closeErrorModal: () => void;
}

export const useErrorModalStore = create<UseErrorModalStoreProps>((set) => ({
  errorStatus: null,
  openErrorModal: (status: number) =>
    set(
      (state) => (state.errorStatus === null ? { errorStatus: status } : state), // 에러 덮어씌워지는 현상 방지
    ),
  closeErrorModal: () => set({ errorStatus: null }),
}));
