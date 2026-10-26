import { QueryClient } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/constants/commonConstants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});
