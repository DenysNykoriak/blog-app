import { AxiosError } from "axios";

export enum FetchError {
  UnknownError = "UnknownError",
}

export const handleFetchError =
  (callback?: (fails: string[]) => void) => (err: unknown) => {
    if (err instanceof AxiosError) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.message
      ) {
        const fails: string[] = Array.isArray(err.response.data.message)
          ? err.response.data.message
          : [err.response.data.message];

        return callback?.(fails);
      }
    }

    return callback?.([FetchError.UnknownError]);
  };
