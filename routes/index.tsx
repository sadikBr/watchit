import SubredditRenderer from "../islands/subreddit-renderer.tsx";
import { define } from "../utils.ts";

const Home = () => {
  return (
    <div>
      <SubredditRenderer subredditName="EarthPorn" />
    </div>
  );
};

export default define.page(Home);
