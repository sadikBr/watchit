import { PageProps } from "fresh";
import SubredditRenderer from "../../islands/subreddit-renderer.tsx";
import { define } from "../../utils.ts";

function SubredditPage(props: PageProps) {
  const { subreddit } = props.params;
  const searchParams = new URL(props.url).searchParams;

  return (
    <div>
      <SubredditRenderer
        subredditName={subreddit}
        after={searchParams.get("after") ?? ""}
        before={searchParams.get("before") ?? ""}
      />
    </div>
  );
}

export default define.page(SubredditPage);
