const KAKAO_API_BASE_URL = "https://dapi.kakao.com";

const createFetch = (
  baseURL: string,
  urlPath: string,
  options?: RequestInit,
) => {
  const fullURL = `${baseURL}${urlPath}`;

  return fetch(fullURL, options);
};

export const kakaoFetch = async (urlPath: string, options?: RequestInit) => {
  return await createFetch(KAKAO_API_BASE_URL, urlPath, {
    ...options,
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      ...options?.headers,
    },
  });
};
