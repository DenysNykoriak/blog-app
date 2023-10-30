import { useCallback, useMemo } from "react";

import useSWRInfinite from "swr/infinite";

import { Post } from "..";
import { getPostsFeedRequest } from "../services/blogService";

export const usePostsFeed = (pageSize = 10) => {
  const getKey = useCallback(
    (index: number, prevPageData?: Post[]) => {
      if (prevPageData && !prevPageData.length) return null;

      return ["/posts/feed", index * pageSize] as const;
    },
    [pageSize],
  );

  const { isLoading, data, size, setSize } = useSWRInfinite(
    getKey,
    async ([, skip]) => {
      const response = await getPostsFeedRequest(pageSize, skip);

      return response.posts;
    },
  );

  const isLastPageLoaded = useMemo(() => {
    if (!data && !isLoading) return true;

    if (!data) return false;

    const key = getKey(size, data[data.length - 1]);

    return !key;
  }, [data, getKey, isLoading, size]);

  const feed = data ? [...data].flat() : [];

  const loadMore = () => {
    setSize((size) => size + 1);
  };

  return { isLoading, feed, loadMore, isLastPageLoaded };
};
