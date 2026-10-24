export class ApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export const parseResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) throw new ApiError(res.status);

  return (await res.json()) as T;
};
