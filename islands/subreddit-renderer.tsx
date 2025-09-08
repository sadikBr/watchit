import useSubreddit from "../hooks/useSubreddit.ts";
import LoadingSpinner from "../components/loading-spinner.tsx";
import ErrorDisplay from "../components/error-display.tsx";
import { useMemo } from "preact/hooks";

type Props = {
  subredditName: string;
  after?: string;
  before?: string;
};

function SubredditBanner({ srDetails }: { srDetails: any }) {
  const bannerImg = useMemo(() =>
    srDetails?.banner_img ||
    srDetails?.icon_img || srDetails?.community_icon?.split("?")[0], [
    srDetails,
  ]);
  const icon = useMemo(
    () => srDetails?.icon_img || srDetails?.community_icon?.split("?")[0],
    [srDetails],
  );

  return (
    <>
      <div class="relative">
        {bannerImg && (
          <img
            src={bannerImg}
            alt="Subreddit banner image"
            class="w-full min-h-[30] max-h-[45vh] object-cover bg-blue-950"
          />
        )}
        {icon && (
          <img
            src={icon}
            alt="Subreddit icon image"
            class="absolute bg-white w-42 aspect-square rounded-full left-10 -bottom-18 border-8 p-1 border-blue-950"
          />
        )}
      </div>
      <div
        class={`flex flex-col gap-2 ml-4 ${icon && "ml-56"} ${
          bannerImg && "my-4"
        }`}
      >
        <div class="text-2xl font-semibold text-blue-950">
          {srDetails.display_name}
        </div>
        <div class="text-sm text-gray-500">{srDetails.public_description}</div>
      </div>
    </>
  );
}

export default function SubredditRenderer(
  { subredditName, after, before }: Props,
) {
  const { subreddit, loading, error } = useSubreddit(subredditName, {
    immediate: true,
    after: after ?? "",
    before: before ?? "",
  });

  const filteredPosts = useMemo(() =>
    subreddit.children.filter((child) => {
      const isImage = (child.data.url_overriden_by_dest || child.data.url)
        .match(/(jpe?g|png|gifv?)$/g);
      const isVideo = child.data.media?.reddit_video ||
        child.data.secure_media?.reddit_video ||
        child.data.preview?.reddit_video_preview;

      return isImage || isVideo;
    }), [subreddit]);

  return (
    <div>
      {(!loading && error.length === 0 && subreddit.children.length > 0) && (
        <SubredditBanner srDetails={subreddit.children[0].data.sr_detail} />
      )}
      {loading
        ? (
          <div class="w-full h-36 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )
        : error.length > 0
        ? (
          <div class="w-96 mx-auto my-8">
            <ErrorDisplay error={error} />
          </div>
        )
        : filteredPosts.length > 0
        ? (
          <div class="px-8 py-4">
            <div class="columns columns-1 lg:columns-2 xl:columns-3 2xl:columns-4">
              {filteredPosts.map((child) => {
                const image = child.data.url_overriden_by_dest ||
                  child.data.url;
                const video = child.data.media?.reddit_video ||
                  child.data.secure_media?.reddit_video ||
                  child.data.preview?.reddit_video_preview;

                return (
                  <div key={child.data.id} class="mb-4 w-full">
                    {image && image.match(/(jpe?g|png|gifv?)$/g) && (
                      <img
                        loading="lazy"
                        src={image}
                        alt={child.data.title}
                        class="w-full h-auto"
                      />
                    )}
                    {video && (
                      <video
                        loop={false}
                        controls
                        src={video.fallback_url}
                        class="w-full aspect-video"
                      >
                      </video>
                    )}
                  </div>
                );
              })}
            </div>
            <div class="w-full flex items-center py-4">
              <a
                href={`http://localhost:5173/r/${subredditName}?after=${subreddit.after}`}
                class={`ml-auto cursor-pointer font-bold p-3 w-42 flex items-center justify-center border border-blue-950 rounded-sm text-orange-300 hover:bg-blue-950 transition ${
                  !subreddit.after && "invisible"
                }`}
              >
                Next
              </a>
            </div>
          </div>
        )
        : (
          <div class="w-96 mx-auto my-8 text-center">
            There are no image/video posts to show for this subreddit
          </div>
        )}
    </div>
  );
}
