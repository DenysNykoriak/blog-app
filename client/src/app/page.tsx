"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/navigation";

import LoadingPage from "@/components/pages/LoadingPage";
import { Route } from "@/models/routes";
import CreatePostForm from "@/modules/blog/components/CreatePostForm";
import FeedPost from "@/modules/blog/components/FeedPost";
import { usePostsFeed } from "@/modules/blog/hooks/usePostsFeed";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";

const Home = () => {
  const router = useRouter();

  const { isLoading, user } = useCurrentUser();
  const {
    isLoading: isPostsFeedLoading,
    feed,
    isLastPageLoaded,
    loadMore,
  } = usePostsFeed(10);

  const { ref: loadMoreRef } = useInView({
    onChange: (inView) => {
      if (inView && !isLastPageLoaded) {
        loadMore();
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(Route.SignIn);
    }
  }, [isLoading, router, user]);

  if (isLoading || isPostsFeedLoading) return <LoadingPage />;

  return (
    <main className="relative mt-10 flex flex-col gap-8">
      <h1 className="text-center text-3xl">Blog Page</h1>
      <div className="mx-auto mb-4 flex w-full max-w-[800px] flex-col gap-4 px-2">
        <CreatePostForm />
        {feed.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
        <div className="absolute bottom-[600px]" ref={loadMoreRef} />
      </div>
    </main>
  );
};

export default Home;
