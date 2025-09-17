import ErrorDisplay from "../components/error-display.tsx";
import LoadingSpinner from "../components/loading-spinner.tsx";
import useSearch from "../hooks/use-search.ts";

export default function SearchResultsRenderer({
  query,
  after,
}: {
  query: string;
  after?: string;
}) {
  const { searchResults, loading, error } = useSearch(query, { after });

  return (
    <div>
      {loading ? (
        <div class="w-full h-36 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : error.length > 0 ? (
        <div class="w-96 mx-auto my-8">
          <ErrorDisplay error={error} />
        </div>
      ) : searchResults.children.length > 0 ? (
        <div class="px-8 py-4">
          <div class="columns columns-1 lg:columns-2 xl:columns-3 2xl:columns-4">
            {searchResults.children.map((child: any) => {
              const image = child.data.url_overriden_by_dest || child.data.url;
              const video =
                child.data.media?.reddit_video ||
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
                    ></video>
                  )}
                </div>
              );
            })}
          </div>
          <div class="w-full flex items-center py-4">
            <a
              href={`http://localhost:5173/search/${query}?after=${searchResults.after}`}
              class={`ml-auto cursor-pointer font-bold p-3 w-42 flex items-center justify-center border border-blue-950 rounded-sm text-orange-300 hover:bg-blue-950 transition ${
                !searchResults.after && "invisible"
              }`}
            >
              Next
            </a>
          </div>
        </div>
      ) : (
        <div class="w-96 mx-auto my-8 text-center">
          There are no image/video posts to show for this search query.
        </div>
      )}
    </div>
  );
}
