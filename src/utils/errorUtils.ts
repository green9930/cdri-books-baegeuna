import {
  ERROR_MODAL_TEXTS,
  HTTP_ERROR_STATUS,
} from "@/constants/commonConstants";

/* 5XX error 확인 */
export const isServerErrorStatus = (status: number) =>
  status >= HTTP_ERROR_STATUS.serverError;

/* 401 / 429 / 5xx error 확인 */
export const isModalErrorStatus = (status: number) => {
  return (
    status === HTTP_ERROR_STATUS.unauthorized ||
    status === HTTP_ERROR_STATUS.tooManyRequests ||
    isServerErrorStatus(status)
  );
};

export const handleErrorMessage = (status: number) => {
  switch (status) {
    case HTTP_ERROR_STATUS.unauthorized:
      return ERROR_MODAL_TEXTS.unauthorized;
    case HTTP_ERROR_STATUS.tooManyRequests:
      return ERROR_MODAL_TEXTS.tooManyRequests;
    default:
      return ERROR_MODAL_TEXTS.serverError;
  }
};
