import { PageProps } from "fresh";
import { define } from "../../utils.ts";
import UserPostsRenderer from "../../islands/user-posts-renderer.tsx";

function UserPage(props: PageProps) {
  const { user } = props.params;
  const searchParams = new URL(props.url).searchParams;

  return (
    <div>
      <UserPostsRenderer
        username={user}
        after={searchParams.get("after") ?? ""}
      />
    </div>
  );
}

export default define.page(UserPage);
