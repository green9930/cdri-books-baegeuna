import { QueryCache, QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/api/apiError";
import { useErrorModalStore } from "@/state/store/errorModalStore";
import { isModalErrorStatus, isServerErrorStatus } from "@/utils/errorUtils";
import { MAX_RETRY_COUNT, QUERY_STALE_TIME } from "@/constants/commonConstants";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof ApiError && isModalErrorStatus(error.status))
        useErrorModalStore.getState().openErrorModal(error.status);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
      /* 5xx error만 최대 2회 재시도 */
      retry: (failureCount, error) =>
        error instanceof ApiError &&
        isServerErrorStatus(error.status) &&
        failureCount < MAX_RETRY_COUNT,
    },
  },
});
