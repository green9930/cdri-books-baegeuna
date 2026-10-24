import { parseResponse } from "@/api/apiError";
import { kakaoFetch } from "@/api/createFetch";
import type {
  TBookSearchRequest,
  TBookSearchResponse,
} from "@/types/bookTypes";

export const getBooks = async (
  { query, target, page, size }: TBookSearchRequest,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams({
    query,
    page: String(page),
    size: String(size),
  });
  if (target) params.set("target", target);

  const res = await kakaoFetch(`/v3/search/book?${params}`, { signal });

  return await parseResponse<TBookSearchResponse>(res);
};
