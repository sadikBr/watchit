import { useEffect, useState } from "preact/hooks";
import { Subreddit } from "../types/subreddit.d.ts";

type SubredditOptions = { immediate: boolean; after: string };

export default function useSubreddit(
  subredditName: string,
  options: SubredditOptions = { immediate: true, after: "" },
) {
  const [subreddit, setSubreddit] = useState<Subreddit>({
    children: [],
    after: options.after,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subredditName}.json?sr_detail=true&include_over_18=true&after=${options.after}&limit=15`,
      );

      if (!response.ok) {
        return setError(
          `Something went wrong while fetching r/${subredditName}`,
        );
      }

      const data = await response.json();
      const children = data?.data?.children;

      if (!children) {
        return setError(
          "The requested subreddit does not exist, or you don't have the permission to view it",
        );
      }

      setSubreddit({
        children,
        after: data.data.after,
      });
    } catch {
      setError("Something went wrong.. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (options.immediate) fetchData();
  }, [subredditName]);

  return {
    subreddit,
    loading,
    error,
  };
}
